package service

import (
	v1 "apollo/server/api/v1"
	"apollo/server/internal/model"
	"apollo/server/internal/repository"
	"net/http"

	"github.com/labstack/echo/v4"
)

var (
	Admin = new(AdminService)
)

type AdminService struct {
}

func (s *AdminService) Register(c echo.Context, req *v1.AdminRegisterReq) (*v1.AdminRegisterResp, error) {
	u := model.SysUser{
		Username: req.Username,
		Nickname: req.Nickname,
		Remark:   req.Remark,
	}
	user, err := repository.Admin.Register(c, &u)
	if err != nil {
		return nil, err
	}

	return &v1.AdminRegisterResp{
		Username: req.Username,
		Nickname: req.Nickname,
		Password: user.Password,
	}, nil
}

func (s *AdminService) Login(c echo.Context, req *v1.AdminLoginReq) (*v1.AdminLoginResp, error) {
	user, err := repository.Admin.Login(c, req.Username, req.Password)
	if err != nil {
		return nil, err
	}

	return &v1.AdminLoginResp{
		Token:    user.Token,
		Nickname: user.Nickname,
		Role:     uint(user.Role),
	}, nil
}

func (s *AdminService) List(c echo.Context, req *v1.ListAdminReq) (*v1.ListAdminResp, error) {
	users, err := repository.Admin.List(c)
	if err != nil {
		return nil, err
	}

	list := make([]*v1.Admin, 0, len(users))
	for _, u := range users {
		list = append(list, &v1.Admin{
			Id:       u.ID,
			Username: u.Username,
			Nickname: u.Nickname,
			Remark:   u.Remark,
			Enable:   int(u.Enable),
			Role:     uint(u.Role),
		})
	}

	return &v1.ListAdminResp{
		List: list,
	}, nil
}

func (s *AdminService) SetPassword(c echo.Context, req *v1.AdminSetPasswordReq) (*v1.AdminSetPasswordResp, error) {
	if len(req.NewPassword) < 6 {
		return nil, echo.NewHTTPError(http.StatusBadRequest, "密码不符")
	}

	_, err := repository.Admin.SetPassword(c, req.Username, req.OldPassword, req.NewPassword)
	if err != nil {
		return nil, err
	}

	return &v1.AdminSetPasswordResp{}, nil
}

func (s *AdminService) ResetPassword(c echo.Context, req *v1.AdminResetPasswordReq) (*v1.AdminResetPasswordResp, error) {
	user, err := repository.Admin.ResetPassword(c, req.Username)
	if err != nil {
		return nil, err
	}

	return &v1.AdminResetPasswordResp{
		Password: user.Password,
	}, nil
}

func (s *AdminService) Delete(c echo.Context, req *v1.AdminDeleteReq) (*v1.AdminDeleteResp, error) {
	_, err := repository.Admin.Delete(c, req.Username)
	if err != nil {
		return nil, err
	}

	return &v1.AdminDeleteResp{}, nil
}

func (s *AdminService) Update(c echo.Context, req *v1.AdminUpdateReq) (*v1.AdminUpdateResp, error) {
	_, err := repository.Admin.Update(c, req.Username, req.Nickname, req.Remark)
	if err != nil {
		return nil, err
	}

	return &v1.AdminUpdateResp{}, nil
}

func (s *AdminService) Enable(c echo.Context, req *v1.AdminEnableReq) (*v1.AdminEnableResp, error) {
	user, err := repository.Admin.Enable(c, req.Username, req.Enable)
	if err != nil {
		return nil, err
	}

	return &v1.AdminEnableResp{
		Enable: int(user.Enable),
	}, nil
}
