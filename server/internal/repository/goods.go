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

func (r *GoodsRepo) Create(c echo.Context, goods *model.Goods) error {
	db := data.Instance()

	err := db.Create(goods).Error

	return err
}

func (r *GoodsRepo) List(c echo.Context) ([]*model.Goods, error) {
	db := data.Instance()

	var goodsList []*model.Goods
	err := db.Limit(20).Find(&goodsList).Error
	if err != nil {
		return nil, err
	}

	return goodsList, err
}
