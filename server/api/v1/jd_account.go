package v1

// jd账号创建
type JDAccountCreateReq struct {
	AccountList []BaseJDAccount `json:"accountList" validate:"required"`
	Remark      string          `json:"remark"`
}

type BaseJDAccount struct {
	Account string `json:"account"`
	WsKey   string `json:"wsKey"`
}

type JDAccountCreateResp struct {
}

// 启用或禁用
type JDAccountEnableReq struct {
	Id     uint `json:"id" validate:"required"`
	Enable int  `json:"enable" validate:"required"`
}

type JDAccountEnableResp struct {
}

// jd账号列表
type ListJDAccountReq struct {
	JDAccountSearchParams
}

type JDAccountSearchParams struct {
	Id              uint   `query:"id" json:"id"`
	Account         string `query:"account" json:"account"`
	TotalOrderCount int    `query:"totalOrderCount" json:"totalOrderCount"`
	OnlineStatus    int    `query:"onlineStatus" json:"onlineStatus"`
	Enable          int    `query:"enable" json:"enable"`
	RealNameStatus  int    `query:"realNameStatus" json:"realNameStatus"`
	StartAt         int64  `query:"startAt" json:"startAt"`
	EndAt           int64  `query:"endAt" json:"endAt"`
}

type ListJDAccountResp struct {
	List []*JDAccount `json:"list"`
}

type JDAccount struct {
	Id                     uint   `json:"id"`
	Account                string `json:"account"`
	RealNameStatus         int    `json:"realNameStatus"`
	TotalOrderCount        int    `json:"totalOrderCount"`
	TodayOrderCount        int    `json:"todayOrderCount"`
	TotalSuccessOrderCount int    `json:"totalSuccessOrderCount"`
	OnlineStatus           int    `json:"onlineStatus"`
	Enable                 int    `json:"enable"`
	Remark                 string `json:"remark"`
	CreateAt               int64  `json:"createAt"`
	UpdateAt               int64  `json:"updateAt"`
}

// 删除
type JDAccountDeleteReq struct {
	JDAccountSearchParams
	IsAll bool `json:"isAll"`
}

type JDAccountDeleteResp struct {
}

// 重置状态
type JDAccountResetStatusReq struct {
	IsTransitionStatus      bool `json:"isTransitionStatus"`
	IsLoginExpirationStatus bool `json:"isLoginExpirationStatus"`
}

type JDAccountResetStatusResp struct {
}

// 重置异常状态
type JDAccountResetReq struct {
	JDAccountSearchParams
}

type JDAccountResetResp struct {
}
