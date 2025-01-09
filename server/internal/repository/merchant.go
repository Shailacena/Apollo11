package repository

import (
	"apollo/server/internal/model"
	"apollo/server/pkg/data"
	"apollo/server/pkg/util"
	"errors"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

var (
	Merchant = &MerchantRepo{}
)

type MerchantRepo struct {
}

func (r *MerchantRepo) Register(c echo.Context, p *model.Merchant) (*model.Merchant, error) {
	db := data.Instance()

	var Merchant model.Merchant
	err := db.Where("name = ?", p.Name).First(&Merchant).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, errors.New("合作商名称已注册")
	}
	p.Password = util.RandStringRunes(6)

	err = db.Create(p).Error

	return p, err
}

func (r *MerchantRepo) Login(c echo.Context, id uint, password string) (*model.Merchant, error) {
	db := data.Instance()

	var Merchant model.Merchant
	err := db.Where("id = ?", id).First(&Merchant).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("用户不存在")
		}
		return nil, err
	}
	if password != Merchant.Password {
		return nil, errors.New("密码错误")
	}

	Merchant.Token = util.NewToken()
	Merchant.ExpireAt = time.Now().Add(1 * time.Hour)

	return &Merchant, nil
}

func (r *MerchantRepo) List(c echo.Context) ([]*model.Merchant, error) {
	db := data.Instance()

	var Merchants []*model.Merchant
	err := db.Where("enable = ?", model.Enabled).Find(&Merchants).Error
	if err != nil {
		return nil, err
	}

	return Merchants, err
}

func (r *MerchantRepo) CheckToken(c echo.Context, token string) error {
	db := data.Instance()

	var user model.Merchant
	err := db.Where("token = ?", token).Find(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return echo.NewHTTPError(http.StatusUnauthorized, "无效token")
		}
		return err
	}

	if user.ID == 0 {
		return echo.NewHTTPError(http.StatusUnauthorized, "无效token")
	}

	if time.Now().After(user.ExpireAt) {
		return echo.NewHTTPError(http.StatusUnauthorized, "token已过期")
	}

	return nil
}

func (r *MerchantRepo) SetPassword(c echo.Context, id uint, password, newpassword string) (*model.Merchant, error) {
	db := data.Instance()

	var Merchant model.Merchant
	err := db.Where("id = ?", id).First(&Merchant).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("用户不存在")
		}
		return nil, err
	}
	if password != Merchant.Password {
		return nil, errors.New("密码错误")
	}

	Merchant.Password = newpassword

	err = db.Where("id = ?", id).Updates(model.Partner{Password: Merchant.Password}).Error
	if err != nil {
		return nil, err
	}

	return &Merchant, nil
}
