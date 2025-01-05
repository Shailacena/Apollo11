package v1

// 合作商登录
type PartnerLoginReq struct {
	Id       uint   `json:"id" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type PartnerLoginResp struct {
	Token string `json:"token"`
	Name  string `json:"name"`
}

// 合作商注册
type PartnerRegisterReq struct {
	Name         string `json:"name" binding:"required"`
	Priority     int    `json:"priority" binding:"required"`
	DailyLimit   int    `json:"dailyLimit"`
	RechargeTime int64  `json:"rechargeTime"`
	PrivateKey   string `json:"privateKey"`
	Remark       string `json:"remark"`
}

type PartnerRegisterResp struct {
	Name     string `json:"name"`
	Password string `json:"password"`
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
	SuperiorAgent int    `json:"superiorAgent"`
	Level         int    `json:"level"`
	StockAmount   int64  `json:"stockAmount"`
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
	ShopName     int    `json:"shopName"`
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
	PartnerId    uint   `json:"partnerId"`
	RechargeType int    `json:"rechargeType"`
	SkuId        string `json:"skuId"`
	BrandId      string `json:"brandId"`
	Price        int    `json:"price"`
	RealPrice    int    `json:"realPrice"`
	ShopName     int    `json:"shopName"`
}

// 订单列表
type ListOrderReq struct {
}

type ListOrderResp struct {
	List []*Order `json:"list"`
}

type Order struct {
	OrderId string `json:"orderId"`
}
