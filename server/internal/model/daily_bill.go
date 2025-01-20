package model

import (
	"gorm.io/gorm"
)

type DailyBill struct {
	gorm.Model
	TotalMoney   int  `json:"totalMoney" gorm:"comment:成功总金额"`
	WxFee        int  `json:"wxFee"  gorm:"default:0;comment:微信缴费"`
	WxManualFee  int  `json:"wxManualFee"  gorm:"default:0;comment:微信手动缴费"`
	AliFee       int  `json:"aliFee"  gorm:"default:0;comment:支付宝缴费"`
	AliManualFee int  `json:"aliManualFee"  gorm:"default:0;comment:支付宝手动缴费"`
}

func (DailyBill) TableName() string {
	return "daily_bill"
}
