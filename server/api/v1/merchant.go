package v1

// 商户登录
type MerchantLoginReq struct {
	Id       uint   `json:"id" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type MerchantLoginResp struct {
	Token string `json:"token"`
	Name  string `json:"name"`
}

// 商户注册
type MerchantRegisterReq struct {
	Name   string `json:"name" validate:"required"`
	Remark string `json:"remark"`
}

type MerchantRegisterResp struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

// 商户列表
type ListMerchantReq struct {
}

type ListMerchantResp struct {
	List []*Merchant `json:"list"`
}

// 商户修改密码
type MerchantSetPasswordReq struct {
	Id          uint   `json:"id" validate:"required"`
	OldPassword string `json:"oldpassword" validate:"required"`
	NewPassword string `json:"newpassword" validate:"required"`
}

type MerchantSetPasswordResp struct {
	Token string `json:"token"`
	Name  string `json:"name"`
}

type Merchant struct {
	Id          uint   `json:"id"`
	Name        string `json:"name"`
	PrivateKey  string `json:"privateKey"`
	CreateAt    int64  `json:"createAt"`
	TotalAmount int    `json:"totalAmount"`
	TodayAmount int    `json:"todayAmount"`
	Enable      int    `json:"enable"`
	Remark      string `json:"remark"`
}
