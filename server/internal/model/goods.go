package model

import (
	"gorm.io/gorm"
)

type Goods struct {
	gorm.Model
	PartnerId    uint   `json:"partnerId" gorm:"index;default:0;comment:合作商编号"`
	RechargeType int    `json:"rechargeType" gorm:"comment:充值类型"`
	SkuId        string `json:"skuId" gorm:"comment:skuId"`
	BrandId      string `json:"brandId" gorm:"comment:brandId"`
	Price        int    `json:"price" gorm:"default:0;comment:商品金额"`
	RealPrice    int    `json:"realPrice" gorm:"default:0;comment:商品实际金额"`
	ShopName     string `json:"shopName" gorm:"comment:店铺名称"`
}

func (Goods) TableName() string {
	return "goods"
}
