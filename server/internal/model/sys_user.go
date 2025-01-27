package model

import (
	"gorm.io/gorm"
)

type SysUser struct {
	gorm.Model

	Base

	Role      SysUserRole `json:"role" gorm:"index;default:2;comment:管理员角色"`
	SecretKey string      `json:"secretKey"  gorm:"comment:密钥"`
	UrlKey    string      `json:"urlKey"  gorm:"comment:二维码链接"`
}

func (SysUser) TableName() string {
	return "sys_user"
}
