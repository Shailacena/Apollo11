package merchant

import (
	"apollo/server/internal/model"
	"apollo/server/internal/repository"
	"apollo/server/pkg/config"
	"apollo/server/pkg/data"
	"apollo/server/pkg/response"
	"apollo/server/pkg/util"
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

type CreateOrderReq struct {
	ChannelId       string `json:"channelId"`
	MerchantId      int32  `json:"merchantId"`
	MerchantTradeNo string `json:"merchantTradeNo"`
	Amount          int32  `json:"amount"`
	NotifyUrl       string `json:"notifyUrl"`
	Timestamp       string `json:"timestamp"`
	Sign            string `json:"sign"`
}

type CreateOrderResp struct {
	MerchantTradeNo string `json:"merchantTradeNo"`
	Amount          int32  `json:"amount"`
	TradeNo         string `json:"tradeNo"`
	PayPageUrl      string `json:"payPageUrl"`
}

func CreateOrder(c echo.Context) error {
	req := new(CreateOrderReq)
	err := c.Bind(req)
	if err != nil {
		response.ResponseError(c, http.StatusBadRequest, "下单失败，参数错误", nil)
		return nil
	}

	skuId, err := findGoods(req.ChannelId, req.Amount)
	if err != nil {
		return err
	}

	orderId, err := genOrderId()
	if err != nil {
		return err
	}

	o := model.Order{
		OrderId:         orderId,
		MerchantId:      uint(req.MerchantId),
		MerchantOrderId: req.MerchantTradeNo,
		Price:           req.Amount,
		SkuId:           skuId,
		IP:              c.RealIP(),
		NotifyUrl:       req.NotifyUrl,
	}

	err = repository.Order.Create(c, o)
	if err != nil {
		return err
	}

	conf := config.Get()
	resp := CreateOrderResp{
		MerchantTradeNo: req.MerchantTradeNo,
		TradeNo:         orderId,
		Amount:          req.Amount,
		PayPageUrl:      fmt.Sprintf("http://%s:%d/page/gototba.html?orderId=%s", conf.PaymentHttpConfig.Host, conf.PaymentHttpConfig.Port, orderId),
	}
	response.ResponseSuccess(c, resp)
	return nil
}

// 生成订单号
func genOrderId() (string, error) {
	sid := util.NewSid()
	id, err := sid.GenString()
	if err != nil {
		return "", err
	}
	return id, nil
}

// 查找商品
func findGoods(channelId string, amount int32) (string, error) {
	db := data.Instance()

	type G struct {
		Id    uint
		SkuId string
	}

	rows, err := db.Model(model.Goods{}).Select("goods.id, goods.sku_id").Joins("left join partner on partner.id = goods.partner_id").Where("channel_id = ? AND price = ?", channelId, amount).Order("partner.priority desc").Rows()
	if err != nil {
		return "", err
	}
	defer rows.Close()

	for rows.Next() {
		var g G
		db.ScanRows(rows, &g)

		if len(g.SkuId) == 0 {
			continue
		}

		// 查redis，商品是否在使用中

		return g.SkuId, nil
	}

	return "", errors.New("没有可用的商品")
}

type QueryOrderReq struct {
	MerchantId      int32  `json:"merchantId"`
	MerchantTradeNo string `json:"merchantTradeNo"`
	Timestamp       string `json:"timestamp"`
	Sign            string `json:"sign"`
}

type QueryOrderResp struct {
	MerchantId      int32  `json:"merchantId"`
	MerchantTradeNo string `json:"merchantTradeNo"`
	TradeNo         string `json:"tradeNo"`
	Amount          int32  `json:"amount"`
	Status          int32  `json:"status"`
	PayAt           int64  `json:"payAt,omitempty"`
}

func QueryOrder(c echo.Context) error {
	req := new(QueryOrderReq)
	err := c.Bind(req)
	if err != nil {
		response.ResponseError(c, http.StatusBadRequest, "下单失败，参数错误", nil)
		return nil
	}

	o, err := findOrderById(c, req.MerchantTradeNo)
	if err != nil {
		return err
	}

	var payAt int64
	if !o.PayAt.IsZero() {
		payAt = o.PayAt.Unix()
	}

	resp := QueryOrderResp{
		MerchantId:      req.MerchantId,
		MerchantTradeNo: req.MerchantTradeNo,
		Amount:          o.Price,
		TradeNo:         o.OrderId,
		Status:          int32(o.Status),
		PayAt:           payAt,
	}
	response.ResponseSuccess(c, resp)
	return nil
}

func findOrderById(c echo.Context, merchantOrderId string) (*model.Order, error) {
	o, err := repository.Order.GetByMerchantOrderId(c, merchantOrderId)
	if err != nil {
		return nil, err
	}
	return o, nil
}

type AgisoNotifyReq struct {
	FromPlatform string          `json:"fromPlatform"`
	Timestamp    int64           `json:"timestamp"`
	Aopic        int32           `json:"aopic"`
	Json         AgisoNotifyJson `json:"json"`
	Sign         string          `json:"sign"`
}

type AgisoNotifyJson struct {
	Tid           string `json:"tid"`           // 订单编号
	Status        string `json:"status"`        // 订单状态
	SellerNick    string `json:"sellerNick"`    // 卖家昵称
	SellerOpenUid string `json:"sellerOpenUid"` // 卖家ID
	BuyerNick     string `json:"buyerNick"`     // 买家昵称
	BuyerOpenUid  string `json:"buyerOpenUid"`  // 买家ID
	Payment       string `json:"payment"`       // 支付金额
	Type          string `json:"type"`          // 交易类型
}

type AgisoNotifyResp struct {
}

func AgisoNotify(c echo.Context) error {
	// req := new(AgisoNotifyReq)
	// err := c.Bind(req)
	// if err != nil {
	// 	response.ResponseError(c, http.StatusBadRequest, "下单失败，参数错误", nil)
	// 	return nil
	// }

	fromPlatform := c.QueryParam("fromPlatform")
	timestamp := c.QueryParam("timestamp")
	aopic := c.QueryParam("aopic")
	sign := c.QueryParam("sign")
	json := c.FormValue("json")

	log.Println("fromPlatform:", fromPlatform)
	log.Println("timestamp:", timestamp)
	log.Println("aopic:", aopic)
	log.Println("sign:", sign)
	log.Println("json:", json)

	resp := AgisoNotifyResp{}
	response.ResponseSuccess(c, resp)
	return nil
}
