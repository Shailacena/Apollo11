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
		adminGroup.POST("/list", handler.Admin.List)
	}

	partnerGroup := apiGroup.Group("/partner")
	{
		partnerGroup.POST("/login", handler.Partner.Login)
		partnerGroup.POST("/register", handler.Partner.Register)
		partnerGroup.POST("/list", handler.Partner.List)
	}

	merchantGroup := apiGroup.Group("/merchant")
	{
		merchantGroup.POST("/login", handler.Merchant.Login)
		merchantGroup.POST("/register", handler.Merchant.Register)
		merchantGroup.POST("/list", handler.Merchant.List)
	}
}
