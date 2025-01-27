package model

import (
	"gorm.io/gorm"
)

type Merchant struct {
	gorm.Model

	Base

	PrivateKey string `json:"privateKey"  gorm:"comment:秘钥"`
}

func (Merchant) TableName() string {
	return "merchant"
}
