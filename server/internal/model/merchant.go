package model

import (
	"time"

	"gorm.io/gorm"
)

type Merchant struct {
	gorm.Model
	Name       string       `json:"name" gorm:"comment:商户名称"`
	Password   string       `json:"password"  gorm:"comment:商户登录密码"`

	PrivateKey string       `json:"privateKey"  gorm:"comment:秘钥"`
	
	Enable     EnableStatus `json:"enable" gorm:"default:1;comment:用户是否被冻结 1正常 2冻结"`
	Token      string       `json:"token"  gorm:"index;comment:登录token"`
	ExpireAt   time.Time    `json:"expireAt"  gorm:"default:CURRENT_TIMESTAMP(3);comment:token有效期"`
	Remark     string       `json:"remark" gorm:"comment:备注"`
}

func (Merchant) TableName() string {
	return "merchant"
}
