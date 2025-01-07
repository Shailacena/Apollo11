package service

import (
	v1 "apollo/server/api/v1"
	"apollo/server/internal/model"
	"apollo/server/internal/repository"

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
			Enable:   u.Enable,
		})
	}

	return &v1.ListAdminResp{
		List: list,
	}, nil
}

func (s *AdminService) SetPassword(c echo.Context, req *v1.AdminSetPasswordReq) (*v1.AdminSetPasswordResp, error) {
	_, err := repository.Admin.SetPassword(c, req.Username, req.OldPassword, req.NewPassword)
	if err != nil {
		return nil, err
	}

	return &v1.AdminSetPasswordResp{

	}, nil
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

