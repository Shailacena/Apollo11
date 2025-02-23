package service

import (
	v1 "apollo/server/api/v1"
	"apollo/server/internal/repository"

	"github.com/labstack/echo/v4"
)

var (
	Order = new(OrderService)
)

type OrderService struct {
}

func (s *OrderService) List(c echo.Context, req *v1.ListOrderReq) (*v1.ListOrderResp, error) {
	OrderList, err := repository.Order.List(c)
	if err != nil {
		return nil, err
	}

	list := make([]*v1.Order, 0, len(OrderList))
	for _, g := range OrderList {
		list = append(list, &v1.Order{
			OrderId:         g.OrderId,
			MerchantId:      g.MerchantId,
			MerchantOrderId: g.MerchantOrderId,
			OfficialOrderId: g.OfficialOrderId,
			Price:           g.Price,
			PayType:         g.PayType,
			PayAccount:      g.PayAccount,
			PayStatus:       g.Status,
			SkuId:           g.SkuId,
			Shop:            g.Shop,
			CallbackStatus:  g.NotifyStatus,
			IP:              g.IP,
			Device:          g.Device,
			Remark:          g.Remark,
			CreateAt:        g.CreatedAt.Unix(),
		})
	}

	return &v1.ListOrderResp{
		List: list,
	}, nil
}
