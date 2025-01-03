package model

import (
	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	Name    string `json:"name" gorm:"comment:合作商名称"`
	OrderId string `json:"orderId" gorm:"index;comment:订单号"`
}

func (Order) TableName() string {
	return "order"
}
