package handler

import (
	v1 "apollo/server/api/v1"
	"apollo/server/internal/service"
	"apollo/server/pkg/response"
	"net/http"

	"github.com/labstack/echo/v4"
)

var (
	Partner = new(PartnerHandler)
)

type PartnerHandler struct {
}

func (h *PartnerHandler) Register(c echo.Context) error {
	req := new(v1.PartnerRegisterReq)
	err := c.Bind(req)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	resp, err := service.Partner.Register(c, req)
	if err != nil {
		return err
	}

	return response.ResponseSuccess(c, resp)
}

func (h *PartnerHandler) Login(c echo.Context) error {
	req := new(v1.PartnerLoginReq)
	if err := c.Bind(req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	resp, err := service.Partner.Login(c, req)
	if err != nil {
		return err
	}

	return response.ResponseSuccess(c, resp)
}

func (h *PartnerHandler) List(c echo.Context) error {
	req := new(v1.ListPartnerReq)
	if err := c.Bind(req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	resp, err := service.Partner.List(c, req)
	if err != nil {
		return err
	}

	return response.ResponseSuccess(c, resp)
}

func (h *PartnerHandler) ListBill(c echo.Context) error {
	req := new(v1.ListPartnerBillReq)
	if err := c.Bind(req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	resp, err := service.Partner.ListBill(c, req)
	if err != nil {
		return err
	}

	return response.ResponseSuccess(c, resp)
}
