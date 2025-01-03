package model

import (
	"time"

	"gorm.io/gorm"
)

const (
	Enabled = iota + 1
	Disabled
)

type SysUser struct {
	gorm.Model
	Username string    `json:"username" gorm:"unique;comment:用户登录名"`
	Password string    `json:"password"  gorm:"comment:用户登录密码"`
	Nickname string    `json:"nickname" gorm:"default:系统用户;comment:用户昵称"`
	Token    string    `json:"token"  gorm:"index;comment:登录token"`
	ExpireAt time.Time `json:"expireAt"  gorm:"default:CURRENT_TIMESTAMP(3);comment:token有效期"`
	Enable   int       `json:"enable" gorm:"default:1;comment:用户是否被冻结 1正常 2冻结"`
	Remark   string    `json:"remark" gorm:"comment:备注"`
}

func (SysUser) TableName() string {
	return "sys_user"
}
