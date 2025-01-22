package repository

import (
	v1 "apollo/server/api/v1"
	"apollo/server/internal/model"
	"apollo/server/pkg/data"
	"time"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
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

	db, jd := filterJDAccount(db, &req.JDAccountSearchParams)

	var accounts []*model.JDAccount
	err := db.Where(jd).Limit(20).Find(&accounts).Error
	if err != nil {
		return nil, err
	}

	return accounts, err
}

func filterJDAccount(db *gorm.DB, req *v1.JDAccountSearchParams) (*gorm.DB, model.JDAccount) {
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

	return db, jd
}

func (r *JDAccountRepo) Delete(c echo.Context, req *v1.JDAccountDeleteReq) error {
	db := data.Instance()

	var err error
	if req.IsAll {
		err = db.Where("1 = 1").Delete(&model.JDAccount{}).Error
	} else {
		db, jd := filterJDAccount(db, &req.JDAccountSearchParams)
		err = db.Where(jd).Delete(&model.JDAccount{}).Error
	}

	return err
}
