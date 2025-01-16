package repository

import (
	"apollo/server/internal/model"
	"apollo/server/pkg/data"

	"github.com/labstack/echo/v4"
)

var (
	Order = &OrderRepo{}
)

type OrderRepo struct {
}


func (r *OrderRepo) List(c echo.Context) ([]*model.Order, error) {
	db := data.Instance()

	var orders []*model.Order
	err := db.Limit(100).Find(&orders).Error
	if err != nil {
		return nil, err
	}

	return orders, err
}
