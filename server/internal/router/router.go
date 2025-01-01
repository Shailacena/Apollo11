package router

import (
	"apollo/server/internal/handler"

	"github.com/labstack/echo/v4"
)

func Init(e *echo.Echo) {
	apiGroup := e.Group("api")

	adminGroup := apiGroup.Group("admin")
	{
		adminGroup.POST("/login", handler.Admin.Login)
		adminGroup.POST("/register", handler.Admin.Register)
		adminGroup.POST("/list", handler.Admin.List)
	}
}
