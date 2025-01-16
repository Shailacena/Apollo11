package v1

// 实名账号创建
type RealNameAccountCreateReq struct {
	AccountList []*BaseRealNameAccount `json:"accountList" validate:"required"`
	Remark      string                 `json:"remark"`
}

type RealNameAccountCreateResp struct {
}

// 实名账号列表
type ListRealNameAccountReq struct {
}

type ListRealNameAccountResp struct {
	List []*RealNameAccount `json:"list"`
}

type BaseRealNameAccount struct {
	IdNumber string `json:"idNumber"`
	Name     string `json:"name"`
}

type RealNameAccount struct {
	BaseRealNameAccount
	RealNameCount int64  `json:"realNameCount"`
	Enable        int    `json:"enable"`
	Remark        string `json:"remark"`
}
