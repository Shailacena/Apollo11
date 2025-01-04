package model

import (
	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	OrderId         string `json:"orderId" gorm:"index;comment:订单号"`
	MerchantId      uint   `json:"merchantId" gorm:"comment:商户号"`
	MerchantOrderId string `json:"merchantOrderId" gorm:"comment:商户订单号"`
	OfficialOrderId string `json:"officialOrderId" gorm:"comment:官方订单号"`
	Price           int    `json:"price" gorm:"default:0;comment:订单金额"`
	PayType         int    `json:"payType" gorm:"default:1;comment:支付类型"`
	PayAccount      string `json:"payAccount" gorm:"comment:下单账号"`
	PayStatus       uint   `json:"payStatus" gorm:"comment:下单状态"`
	SkuId           string `json:"skuId" gorm:"comment:skuId"`
	Shop            string `json:"shop" gorm:"comment:店铺"`
	CallbackStatus  string `json:"callbackStatus" gorm:"comment:回调状态"`
	IP              string `json:"ip" gorm:"comment:ip"`
	Device          string `json:"device" gorm:"comment:设备类型"`
	Remark          string `json:"remark" gorm:"comment:备注"`
}

func (Order) TableName() string {
	return "order"
}
