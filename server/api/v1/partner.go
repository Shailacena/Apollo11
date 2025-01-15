package v1

// 合作商登录
type PartnerLoginReq struct {
	Id       uint   `json:"id" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type PartnerLoginResp struct {
	Token string `json:"token"`
	Level int    `json:"id"`
	Name  string `json:"name"`
}

// 合作商注册
type PartnerRegisterReq struct {
	Name          string `json:"name" binding:"required"`
	SuperiorAgent string `json:"superiorAgent" binding:"required"`
	Level         int    `json:"level" binding:"required"`
	Remark        string `json:"remark"`
}

type PartnerRegisterResp struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

// 合作商更新
type PartnerUpdateReq struct {
	Id                 uint   `json:"id" binding:"required"`
	Priority           int    `json:"priority"`
	DailyLimit         int    `json:"dailyLimit"`
	ChangeCreditAmount int64  `json:"changeCreditAmount"`
	RechargeTime       int64  `json:"rechargeTime"`
	Remark             string `json:"remark"`
}

type PartnerUpdateResp struct {
}

// 合作商列表
type ListPartnerReq struct {
}

type ListPartnerResp struct {
	List []*Partner `json:"list"`
}

type Partner struct {
	Id            uint   `json:"id"`
	Name          string `json:"name"`
	CreditAmount  int64  `json:"creditAmount"`
	DailyLimit    int    `json:"dailyLimit"`
	Priority      int    `json:"priority"`
	SuperiorAgent string `json:"superiorAgent"`
	Level         int    `json:"level"`
	StockAmount   int64  `json:"stockAmount"`
	RechargeTime  int64  `json:"rechargeTime"`
	PrivateKey    string `json:"privateKey"`
	Enable        int    `json:"enable"`
	Remark        string `json:"remark"`
}

// 合作商流水账单
type ListPartnerBillReq struct {
}

type ListPartnerBillResp struct {
	List []*PartnerBill `json:"list"`
}

type PartnerBill struct {
	PartnerId   uint   `json:"partnerId"`
	Type        int    `json:"type"`
	ChangeMoney int    `json:"changeMoney"`
	Money       int    `json:"money"`
	Remark      string `json:"remark"`
	CreateAt    int64  `json:"createAt"`
}

// 商品创建
type GoodsCreateReq struct {
	PartnerId    uint   `json:"partnerId"`
	RechargeType int    `json:"rechargeType"`
	SkuId        string `json:"skuId"`
	BrandId      string `json:"brandId"`
	Price        int    `json:"price"`
	RealPrice    int    `json:"realPrice"`
	ShopName     string `json:"shopName"`
}

type GoodsCreateResp struct {
}

// 商品列表
type ListGoodsReq struct {
}

type ListGoodsResp struct {
	List []*Goods `json:"list"`
}

type Goods struct {
	Id           uint   `json:"id"`
	PartnerId    uint   `json:"partnerId"`
	RechargeType int    `json:"rechargeType"`
	SkuId        string `json:"skuId"`
	BrandId      string `json:"brandId"`
	Price        int    `json:"price"`
	RealPrice    int    `json:"realPrice"`
	ShopName     string `json:"shopName"`
	CreateAt     int64  `json:"createAt"`
}

// 订单列表
type ListOrderReq struct {
}

type ListOrderResp struct {
	List []*Order `json:"list"`
}

// 密码修改
type PartnerSetPasswordReq struct {
	Id          uint   `json:"id" binding:"required"`
	OldPassword string `json:"oldpassword" binding:"required"`
	NewPassword string `json:"newpassword" binding:"required"`
}

// 密码修改
type PartnerSetPasswordResp struct {
}

type Order struct {
	OrderId         string `json:"orderId"`
	MerchantId      uint   `json:"merchantId"`
	MerchantOrderId string `json:"merchantOrderId"`
	OfficialOrderId string `json:"officialOrderId"`
	Price           int    `json:"price"`
	PayType         int    `json:"payType"`
	PayAccount      string `json:"payAccount"`
	PayStatus       uint   `json:"payStatus"`
	SkuId           string `json:"skuId"`
	Shop            string `json:"shop"`
	CallbackStatus  string `json:"callbackStatus"`
	IP              string `json:"ip"`
	Device          string `json:"device"`
	Remark          string `json:"remark"`
	CreateAt        int64  `json:"createAt"`
}
