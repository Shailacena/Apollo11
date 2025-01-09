package handler

import (
	v1 "apollo/server/api/v1"
	"apollo/server/internal/service"
	"apollo/server/pkg/response"
	"net/http"

	"github.com/labstack/echo/v4"
)

var (
	Merchant = new(MerchantHandler)
)

type MerchantHandler struct {
}

func (h *MerchantHandler) Register(c echo.Context) error {
	req := new(v1.MerchantRegisterReq)
	err := c.Bind(req)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	resp, err := service.Merchant.Register(c, req)
	if err != nil {
		return err
	}

	return response.ResponseSuccess(c, resp)
}

func (h *MerchantHandler) Login(c echo.Context) error {
	req := new(v1.MerchantLoginReq)
	if err := c.Bind(req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	resp, err := service.Merchant.Login(c, req)
	if err != nil {
		return err
	}

	return response.ResponseSuccess(c, resp)
}

func (h *MerchantHandler) List(c echo.Context) error {
	req := new(v1.ListMerchantReq)
	if err := c.Bind(req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	resp, err := service.Merchant.List(c, req)
	if err != nil {
		return err
	}

	return response.ResponseSuccess(c, resp)
}

func (h *MerchantHandler) SetPassword(c echo.Context) error {
	req := new(v1.MerchantSetPasswordReq)
	if err := c.Bind(req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	resp, err := service.Merchant.SetPassword(c, req)
	if err != nil {
		return err
	}

	return response.ResponseSuccess(c, resp)
}
