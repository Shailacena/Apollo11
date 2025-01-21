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
	Id              uint   `query:"id"`
	Account         string `query:"account"`
	TotalOrderCount int    `query:"totalOrderCount"`
	OnlineStatus    int    `query:"onlineStatus"`
	Enable          int    `query:"enable"`
	RealNameStatus  int    `query:"realNameStatus"`
	StartAt         int64  `query:"startAt"`
	EndAt           int64  `query:"endAt"`
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
	Id     uint `json:"id" validate:"required"`
	Enable int  `json:"enable" validate:"required"`
}

type JDAccountDeleteResp struct {
}