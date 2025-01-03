package v1

// jd账号创建
type JDAccountCreateReq struct {
	AccountList []string `json:"accountList" binding:"required"`
	Remark      string           `json:"remark"`
}

type JDAccountCreateResp struct {
}

// jd账号列表
type ListJDAccountReq struct {
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
	LoginStatus            int    `json:"loginStatus"`
	Enable                 int    `json:"enable"`
	Remark                 string `json:"remark"`
	CreateAt               int64  `json:"createAt"`
}
