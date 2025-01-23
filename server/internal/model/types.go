package model

import "time"

type SysUserRole int

const (
	SuperAdminRole SysUserRole = iota + 1
	NormalAdminRole
)

type EnableStatus int

const (
	Enabled EnableStatus = iota + 1
	Disabled
)

type OnlineStatus int

const (
	Online OnlineStatus = iota + 1
	Offline
)

type Base struct {
	Username string `json:"username" gorm:"unique;not null;comment:登录账号"`
	Password string `json:"password"  gorm:"not null;comment:登录密码"`
	Nickname string `json:"nickname" gorm:"comment:昵称"`

	Token    string       `json:"token"  gorm:"index;comment:登录token"`
	ExpireAt time.Time    `json:"expireAt"  gorm:"comment:token有效期"`
	Enable   EnableStatus `json:"enable" gorm:"default:1;comment:用户是否被冻结 1正常 2冻结"`
	Remark   string       `json:"remark" gorm:"comment:备注"`
}
