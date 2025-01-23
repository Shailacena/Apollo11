package model

import (
	"gorm.io/gorm"
)

type Partner struct {
	gorm.Model
	Base

	CreditAmount  int64  `json:"creditAmount" gorm:"default:0;comment:授信额度"`
	DailyLimit    int    `json:"dailyLimit"  gorm:"default:0;comment:每日限频"`
	Priority      int    `json:"priority"  gorm:"default:0;comment:优先级"`
	SuperiorAgent string `json:"superiorAgent"  gorm:"comment:上级代理"`
	Level         int    `json:"level"  gorm:"default:0;comment:等级"`
	StockAmount   int64  `json:"stockAmount"  gorm:"default:0;comment:剩余库存金额"`
	RechargeTime  int64  `json:"rechargeTime" gorm:"default:0;comment:充值时间"`
	PrivateKey    string `json:"privateKey" gorm:"comment:私钥"`
}

func (Partner) TableName() string {
	return "partner"
}
