package model

import "gorm.io/gorm"

func InitMigrate(db *gorm.DB) {
	db.AutoMigrate(&SysUser{})
	db.Set("gorm:table_options", "AUTO_INCREMENT=10000").AutoMigrate(&Partner{})
	db.Set("gorm:table_options", "AUTO_INCREMENT=10000").AutoMigrate(&Merchant{})
}
