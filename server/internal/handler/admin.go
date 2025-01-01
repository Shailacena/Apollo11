package handler

import (
	v1 "apollo/server/api/v1"
	"apollo/server/internal/service"
	"apollo/server/pkg/response"
	"apollo/server/pkg/util"
	"net/http"

	"github.com/labstack/echo/v4"
)

var (
	Admin = new(AdminHandler)
)

type AdminHandler struct {
}

func (h *AdminHandler) Register(c echo.Context) error {
	req := new(v1.RegisterReq)
	err := c.Bind(req)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	resp, err := service.Admin.Register(c, req)
	if err != nil {
		return err
	}

	return response.ResponseSuccess(c, resp)
}

func (h *AdminHandler) Login(c echo.Context) error {
	req := new(v1.LoginReq)
	if err := c.Bind(req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	resp, err := service.Admin.Login(c, req)
	if err != nil {
		return err
	}

	c.SetCookie(&http.Cookie{
		Name:  util.TokenCookieKey,
		Value: resp.Token,
	})
	return response.ResponseSuccess(c, resp)
}

func (h *AdminHandler) List(c echo.Context) error {
	req := new(v1.ListAdminReq)
	if err := c.Bind(req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	resp, err := service.Admin.List(c, req)
	if err != nil {
		return err
	}

	return response.ResponseSuccess(c, resp)
}
