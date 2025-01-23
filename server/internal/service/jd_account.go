package service

import (
	v1 "apollo/server/api/v1"
	"apollo/server/internal/model"
	"apollo/server/internal/repository"

	"github.com/labstack/echo/v4"
)

var (
	JDAccount = new(JDAccountService)
)

type JDAccountService struct {
}

func (s *JDAccountService) Create(c echo.Context, req *v1.JDAccountCreateReq) (*v1.JDAccountCreateResp, error) {
	list := make([]*model.JDAccount, 0, len(req.AccountList))
	for _, a := range req.AccountList {
		if len(a.Account) == 0 || len(a.WsKey) == 0 {
			continue
		}

		list = append(list, &model.JDAccount{
			Account: a.Account,
			WsKey:   a.WsKey,
			Remark:  req.Remark,
		})
	}
	err := repository.JDAccount.Create(c, list)
	if err != nil {
		return nil, err
	}

	return &v1.JDAccountCreateResp{}, nil
}

func (s *JDAccountService) Enable(c echo.Context, req *v1.JDAccountEnableReq) (*v1.JDAccountEnableResp, error) {
	err := repository.JDAccount.Enable(c, req.Id, model.EnableStatus(req.Enable))
	if err != nil {
		return nil, err
	}

	return &v1.JDAccountEnableResp{}, nil
}

func (s *JDAccountService) List(c echo.Context, req *v1.ListJDAccountReq) (*v1.ListJDAccountResp, error) {
	accounts, err := repository.JDAccount.List(c, req)
	if err != nil {
		return nil, err
	}

	list := make([]*v1.JDAccount, 0, len(accounts))
	for _, a := range accounts {
		list = append(list, &v1.JDAccount{
			Id:                     a.ID,
			Account:                a.Account,
			RealNameStatus:         a.RealNameStatus,
			TotalOrderCount:        a.TotalOrderCount,
			TodayOrderCount:        a.TodayOrderCount,
			TotalSuccessOrderCount: a.TotalSuccessOrderCount,
			OnlineStatus:           int(a.OnlineStatus),
			Enable:                 int(a.Enable),
			Remark:                 a.Remark,
			CreateAt:               a.CreatedAt.Unix(),
			UpdateAt:               a.UpdatedAt.Unix(),
		})
	}

	return &v1.ListJDAccountResp{
		List: list,
	}, nil
}

func (s *JDAccountService) Delete(c echo.Context, req *v1.JDAccountDeleteReq) (*v1.JDAccountDeleteResp, error) {
	err := repository.JDAccount.Delete(c, req)
	if err != nil {
		return nil, err
	}

	return &v1.JDAccountDeleteResp{}, nil
}

func (s *JDAccountService) ResetStatus(c echo.Context, req *v1.JDAccountResetStatusReq) (*v1.JDAccountResetStatusResp, error) {
	err := repository.JDAccount.ResetStatus(c, req)
	if err != nil {
		return nil, err
	}

	return &v1.JDAccountResetStatusResp{}, nil
}

func (s *JDAccountService) Reset(c echo.Context, req *v1.JDAccountResetReq) (*v1.JDAccountResetResp, error) {
	err := repository.JDAccount.Reset(c, req)
	if err != nil {
		return nil, err
	}

	return &v1.JDAccountResetResp{}, nil
}
