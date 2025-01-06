package handler

import (
	v1 "apollo/server/api/v1"
	"apollo/server/internal/service"
	"apollo/server/pkg/response"
	"net/http"

	"github.com/labstack/echo/v4"
)

var (
	Admin = new(AdminHandler)
)

type AdminHandler struct {
}

func (h *AdminHandler) Register(c echo.Context) error {
	req := new(v1.AdminRegisterReq)
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
	req := new(v1.AdminLoginReq)
	if err := c.Bind(req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	resp, err := service.Admin.Login(c, req)
	if err != nil {
		return err
	}

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
