package service

import (
	v1 "apollo/server/api/v1"
	"apollo/server/internal/repository"

	"github.com/labstack/echo/v4"
)

var (
	Goods = new(GoodsService)
)

type GoodsService struct {
}

func (s *GoodsService) Create(c echo.Context, req *v1.GoodsCreateReq) (*v1.GoodsCreateResp, error) {
	// list := make([]*model.Goods, 0, len(req.AccountList))
	// for _, a := range req.AccountList {
	// 	if len(a) == 0 {
	// 		continue
	// 	}

	// 	str := strings.Split(a, ";")

	// 	if len(str) <= 1 {
	// 		continue
	// 	}

	// 	list = append(list, &model.Goods{
	// 		Account: strings.Replace(str[0], "pin=", "", 1),
	// 		WsKey:   strings.Replace(str[1], "wskey=", "", 1),
	// 		Remark:  req.Remark,
	// 	})
	// }
	// err := repository.Goods.Create(c, list)
	// if err != nil {
	// 	return nil, err
	// }

	return &v1.GoodsCreateResp{}, nil
}

func (s *GoodsService) List(c echo.Context, req *v1.ListGoodsReq) (*v1.ListGoodsResp, error) {
	goodsList, err := repository.Goods.List(c)
	if err != nil {
		return nil, err
	}

	list := make([]*v1.Goods, 0, len(goodsList))
	for _, g := range goodsList {
		list = append(list, &v1.Goods{
			PartnerId: g.PartnerId,
		})
	}

	return &v1.ListGoodsResp{
		List: list,
	}, nil
}
