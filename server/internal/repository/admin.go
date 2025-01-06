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
	Admin = &AdminRepo{}
)

type AdminRepo struct {
}

func (r *AdminRepo) Register(c echo.Context, u *model.SysUser) (*model.SysUser, error) {
	db := data.Instance()

	var user model.SysUser
	err := db.Where("username = ?", u.Username).First(&user).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, errors.New("用户名已注册")
	}
	u.Password = util.RandStringRunes(6)

	err = db.Create(u).Error

	return u, err
}

func (r *AdminRepo) Login(c echo.Context, username, password string) (*model.SysUser, error) {
	db := data.Instance()

	var user model.SysUser
	err := db.Where("username = ?", username).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("用户不存在")
		}
		return nil, err
	}
	if password != user.Password {
		return nil, errors.New("密码错误")
	}

	user.Token = util.NewToken()
	user.ExpireAt = time.Now().Add(1 * time.Hour)

	err = db.Where("username = ?", username).Updates(model.SysUser{Token: user.Token, ExpireAt: user.ExpireAt}).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *AdminRepo) List(c echo.Context) ([]*model.SysUser, error) {
	db := data.Instance()

	var users []*model.SysUser
	err := db.Where("enable = ?", model.Enabled).Find(&users).Error
	if err != nil {
		return nil, err
	}

	return users, err
}

func (r *AdminRepo) CheckToken(c echo.Context, token string) error {
	db := data.Instance()

	var user model.SysUser
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
