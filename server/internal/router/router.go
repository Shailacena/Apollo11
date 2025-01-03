package router

import (
	"apollo/server/internal/handler"

	"github.com/labstack/echo/v4"
)

func Init(e *echo.Echo) {
	apiGroup := e.Group("/api")

	adminGroup := apiGroup.Group("/admin")
	{
		adminGroup.POST("/login", handler.Admin.Login)
		adminGroup.POST("/register", handler.Admin.Register)
		adminGroup.GET("/list", handler.Admin.List)
	}

	partnerGroup := apiGroup.Group("/partner")
	{
		partnerGroup.POST("/login", handler.Partner.Login)
		partnerGroup.POST("/register", handler.Partner.Register)
		partnerGroup.GET("/list", handler.Partner.List)
		partnerGroup.GET("/listBill", handler.Partner.ListBill)
	}

	merchantGroup := apiGroup.Group("/merchant")
	{
		merchantGroup.POST("/login", handler.Merchant.Login)
		merchantGroup.POST("/register", handler.Merchant.Register)
		merchantGroup.GET("/list", handler.Merchant.List)
	}

	realNameAccountGroup := apiGroup.Group("/realNameAccount")
	{
		realNameAccountGroup.POST("/create", handler.RealNameAccount.Create)
		realNameAccountGroup.GET("/list", handler.RealNameAccount.List)
	}

	jdAccountGroup := apiGroup.Group("/jdAccount")
	{
		jdAccountGroup.POST("/create", handler.JDAccount.Create)
		jdAccountGroup.GET("/list", handler.JDAccount.List)
	}

	statisticsGroup := apiGroup.Group("/statistics")
	{
		statisticsGroup.GET("/listBill", handler.Statistics.List)
	}
}
