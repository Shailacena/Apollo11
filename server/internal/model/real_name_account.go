package model

import (
	"gorm.io/gorm"
)

type RealNameAccount struct {
	gorm.Model
	IdNumber      string       `json:"idNumber"  gorm:"unique;size:20;comment:身份证号码"`
	Name          string       `json:"name" gorm:"comment:姓名"`
	Mobile        string       `json:"mobile" gorm:"comment:手机号"`
	Address       string       `json:"address" gorm:"comment:地址"`
	RealNameCount int64        `json:"realNameCount"  gorm:"default:0;comment:实名次数"`
	Enable        EnableStatus `json:"enable" gorm:"default:1;comment:用户是否被冻结 1正常 2冻结"`
	Remark        string       `json:"remark" gorm:"comment:备注"`
}

func (RealNameAccount) TableName() string {
	return "real_name_account"
}
