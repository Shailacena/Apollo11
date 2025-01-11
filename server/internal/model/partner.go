package model

import (
	"time"

	"gorm.io/gorm"
)

type Partner struct {
	gorm.Model
	Name          string       `json:"name" gorm:"comment:合作商名称"`
	Password      string       `json:"password"  gorm:"comment:合作商登录密码"`
	CreditAmount  int64        `json:"creditAmount" gorm:"default:0;comment:授信额度"`
	DailyLimit    int          `json:"dailyLimit"  gorm:"default:0;comment:每日限频"`
	Priority      int          `json:"priority"  gorm:"default:0;comment:优先级"`
	SuperiorAgent int          `json:"superiorAgent"  gorm:"default:0;comment:上级代理"`
	Level         int          `json:"level"  gorm:"default:0;comment:等级"`
	StockAmount   int64        `json:"stockAmount"  gorm:"default:0;comment:剩余库存金额"`
	Enable        EnableStatus `json:"enable" gorm:"default:1;comment:用户是否被冻结 1正常 2冻结"`
	Token         string       `json:"token"  gorm:"index;comment:登录token"`
	ExpireAt      time.Time    `json:"expireAt"  gorm:"default:CURRENT_TIMESTAMP(3);comment:token有效期"`
}

func (Partner) TableName() string {
	return "partner"
}
