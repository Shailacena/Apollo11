package repository

import (
	"apollo/server/internal/model"
	"apollo/server/pkg/data"
	"apollo/server/pkg/util"
	"errors"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/pquerna/otp/totp"
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

	// 生成一个随机的密钥
	key, err2 := totp.Generate(totp.GenerateOpts{
		Issuer:      "Apollo11",
		AccountName: u.Username,
	})

	if err2 != nil {
		return nil, err2
	}

	u.SecretKey = key.Secret()
	u.UrlKey = key.URL()
	u.Password = util.RandStringRunes(6)

	err = db.Create(u).Error

	return u, err
}

func (r *AdminRepo) Login(c echo.Context, username, password, verificode string) (*model.SysUser, error) {
	db := data.Instance()

	var user model.SysUser
	err := db.Where("username = ? AND password = ? AND enable = ?", username, password, model.Enabled).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("账号或密码错误")
		}
		return nil, err
	}

	// if user.SecretKey == "" {
	// 	// 生成一个随机的密钥
	// 	key, err2 := totp.Generate(totp.GenerateOpts{
	// 		Issuer:      "Apollo11",
	// 		AccountName: user.Username,
	// 	})
	// 	if err2 != nil {
	// 		return nil, errors.New("生成验证码失败")
	// 	}

	// 	user.SecretKey = key.Secret()
	// 	user.UrlKey = key.URL()

	// 	err = db.Where("username = ?", username).Updates(model.SysUser{SecretKey: user.SecretKey, UrlKey: user.UrlKey}).Error
	// 	if err != nil {
	// 		return nil, err
	// 	}
	// }
	// // 验证OTP码
	// valid := totp.Validate(verificode, user.SecretKey)
	// if !valid {
	// 	return nil, errors.New("验证失败")
	// }

	user.Token = util.NewToken()
	user.ExpireAt = time.Now().Add(1 * time.Hour)

	err = db.Where("username = ?", username).Updates(model.SysUser{Token: user.Token, ExpireAt: user.ExpireAt}).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *AdminRepo) Logout(c echo.Context, token string) error {
	db := data.Instance()

	err := db.Where("token = ?", token).Updates(model.SysUser{ExpireAt: time.Now()}).Error
	if err != nil {
		return err
	}
	return nil
}

func (r *AdminRepo) List(c echo.Context) ([]*model.SysUser, error) {
	db := data.Instance()

	var users []*model.SysUser
	err := db.Limit(20).Find(&users).Error
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
		return echo.NewHTTPError(http.StatusUnauthorized, "无效token")
	}

	return nil
}

func (r *AdminRepo) SetPassword(c echo.Context, token, password, newPassword string) (*model.SysUser, error) {
	db := data.Instance()

	var user model.SysUser
	err := db.Where("token = ?", token).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("用户不存在")
		}
		return nil, err
	}
	if password != user.Password {
		return nil, errors.New("密码错误")
	}

	user.Password = newPassword

	err = db.Where("id = ?", user.ID).Updates(model.SysUser{Password: user.Password}).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *AdminRepo) ResetPassword(c echo.Context, username string) (*model.SysUser, error) {
	db := data.Instance()

	var user model.SysUser
	err := db.Where("username = ?", username).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("用户不存在")
		}
		return nil, err
	}

	user.Password = util.RandStringRunes(6)

	err = db.Where("username = ?", username).Updates(model.SysUser{Password: user.Password}).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *AdminRepo) Delete(c echo.Context, username string) (*model.SysUser, error) {
	db := data.Instance()

	var user model.SysUser
	err := db.Where("username = ?", username).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("用户不存在")
		}
		return nil, err
	}

	err = db.Where("username = ?", username).Delete(&user).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *AdminRepo) Update(c echo.Context, username, nickname, remark string) (*model.SysUser, error) {
	db := data.Instance()

	var user model.SysUser
	err := db.Where("username = ?", username).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("用户不存在")
		}
		return nil, err
	}
	user.Nickname = nickname
	user.Remark = remark
	err = db.Where("username = ?", username).Updates(model.SysUser{Nickname: user.Nickname, Remark: user.Remark}).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *AdminRepo) Enable(c echo.Context, username string, enable int) (*model.SysUser, error) {
	db := data.Instance()

	var user model.SysUser
	err := db.Where("username = ?", username).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("用户不存在")
		}
		return nil, err
	}

	user.Enable = model.EnableStatus(enable)
	err = db.Where("username = ?", username).Updates(model.SysUser{Enable: user.Enable}).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *AdminRepo) ResetVerifiCode(c echo.Context, id uint) (*model.SysUser, error) {
	db := data.Instance()

	var user model.SysUser
	err := db.Where("id = ?", id).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("用户不存在")
		}
		return nil, err
	}

	// 生成一个随机的密钥
	key, err := totp.Generate(totp.GenerateOpts{
		Issuer:      "Apollo11",
		AccountName: user.Username,
	})
	if err != nil {
		return nil, err
	}

	err = db.Where("id = ?", id).Updates(model.SysUser{SecretKey: key.Secret(), UrlKey: key.URL()}).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}
