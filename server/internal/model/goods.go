package model

import (
	"gorm.io/gorm"
)

type Goods struct {
	gorm.Model
	Name string `json:"name" gorm:"comment:合作商名称"`
	PartnerId   uint     `json:"partnerId" gorm:"index;default:0;comment:合作商编号"`
}

func (Goods) TableName() string {
	return "goods"
}
