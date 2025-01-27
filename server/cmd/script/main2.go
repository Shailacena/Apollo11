package main

import (
	// mw "apollo/server/internal/middleware"
	// "apollo/server/internal/model"
	// "apollo/server/internal/router"
	// "apollo/server/pkg/app"
	// "apollo/server/pkg/config"
	// "apollo/server/pkg/data"
	// "apollo/server/pkg/validate"
	// "fmt"

	// "github.com/labstack/echo/v4"
	// "github.com/labstack/echo/v4/middleware"
	// "github.com/labstack/gommon/log"

	"fmt"
	"os/exec"
	"strings"
)

func main() {
	ck := "pin=jd_XgYOBMKfcELO;wskey=AAJnhLbSAEDVyHIPhPFwP1f0EIVeqLhjiqdX9f85Tu3Byn0dmsSC4e0xep-x3_S8UK8MmJZVOgdGUwPIogfngofFwArPyYEn;"
	sku := "10085738847942"
	// cmd := exec.Command("python", "../jd/main.py", ck, sku)
	cmd := exec.Command("python3", "../jd/main.py", ck, sku)
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println("Error:", err)
	}

	// 解析输出结果，查找异常信息
	outputStr := string(output)
	if strings.Contains(outputStr, "发生错误:") {
		fmt.Println("Python脚本抛出异常:", strings.TrimPrefix(outputStr, "发生错误:"))
	} else {
		fmt.Println("Python脚本输出:", outputStr)
	}

	// conf := config.New("configs/config.yaml")

	// db := data.Init(conf.MysqlConfig)
	// model.InitMigrate(db)

	// e := app.Engine()

	// e.Logger.SetLevel(log.INFO)

	// e.Use(middleware.Logger())
	// e.Use(middleware.Recover())
	// e.Use(middleware.RequestID())

	// e.Validator = validate.NewReqValidator()

	// e.Use(middleware.BodyDump(func(c echo.Context, reqBody, resBody []byte) {
	// 	c.Logger().Info("reqBody:", string(reqBody))
	// 	c.Logger().Info("resBody:", string(resBody))
	// }))

	// e.Use(mw.HandleErrorMiddleware())

	// router.Init(e)

	// e.Logger.Fatal(e.Start(fmt.Sprintf(":%d", conf.HttpConfig.Port)))
}
