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

	var accounts []*model.Order
	err := db.Where("enable = ?", model.Enabled).Find(&accounts).Error
	if err != nil {
		return nil, err
	}

	return accounts, err
}
