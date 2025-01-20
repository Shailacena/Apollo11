package handler

import (
	v1 "apollo/server/api/v1"
	"apollo/server/internal/service"
	"apollo/server/pkg/response"
	"net/http"

	"github.com/labstack/echo/v4"
)

var (
	Statistics = new(StatisticsHandler)
)

type StatisticsHandler struct {
}

func (h *StatisticsHandler) List(c echo.Context) error {
	req := new(v1.ListDailyBillReq)
	if err := c.Bind(req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	if err := c.Validate(req); err != nil {
		return err
	}

	resp, err := service.Statistics.List(c, req)
	if err != nil {
		return err
	}

	return response.ResponseSuccess(c, resp)
}
