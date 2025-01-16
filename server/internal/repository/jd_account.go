package repository

import (
	"apollo/server/internal/model"
	"apollo/server/pkg/data"

	"github.com/labstack/echo/v4"
)

var (
	JDAccount = &JDAccountRepo{}
)

type JDAccountRepo struct {
}

func (r *JDAccountRepo) Create(c echo.Context, list []*model.JDAccount) error {
	db := data.Instance()

	err := db.Create(list).Error

	return err
}

func (r *JDAccountRepo) List(c echo.Context) ([]*model.JDAccount, error) {
	db := data.Instance()

	var accounts []*model.JDAccount
	err := db.Where("enable = ?", model.Enabled).Find(&accounts).Error
	if err != nil {
		return nil, err
	}

	return accounts, err
}
