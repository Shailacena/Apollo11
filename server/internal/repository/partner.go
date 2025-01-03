package repository

import (
	"apollo/server/internal/model"
	"apollo/server/pkg/data"
	"apollo/server/pkg/util"
	"errors"
	"time"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

var (
	Partner = &PartnerRepo{}
)

type PartnerRepo struct {
}

func (r *PartnerRepo) Register(c echo.Context, p *model.Partner) (*model.Partner, error) {
	db := data.Instance()

	var partner model.Partner
	err := db.Where("name = ?", p.Name).First(&partner).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, errors.New("合作商名称已注册")
	}
	p.Password = util.RandStringRunes(6)

	err = db.Create(p).Error

	return p, err
}

func (r *PartnerRepo) Login(c echo.Context, id uint, password string) (*model.Partner, error) {
	db := data.Instance()

	var partner model.Partner
	err := db.Where("id = ?", id).First(&partner).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("用户不存在")
		}
		return nil, err
	}
	if password != partner.Password {
		return nil, errors.New("密码错误")
	}

	partner.Token = util.NewToken()
	partner.ExpireAt = time.Now().Add(1 * time.Hour)

	return &partner, nil
}

func (r *PartnerRepo) List(c echo.Context) ([]*model.Partner, error) {
	db := data.Instance()

	var partners []*model.Partner
	err := db.Where("enable = ?", model.Enabled).Find(&partners).Error
	if err != nil {
		return nil, err
	}

	return partners, err
}

func (r *PartnerRepo) ListBill(c echo.Context) ([]*model.PartnerBill, error) {
	db := data.Instance()

	var bills []*model.PartnerBill
	err := db.Limit(50).Find(&bills).Error
	if err != nil {
		return nil, err
	}

	return bills, err
}
