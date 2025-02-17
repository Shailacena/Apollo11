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

func (r *OrderRepo) Get(c echo.Context, orderId string) (*model.Order, error) {
	db := data.Instance()

	var order model.Order
	err := db.Where("order_id = ?", orderId).First(&order).Error
	if err != nil {
		return nil, err
	}

	return &order, err
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

func (r *OrderRepo) Create(c echo.Context, order model.Order) error {
	db := data.Instance()

	err := db.Create(&order).Error
	if err != nil {
		return err
	}

	return err
}

func (r *OrderRepo) Update(c echo.Context, orderId string, order model.Order) error {
	db := data.Instance()

	err := db.Where("order_id = ?", orderId).Updates(order).Error
	if err != nil {
		return err
	}

	return err
}
