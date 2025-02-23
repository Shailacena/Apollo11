package order

import (
	"apollo/server/internal/model"
	"apollo/server/internal/repository"
	"apollo/server/pkg/config"
	"apollo/server/pkg/data"
	"apollo/server/pkg/rand"
	"apollo/server/pkg/response"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/spf13/cast"
)

type CreateOrderReq struct {
	MchId      string `json:"mchId"`
	OutTradeNo string `json:"outTradeNo"`
	Amount     int32  `json:"amount"`
	NotifyUrl  string `json:"notifyUrl"`
	ExtParam   string `json:"extParam"`
}

type CreateOrderResp struct {
	MchId       string `json:"mchId"`
	OutTradeNo  string `json:"outTradeNo"`
	TradeNo     string `json:"tradeNo"`
	Amount      int32  `json:"amount"`
	PayPageUrl  string `json:"payPageUrl"`
	ExpiredTime int64  `json:"expiredTime"`
}

func checkParams(req *CreateOrderReq) error {
	// if len(req.MchId) == 0 {
	// 	return errors.New("商户号为必填项")
	// }
	// if len(req.OutTradeNo) == 0 {
	// 	return errors.New("订单号为必填项")
	// }
	// if len(req.NotifyUrl) == 0 {
	// 	return errors.New("回调地址为必填项")
	// }
	// if req.Amount >= 0 {
	// 	return errors.New("金额必须大于等于0")
	// }
	return nil
}

func CreateOrder(c echo.Context) error {
	req := new(CreateOrderReq)
	err := c.Bind(req)
	if err != nil {
		response.ResponseError(c, http.StatusBadRequest, "下单失败，参数错误", nil)
		return nil
	}

	err = checkParams(req)
	if err != nil {
		response.ResponseError(c, http.StatusBadRequest, fmt.Sprintf("下单失败，%s", err), nil)
		return nil
	}

	ck, err := getCK()
	if err != nil {
		return err
	}
	log.Println("ck:", ck)

	// getProxyIP("https://api.wandouapp.com/?app_key=f8367eaaea4c2508afdba24c4d41ab3b&num=1&xy=1&type=2&lb=&nr=0&area_id=&isp=0")
	// ip := getProxyIP("https://api.wandouapp.com/?app_key=f8367eaaea4c2508afdba24c4d41ab3b&num=1&xy=1&type=1&lb=\\n&nr=0&area_id=&isp=0")
	ip := ""
	log.Println("ip:", ip)

	address, err := getAddress()
	if err != nil {
		return err
	}
	log.Println("地址:", address)

	skuId, err := getSku(req.MchId)
	if err != nil {
		return err
	}
	log.Println("skuId:", skuId)

	orderId := genOrderId()
	log.Println("orderId:", orderId)

	o := model.Order{
		OrderId:         orderId,
		MerchantId:      cast.ToUint(req.MchId),
		MerchantOrderId: req.OutTradeNo,
		Price:           req.Amount,
		PayAccount:      ck,
		SkuId:           skuId,
		IP:              c.RealIP(),
		NotifyUrl:       req.NotifyUrl,
		ExtParam:        req.ExtParam,
	}

	err = repository.Order.Create(c, o)
	if err != nil {
		return err
	}

	wd, err := os.Getwd()
	if err != nil {
		return err
	}
	p := path.Join(wd, "../jd/main.py")
	log.Println("p:", p)

	// cmd := exec.Command("python3", p, "getpayurl", ck, skuId, orderId, "", address, ip)
	// output, err := cmd.CombinedOutput()
	// if err != nil {
	// 	fmt.Println("Error:", err)
	// }
	output := `{"err": ["inter_request:", "No active exception to reraise", "inter_request:", "No active exception to reraise", "inter_request:", "No active exception to reraise"], "step": ["checkToken in", "checkToken load cookie file success", "loadcookie in", "loadcookie success", "useLastOrderGetUrl in", "getLastOrderId in", "openSelfHome in", "openSelfHome find [msShortcutMenu div]", "openSelfHome find [modal__wrap div]", "getLastOrderId find [all order div]", "getLastOrderId find [index-module__order_box___]", "getLastOrderId in order detail", "getLastOrderId find [last order id] is['310278586245']", "useLastOrderGetUrl find [go to pay button]", "shouyintai in", "shouyintai find [wechat checkboxWrap]", "shouyintai choose wechat pay success", "shouyintai find [pay button]"], "jdaccount": "jd_44754e08b8767", "in_jdorderId": "310278586245", "wxurl": "weixin://wap/pay?prepayid%3Dwx152236432958633d4a82abb09ee2340000&package=988857761&noncestr=1739630203&sign=fca4e830b7326581543d481d0562c751", "jdorderId": "310278586245", "orderId": "10000001", "sku": "10085738847942", "status": 1, "orderid": "10000001"}`

	// // 解析输出结果，查找异常信息
	// outputStr := string(output)
	// if strings.Contains(outputStr, "发生错误:") {
	// 	fmt.Println("Python脚本抛出异常:", strings.TrimPrefix(outputStr, "发生错误:"))
	// } else {
	// 	fmt.Println("Python脚本输出:", outputStr)
	// }
	m := make(map[string]any)
	err = json.Unmarshal([]byte(output), &m)
	if err != nil {
		return err
	}
	log.Println("m:", m)

	status := cast.ToUint(m["status"])
	if status != 1 {
		log.Println("京东下单失败")
		response.ResponseError(c, http.StatusBadRequest, "下单失败", nil)
		return nil
	}

	err = repository.Order.Update(c, orderId, model.Order{
		OfficialOrderId: cast.ToString(m["jdorderId"]),
		Status:          1,
		PayUrl:          cast.ToString(m["wxurl"]),
	})
	if err != nil {
		return err
	}

	conf := config.Get()
	resp := CreateOrderResp{
		MchId:       req.MchId,
		OutTradeNo:  req.OutTradeNo,
		TradeNo:     orderId,
		Amount:      req.Amount,
		PayPageUrl:  fmt.Sprintf("http://%s:%d/page/index.html?orderId=%s", conf.PaymentHttpConfig.Host, conf.PaymentHttpConfig.Port, orderId),
		ExpiredTime: time.Now().Add(5 * time.Minute).Unix(),
	}
	response.ResponseSuccess(c, resp)
	return nil
}

