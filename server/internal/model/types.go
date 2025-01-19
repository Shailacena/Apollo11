package model

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
