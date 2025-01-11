package model

type SysUserRole uint

const (
	SuperAdminRole SysUserRole = iota + 1
	NormalAdminRole
)

type EnableStatus uint

const (
	Enabled EnableStatus = iota + 1
	Disabled
)
