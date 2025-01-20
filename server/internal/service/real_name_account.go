package service

import (
	v1 "apollo/server/api/v1"
	"apollo/server/internal/model"
	"apollo/server/internal/repository"

	"github.com/labstack/echo/v4"
)

var (
	RealNameAccount = new(RealNameAccountService)
)

type RealNameAccountService struct {
}

func (s *RealNameAccountService) Create(c echo.Context, req *v1.RealNameAccountCreateReq) (*v1.RealNameAccountCreateResp, error) {
	list := make([]*model.RealNameAccount, 0, len(req.AccountList))
	for _, a := range req.AccountList {
		if a == nil || len(a.IdNumber) == 0 || len(a.Name) == 0 {
			continue
		}

		list = append(list, &model.RealNameAccount{
			IdNumber: a.IdNumber,
			Name:     a.Name,
			Remark:   req.Remark,
		})
	}
	err := repository.RealNameAccount.Create(c, list)
	if err != nil {
		return nil, err
	}

	return &v1.RealNameAccountCreateResp{}, nil
}

func (s *RealNameAccountService) List(c echo.Context, req *v1.ListRealNameAccountReq) (*v1.ListRealNameAccountResp, error) {
	accounts, err := repository.RealNameAccount.List(c)
	if err != nil {
		return nil, err
	}

	list := make([]*v1.RealNameAccount, 0, len(accounts))
	for _, a := range accounts {
		list = append(list, &v1.RealNameAccount{
			BaseRealNameAccount: v1.BaseRealNameAccount{
				IdNumber: a.IdNumber,
				Name:     a.Name,
			},
			RealNameCount: a.RealNameCount,
			Enable:        int(a.Enable),
			Remark:        a.Remark,
		})
	}

	return &v1.ListRealNameAccountResp{
		List: list,
	}, nil
}
