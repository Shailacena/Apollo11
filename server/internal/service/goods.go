package service

import (
	v1 "apollo/server/api/v1"
	"apollo/server/internal/model"
	"apollo/server/internal/repository"

	"github.com/labstack/echo/v4"
)

var (
	Goods = new(GoodsService)
)

type GoodsService struct {
}

func (s *GoodsService) Create(c echo.Context, req *v1.GoodsCreateReq) (*v1.GoodsCreateResp, error) {
	goods := &model.Goods{
		PartnerId:    req.PartnerId,
		RechargeType: req.RechargeType,
		SkuId:        req.SkuId,
		BrandId:      req.BrandId,
		Price:        req.Price,
		RealPrice:    req.RealPrice,
		ShopName:     req.ShopName,
	}

	err := repository.Goods.Create(c, goods)
	if err != nil {
		return nil, err
	}

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
			Id:           g.ID,
			PartnerId:    g.PartnerId,
			RechargeType: g.RechargeType,
			SkuId:        g.SkuId,
			BrandId:      g.BrandId,
			Price:        g.Price,
			RealPrice:    g.RealPrice,
			ShopName:     g.ShopName,
			CreateAt:     g.CreatedAt.Unix(),
		})
	}

	return &v1.ListGoodsResp{
		List: list,
	}, nil
}
