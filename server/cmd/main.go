// package main

// import (
// 	mw "apollo/server/internal/middleware"
// 	"apollo/server/internal/model"
// 	"apollo/server/internal/router"
// 	"apollo/server/pkg/app"
// 	"apollo/server/pkg/config"
// 	"apollo/server/pkg/data"
// 	"apollo/server/pkg/validate"
// 	"fmt"

// 	"github.com/labstack/echo/v4"
// 	"github.com/labstack/echo/v4/middleware"
// 	"github.com/labstack/gommon/log"
// )

// func main() {
// 	conf := config.New("configs/config.yaml")

// 	db := data.Init(conf.MysqlConfig)
// 	model.InitMigrate(db)

// 	e := app.Engine()

// 	e.Logger.SetLevel(log.INFO)

// 	e.Use(middleware.Logger())
// 	e.Use(middleware.Recover())
// 	e.Use(middleware.RequestID())

// 	e.Validator = validate.NewReqValidator()

// 	e.Use(middleware.BodyDump(func(c echo.Context, reqBody, resBody []byte) {
// 		c.Logger().Info("reqBody:", string(reqBody))
// 		c.Logger().Info("resBody:", string(resBody))
// 	}))

// 	e.Use(mw.HandleErrorMiddleware())

// 	router.Init(e)

// 	e.Logger.Fatal(e.Start(fmt.Sprintf(":%d", conf.HttpConfig.Port)))
// }