// 获取ck
func getCK() (string, error) {
	db := data.Instance()

	jdAccount := model.JDAccount{}
	err := db.Where("enable = ? AND transition_status = ? AND hot_status = ? AND online_status = ?", model.Enabled, 1, 1, model.Online).First(&jdAccount).Error
	if err != nil {
		return "", err
	}

	return fmt.Sprintf("pin=%s;wskey=%s", jdAccount.Account, jdAccount.WsKey), nil
	// return "pin=jd_XgYOBMKfcELO;wskey=AAJnhLbSAEDVyHIPhPFwP1f0EIVeqLhjiqdX9f85Tu3Byn0dmsSC4e0xep-x3_S8UK8MmJZVOgdGUwPIogfngofFwArPyYEn;", nil
}

// 获取商品
func getSku(partnerId string) (string, error) {
	db := data.Instance()

	goods := model.Goods{}
	err := db.Where("partner_id = ?", partnerId).First(&goods).Error
	if err != nil {
		return "", err
	}
	return goods.SkuId, nil
	// return "10085738847942"
}

var roads = [...]string{
	"中山路", "文明路", "东湖路", "东风路", "解放路", "武康路",
	"淮海路", "多伦路", "长乐路", "长安路", "学府路", "建设路",
}

const maxRoadNum = 100
const maxCommunityUnit = 20

var rooms = [...]string{"A", "B", "C", "D", "E"}

func genRoad() string {
	road := make([]string, 0)

	roadIdx := rand.Random.Intn(len(roads))
	road = append(road, roads[roadIdx])

	roadNum := rand.Random.Intn(maxRoadNum)
	road = append(road, cast.ToString(roadNum)+"号")

	communityUnit := rand.Random.Intn(maxCommunityUnit)
	road = append(road, cast.ToString(communityUnit))

	roomIdx := rand.Random.Intn(len(rooms))
	road = append(road, rooms[roomIdx])

	return strings.Join(road, "")
}

// 获取地址
func getAddress() (string, error) {
	// db := data.Instance()

	// realNameAccount := model.RealNameAccount{}
	// err := db.Where("enable = ?", model.Enabled).First(&realNameAccount).Error
	// if err != nil {
	// 	return "", err
	// }
	// return realNameAccount.Name, nil

	road := genRoad()
	return "李任秀 13672281779 江西省宜春地区宜春市 " + road, nil
}

// 生成订单号
func genOrderId() string {
	uid := uuid.New()
	return strings.ReplaceAll(uid.String(), "-", "")
}

// 获取代理ip
func getProxyIP(targetUrlString string) string {
	//设置一个http客户端
	client := &http.Client{}
	//访问地址
	req, err := http.NewRequest("GET", targetUrlString, nil)
	if err != nil {
		log.Println("请求代理ip失败", err.Error())
		return ""
	}
	req.Header.Add("X-Forwarded-For", "120.229.36.68")
	//处理返回结果
	resp, _ := client.Do(req)
	defer func() {
		resp.Body.Close()
	}()
	//读取内容
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Println("读取代理ip失败")
		return ""
	}
	//输入响应结果
	fmt.Println("请求结果:", string(body))
	return string(body)
}

type GetOrderDetailReq struct {
	OrderId string `json:"orderId"`
}

type GetOrderDetailResp struct {
	MchId       string `json:"mchId"`
	OutTradeNo  string `json:"outTradeNo"`
	TradeNo     string `json:"tradeNo"`
	Amount      int32  `json:"amount"`
	WxPayUrl    string `json:"wxPayUrl"`
	ExpiredTime int64  `json:"expiredTime"`
}

func GetOrderDetail(c echo.Context) error {
	orderId := c.QueryParam("orderId")
	if len(orderId) == 0 {
		response.ResponseError(c, http.StatusBadRequest, "请求失败，参数错误", nil)
		return nil
	}

	o, err := repository.Order.Get(c, orderId)
	if err != nil {
		return err
	}

	resp := GetOrderDetailResp{
		MchId:       cast.ToString(o.MerchantId),
		OutTradeNo:  o.MerchantOrderId,
		TradeNo:     o.OrderId,
		Amount:      o.Price,
		WxPayUrl:    o.PayUrl,
		ExpiredTime: time.Now().Add(5 * time.Minute).Unix(),
	}
	response.ResponseSuccess(c, resp)
	return nil
}
