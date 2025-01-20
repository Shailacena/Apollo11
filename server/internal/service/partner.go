package service

import (
	v1 "apollo/server/api/v1"
	"apollo/server/internal/model"
	"apollo/server/internal/repository"
	"apollo/server/pkg/util"
	"net/http"

	"github.com/labstack/echo/v4"
)

var (
	Partner = new(PartnerService)
)

type PartnerService struct {
}

func (s *PartnerService) Register(c echo.Context, req *v1.PartnerRegisterReq) (*v1.PartnerRegisterResp, error) {
	p := model.Partner{
		Name:          req.Name,
		DailyLimit:    -1,
		CreditAmount:  0,
		Priority:      10,
		SuperiorAgent: req.SuperiorAgent,
		Level:         req.Level,
		StockAmount:   0,
		RechargeTime:  999999,
		PrivateKey:    util.RandStringRunes(16),
		Remark:        req.Remark,
	}
	partner, err := repository.Partner.Register(c, &p)
	if err != nil {
		return nil, err
	}

	return &v1.PartnerRegisterResp{
		Name:     req.Name,
		Password: partner.Password,
	}, nil
}

func (s *PartnerService) Login(c echo.Context, req *v1.PartnerLoginReq) (*v1.PartnerLoginResp, error) {
	partner, err := repository.Partner.Login(c, req.Id, req.Password)
	if err != nil {
		return nil, err
	}

	return &v1.PartnerLoginResp{
		Token: partner.Token,
		Name:  partner.Name,
		Level: partner.Level,
	}, nil
}

func (s *PartnerService) List(c echo.Context, req *v1.ListPartnerReq) (*v1.ListPartnerResp, error) {
	partners, err := repository.Partner.List(c)
	if err != nil {
		return nil, err
	}

	list := make([]*v1.Partner, 0, len(partners))
	for _, u := range partners {
		list = append(list, &v1.Partner{
			Id:            u.ID,
			Name:          u.Name,
			CreditAmount:  u.CreditAmount,
			DailyLimit:    u.DailyLimit,
			Priority:      u.Priority,
			SuperiorAgent: u.SuperiorAgent,
			Level:         u.Level,
			StockAmount:   u.StockAmount,
			RechargeTime:  u.RechargeTime,
			PrivateKey:    u.PrivateKey,
			Enable:        int(u.Enable),
			Remark:        u.Remark,
		})
	}

	return &v1.ListPartnerResp{
		List: list,
	}, nil
}

func (s *PartnerService) ListBill(c echo.Context, req *v1.ListPartnerBillReq) (*v1.ListPartnerBillResp, error) {
	bills, err := repository.Partner.ListBill(c)
	if err != nil {
		return nil, err
	}

	list := make([]*v1.PartnerBill, 0, len(bills))
	for _, b := range bills {
		list = append(list, &v1.PartnerBill{
			PartnerId:   b.PartnerId,
			Type:        int(b.Type),
			ChangeMoney: b.ChangeMoney,
			Money:       b.Money,
			Remark:      b.Remark,
			CreateAt:    b.CreatedAt.Unix(),
		})
	}

	return &v1.ListPartnerBillResp{
		List: list,
	}, nil
}

func (s *PartnerService) SetPassword(c echo.Context, req *v1.PartnerSetPasswordReq) (*v1.PartnerSetPasswordResp, error) {
	if len(req.NewPassword) < 6 {
		return nil, echo.NewHTTPError(http.StatusBadRequest, "密码不符")
	}

	_, err := repository.Partner.SetPassword(c, req.Id, req.OldPassword, req.NewPassword)
	if err != nil {
		return nil, err
	}

	return &v1.PartnerSetPasswordResp{}, nil
}

func (s *PartnerService) Update(c echo.Context, req *v1.PartnerUpdateReq) (*v1.PartnerUpdateResp, error) {
	_, err := repository.Partner.Update(c, req.Id, req.Priority, req.DailyLimit, req.ChangeCreditAmount, req.RechargeTime, req.Remark)
	if err != nil {
		return nil, err
	}

	return &v1.PartnerUpdateResp{}, nil
}
