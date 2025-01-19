package model

import (
	"gorm.io/gorm"
)

type JDAccount struct {
	gorm.Model
	Account                string       `json:"account"  gorm:"unique;size:20;comment:ck中pin字段"`
	WsKey                  string       `json:"wsKey"  gorm:"comment:ck中wskey字段"`
	RealNameStatus         int          `json:"realNameStatus" gorm:"default:1;comment:实名状态 1已实名 2未实名"`
	TotalOrderCount        int          `json:"totalOrderCount"  gorm:"default:0;comment:总下单数"`
	TodayOrderCount        int          `json:"todayOrderCount"  gorm:"default:0;comment:当天下单数"`
	TotalSuccessOrderCount int          `json:"totalSuccessOrderCount"  gorm:"default:0;comment:总成功数"`
	OnlineStatus           OnlineStatus `json:"onlineStatus" gorm:"default:1;comment:实名状态 1在线 2离线"`
	Enable                 EnableStatus `json:"enable" gorm:"default:1;comment:用户是否被冻结 1正常 2冻结"`
	Remark                 string       `json:"remark" gorm:"comment:备注"`
}

func (JDAccount) TableName() string {
	return "jd_account"
}
