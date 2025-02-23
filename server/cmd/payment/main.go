package main

import (
	"apollo/server/cmd/payment/order/merchant"
	"apollo/server/pkg/app"
	"apollo/server/pkg/config"
	"apollo/server/pkg/data"
	"fmt"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	llog "github.com/labstack/gommon/log"
)

func main() {
	conf := config.New("configs/config.yaml")

	data.Init(conf.MysqlConfig)

	e := app.Engine()

	e.Logger.SetLevel(llog.INFO)

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.RequestID())

	e.Use(middleware.BodyDump(func(c echo.Context, reqBody, resBody []byte) {
		c.Logger().Info("reqBody:", string(reqBody))
		c.Logger().Info("resBody:", string(resBody))
	}))

	e.Static("/page", "cmd/payment/html")

	paymentGroup := e.Group("/payment")
	merchantOrderGroup := paymentGroup.Group("/merchant/order")
	merchantOrderGroup.POST("/create", merchant.CreateOrder)
	merchantOrderGroup.POST("/query", merchant.QueryOrder)
	// orderGroup.POST("/query/balance", order.CreateOrder)

	notifyGroup := paymentGroup.Group("/notify")
	notifyGroup.POST("/agiso", merchant.AgisoNotify)

	// innerOrderGroup := paymentGroup.Group("/o")
	// innerOrderGroup.GET("/query", order.CreateOrder)

	e.Logger.Fatal(e.Start(fmt.Sprintf(":%d", conf.PaymentHttpConfig.Port)))
}
