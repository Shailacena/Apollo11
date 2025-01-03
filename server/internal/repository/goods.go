package repository

import (
	"apollo/server/internal/model"
	"apollo/server/pkg/data"

	"github.com/labstack/echo/v4"
)

var (
	Goods = &GoodsRepo{}
)

type GoodsRepo struct {
}

func (r *GoodsRepo) Create(c echo.Context, list []*model.Goods) error {
	db := data.Instance()

	err := db.Create(list).Error

	return err
}

func (r *GoodsRepo) List(c echo.Context) ([]*model.Goods, error) {
	db := data.Instance()

	var accounts []*model.Goods
	err := db.Where("enable = ?", model.Enabled).Find(&accounts).Error
	if err != nil {
		return nil, err
	}

	return accounts, err
}
