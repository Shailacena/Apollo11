package router

import (
	"apollo/server/internal/handler"
	"apollo/server/internal/middleware"
	"apollo/server/internal/repository"

	"github.com/labstack/echo/v4"
)

func Init(e *echo.Echo) {
	apiGroup := e.Group("/api")

	adminTokenChecker := middleware.GenAuthHandler(repository.Admin)
	adminGroup := apiGroup.Group("/admin", adminTokenChecker())
	adminGroupWithoutAuth := apiGroup.Group("/admin")
	{
		adminGroupWithoutAuth.POST("/login", handler.Admin.Login)
		adminGroup.POST("/register", handler.Admin.Register)
		adminGroup.GET("/list", handler.Admin.List)
		adminGroup.GET("/setPassword", handler.Admin.SetPassword)
		adminGroup.POST("/resetPassword", handler.Admin.ResetPassword)
		adminGroup.POST("/delete", handler.Admin.Delete)
		adminGroup.POST("/update", handler.Admin.Update)
		adminGroup.POST("/enable", handler.Admin.Enable)
	}

	// partnerTokenChecker := middleware.GenAuthHandler(repository.Partner)
	partnerGroup := apiGroup.Group("/partner", adminTokenChecker())
	partnerGroupWithoutAuth := apiGroup.Group("/partner")
	{
		partnerGroupWithoutAuth.POST("/login", handler.Partner.Login)
		partnerGroup.POST("/register", handler.Partner.Register)
		partnerGroup.GET("/list", handler.Partner.List)
		partnerGroup.GET("/listBill", handler.Partner.ListBill)
		partnerGroup.POST("/setPassword", handler.Partner.SetPassword)
		partnerGroup.POST("/update", handler.Partner.Update)
	}

	// merchantTokenChecker := middleware.GenAuthHandler(repository.Merchant)
	merchantGroup := apiGroup.Group("/merchant", adminTokenChecker())
	merchantGroupWithoutAuth := apiGroup.Group("/merchant")
	{
		merchantGroupWithoutAuth.POST("/login", handler.Merchant.Login)
		merchantGroup.POST("/register", handler.Merchant.Register)
		merchantGroup.GET("/list", handler.Merchant.List)
		adminGroup.GET("/setPassword", handler.Merchant.SetPassword)
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

	goodsGroup := apiGroup.Group("/goods")
	{
		goodsGroup.POST("/create", handler.Goods.Create)
		goodsGroup.GET("/list", handler.Goods.List)
	}

	orderGroup := apiGroup.Group("/order")
	{
		orderGroup.GET("/list", handler.Order.List)
	}
}
