package repository

import (
	"apollo/server/internal/model"
	"apollo/server/pkg/data"

	"github.com/labstack/echo/v4"
)

var (
	RealNameAccount = &RealNameAccountRepo{}
)

type RealNameAccountRepo struct {
}

func (r *RealNameAccountRepo) Create(c echo.Context, list []*model.RealNameAccount) error {
	db := data.Instance()

	err := db.Create(list).Error

	return err
}

func (r *RealNameAccountRepo) List(c echo.Context) ([]*model.RealNameAccount, error) {
	db := data.Instance()

	var accounts []*model.RealNameAccount
	err := db.Where("enable = ?", model.Enabled).Find(&accounts).Error
	if err != nil {
		return nil, err
	}

	return accounts, err
}
