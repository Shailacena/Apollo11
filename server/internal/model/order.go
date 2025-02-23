package model

import (
	"time"

	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	OrderId         string    `json:"orderId" gorm:"index;comment:订单号"`
	ChannelId       string    `json:"channelId" gorm:"index;comment:渠道id"`
	MerchantId      uint      `json:"merchantId" gorm:"index;comment:商户号"`
	MerchantOrderId string    `json:"merchantOrderId" gorm:"index;comment:商户订单号"`
	OfficialOrderId string    `json:"officialOrderId" gorm:"index;comment:官方订单号"`
	Price           int32     `json:"price" gorm:"default:0;comment:订单金额"`
	PayType         int       `json:"payType" gorm:"default:1;comment:支付类型"`
	PayAccount      string    `json:"payAccount" gorm:"index;comment:下单账号"`
	Status          uint      `json:"status" gorm:"default:1;comment:下单状态"`
	SkuId           string    `json:"skuId" gorm:"index;comment:skuId"`
	Shop            string    `json:"shop" gorm:"comment:店铺"`
	NotifyStatus    string    `json:"notifyStatus" gorm:"comment:回调状态"`
	NotifyUrl       string    `json:"notifyUrl" gorm:"comment:回调地址"`
	PayUrl          string    `json:"payUrl" gorm:"comment:支付地址"`
	ExtParam        string    `json:"extParam" gorm:"comment:回调参数"`
	IP              string    `json:"ip" gorm:"comment:ip"`
	Device          string    `json:"device" gorm:"comment:设备类型"`
	Remark          string    `json:"remark" gorm:"comment:备注"`
	PayAt           time.Time `json:"payAt" gorm:"comment:支付时间"`
}

func (Order) TableName() string {
	return "order"
}
