package v1

// 管理员登录
type AdminLoginReq struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type AdminLoginResp struct {
	Token    string `json:"token"`
	Nickname string `json:"nickname"`
	Role     uint   `json:"role"`
}

// 管理员注册
type AdminRegisterReq struct {
	Username string `json:"username" binding:"required"`
	Nickname string `json:"nickname" binding:"required"`
	Remark   string `json:"remark"`
}

type AdminRegisterResp struct {
	Username string `json:"username"`
	Nickname string `json:"nickname"`
	Password string `json:"password"`
}

// 管理员列表
type ListAdminReq struct {
}

type ListAdminResp struct {
	List []*Admin `json:"list"`
}

// 密码修改
type AdminSetPasswordReq struct {
	Username    string `json:"username" binding:"required"`
	OldPassword string `json:"oldpassword" binding:"required"`
	NewPassword string `json:"newpassword" binding:"required"`
}

// 密码修改
type AdminSetPasswordResp struct {
}

// 密码重置
type AdminResetPasswordReq struct {
	Username    string `json:"username" binding:"required"`
	OldPassword string `json:"oldpassword" binding:"required"`
	NewPassword string `json:"newpassword" binding:"required"`
}

// 密码重置
type AdminResetPasswordResp struct {
	Password string `json:"password"`
}

// 删除管理员
type AdminDeleteReq struct {
	Username string `json:"username" binding:"required"`
}

// 删除管理员
type AdminDeleteResp struct {
}

// 更新信息
type AdminUpdateReq struct {
	Username string `json:"username" binding:"required"`
	Nickname string `json:"nickname"`
	Remark   string `json:"remark"`
}

// 更新信息
type AdminUpdateResp struct {
}

// 启用或禁用
type AdminEnableReq struct {
	Username string `json:"username" binding:"required"`
	Enable   int    `json:"enable"`
}

// 更新信息
type AdminEnableResp struct {
	Enable int `json:"enable"`
}

type Admin struct {
	Id       uint   `json:"id"`
	Username string `json:"username"`
	Nickname string `json:"nickname"`
	Remark   string `json:"remark"`
	Enable   int    `json:"enable"`
	Role     uint   `json:"role"`
}
