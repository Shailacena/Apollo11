package repository

import (
	v1 "apollo/server/api/v1"
	"apollo/server/internal/model"
	"apollo/server/pkg/data"
	"time"

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

func (r *JDAccountRepo) Enable(c echo.Context, id uint, enable model.EnableStatus) error {
	db := data.Instance()

	err := db.Where("id = ?", id).Updates(model.JDAccount{Enable: enable}).Error
	if err != nil {
		return err
	}

	return nil
}

func (r *JDAccountRepo) List(c echo.Context, req *v1.ListJDAccountReq) ([]*model.JDAccount, error) {
	db := data.Instance()

	jd := model.JDAccount{}
	if req.Id > 0 {
		jd.ID = req.Id
	}
	if len(req.Account) > 0 {
		jd.Account = req.Account
	}
	if req.TotalOrderCount > 0 {
		jd.TotalOrderCount = req.TotalOrderCount
	}
	if req.OnlineStatus > 0 {
		jd.OnlineStatus = model.OnlineStatus(req.OnlineStatus)
	}
	if req.Enable > 0 {
		jd.Enable = model.EnableStatus(req.Enable)
	}
	if req.RealNameStatus > 0 {
		jd.RealNameStatus = req.RealNameStatus
	}
	if req.StartAt > 0 && req.EndAt > 0 {
		db = db.Where("created_at >= ? AND created_at <= ?", time.UnixMilli(req.StartAt), time.UnixMilli(req.EndAt))
	}

	var accounts []*model.JDAccount
	err := db.Where(jd).Limit(20).Find(&accounts).Error
	if err != nil {
		return nil, err
	}

	return accounts, err
}

func (r *JDAccountRepo) Delete(c echo.Context, id uint) error {
	// db := data.Instance()

	// err := db.Where("id = ?", id).Delete().Error
	// if err != nil {
	// 	return err
	// }

	return nil
}
