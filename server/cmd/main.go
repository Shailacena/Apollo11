package main

import (
	mw "apollo/server/internal/middleware"
	"apollo/server/internal/model"
	"apollo/server/internal/router"
	"apollo/server/pkg/app"
	"apollo/server/pkg/config"
	"apollo/server/pkg/data"
	"fmt"

	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
)

func main() {
	conf := config.New("configs/config.yaml")

	db := data.Init(conf.MysqlConfig)
	db.AutoMigrate(&model.SysUser{})

	e := app.Engine()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.RequestID())

	e.Use(mw.HandleErrorMiddleware())

	e.Logger.SetLevel(log.INFO)

	router.Init(e)

	e.Logger.Fatal(e.Start(fmt.Sprintf(":%d", conf.HttpConfig.Port)))
}
