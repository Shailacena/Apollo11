package service

import (
	v1 "apollo/server/api/v1"
	"apollo/server/internal/model"
	"apollo/server/internal/repository"
	"net/http"

	"github.com/labstack/echo/v4"
)

var (
	Merchant = new(MerchantService)
)

type MerchantService struct {
}

func (s *MerchantService) Register(c echo.Context, req *v1.MerchantRegisterReq) (*v1.MerchantRegisterResp, error) {
	p := model.Merchant{
		Name:   req.Name,
		Remark: req.Remark,
	}
	Merchant, err := repository.Merchant.Register(c, &p)
	if err != nil {
		return nil, err
	}

	return &v1.MerchantRegisterResp{
		Name:     req.Name,
		Password: Merchant.Password,
	}, nil
}

func (s *MerchantService) Login(c echo.Context, req *v1.MerchantLoginReq) (*v1.MerchantLoginResp, error) {
	merchant, err := repository.Merchant.Login(c, req.Id, req.Password)
	if err != nil {
		return nil, err
	}

	return &v1.MerchantLoginResp{
		Token: merchant.Token,
		Name:  merchant.Name,
	}, nil
}

func (s *MerchantService) List(c echo.Context, req *v1.ListMerchantReq) (*v1.ListMerchantResp, error) {
	merchants, err := repository.Merchant.List(c)
	if err != nil {
		return nil, err
	}

	list := make([]*v1.Merchant, 0, len(merchants))
	for _, m := range merchants {
		list = append(list, &v1.Merchant{
			Id:         m.ID,
			Name:       m.Name,
			PrivateKey: m.PrivateKey,
			Enable:     int(m.Enable),
			Remark:     m.Remark,
			CreateAt:   m.CreatedAt.Unix(),
		})
	}

	return &v1.ListMerchantResp{
		List: list,
	}, nil
}

func (s *MerchantService) SetPassword(c echo.Context, req *v1.MerchantSetPasswordReq) (*v1.MerchantSetPasswordResp, error) {
	if len(req.NewPassword) < 6 {
		return nil, echo.NewHTTPError(http.StatusBadRequest, "密码不符")
	}

	_, err := repository.Merchant.SetPassword(c, req.Id, req.OldPassword, req.NewPassword)
	if err != nil {
		return nil, err
	}

	return &v1.MerchantSetPasswordResp{}, nil
}
