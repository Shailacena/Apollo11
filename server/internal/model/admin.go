package model

import (
	"time"

	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	Role      SysUserRole  `json:"role" gorm:"index;default:2;comment:管理员角色"`
	Username  string       `json:"username" gorm:"unique;comment:用户登录名"`
	Password  string       `json:"password"  gorm:"comment:用户登录密码"`
	Nickname  string       `json:"nickname" gorm:"default:系统用户;comment:用户昵称"`
	Token     string       `json:"token"  gorm:"index;comment:登录token"`
	ExpireAt  time.Time    `json:"expireAt"  gorm:"default:CURRENT_TIMESTAMP(3);comment:token有效期"`
	Enable    EnableStatus `json:"enable" gorm:"default:1;comment:用户是否被冻结 1正常 2冻结"`
	SecretKey string       `json:"secretKey"  gorm:"comment:密钥"`
	UrlKey    string       `json:"urlKey"  gorm:"comment:二维码链接"`
	Remark    string       `json:"remark" gorm:"comment:备注"`
}

func (Admin) TableName() string {
	return "admin"
}