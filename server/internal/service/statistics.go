package service

import (
	v1 "apollo/server/api/v1"
	"apollo/server/internal/repository"
	"time"

	"github.com/labstack/echo/v4"
)

var (
	Statistics = new(StatisticsService)
)

type StatisticsService struct {
}

func (s *StatisticsService) List(c echo.Context, req *v1.ListDailyBillReq) (*v1.ListDailyBillResp, error) {
	bills, err := repository.Statistics.ListDailyBill(c)
	if err != nil {
		return nil, err
	}

	list := make([]*v1.DailyBill, 0, len(bills))
	for _, b := range bills {
		list = append(list, &v1.DailyBill{
			Date:         b.CreatedAt.Format(time.DateOnly),
			TotalMoney:   b.TotalMoney,
			WxFee:        b.WxFee,
			WxManualFee:  b.WxManualFee,
			AliFee:       b.AliFee,
			AliManualFee: b.AliManualFee,
		})
	}

	return &v1.ListDailyBillResp{
		List: list,
	}, nil
}
