package v1

// 管理员登录
type AdminLoginReq struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type AdminLoginResp struct {
	Token    string `json:"token"`
	Nickname string `json:"nickname"`
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
	Username string `json:"username" binding:"required"`
	OldPassword string `json:"oldpassword" binding:"required"`
	NewPassword string `json:"newpassword" binding:"required"`
}

// 密码修改
type AdminSetPasswordResp struct {

}

// 密码重置
type AdminResetPasswordReq struct {
	Username string `json:"username" binding:"required"`
	OldPassword string `json:"oldpassword" binding:"required"`
	NewPassword string `json:"newpassword" binding:"required"`
}

// 密码重置
type AdminResetPasswordResp struct {
	Password string `json:"password"`
}

type Admin struct {
	Id       uint   `json:"id"`
	Username string `json:"username"`
	Nickname string `json:"nickname"`
	Remark   string `json:"remark"`
	Enable   int    `json:"enable"`
}
