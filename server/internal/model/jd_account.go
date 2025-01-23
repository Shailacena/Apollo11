package model

import (
	"gorm.io/gorm"
)

type JDAccount struct {
	gorm.Model
	Account                string       `json:"account"  gorm:"unique;size:20;comment:ck中pin字段"`
	WsKey                  string       `json:"wsKey"  gorm:"comment:ck中wskey字段"`
	RealNameStatus         int          `json:"realNameStatus" gorm:"default:1;comment:实名状态 1未实名 2已实名"`
	TransitionStatus       int          `json:"transitionStatus" gorm:"default:1;comment:转换状态 1正常 2成功 3失败"`
	LoginExpirationStatus  int          `json:"loginExpirationStatus" gorm:"default:1;comment:登录过期 1未过期 2已过期"`
	HotStatus              int          `json:"hotStatus" gorm:"default:1;comment:火爆状态 1未火爆 2已火爆"`
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
