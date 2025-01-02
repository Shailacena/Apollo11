package v1

type PartnerLoginReq struct {
	Id       uint   `json:"id" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type PartnerLoginResp struct {
	Token string `json:"token"`
	Name  string `json:"name"`
}

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
