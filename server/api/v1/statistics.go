package v1

// 每日流水账单
type ListDailyBillReq struct {
}

type ListDailyBillResp struct {
	List []*DailyBill `json:"list"`
}

type DailyBill struct {
	Date         string `json:"date"`
	TotalMoney   int    `json:"totalMoney"`
	WxFee        int    `json:"wxFee"`
	WxManualFee  int    `json:"wxManualFee"`
	AliFee       int    `json:"aliFee"`
	AliManualFee int    `json:"aliManualFee"`
}
