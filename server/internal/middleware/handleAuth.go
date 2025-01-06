package middleware

import (
	"apollo/server/internal/repository"
	"apollo/server/pkg/util"

	"github.com/labstack/echo/v4"
)

func HandleAuth() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			token := GetToken(c)

			// 校验token
			err := repository.Admin.CheckToken(c, token)
			if err != nil {
				return err
			}

			return next(c)
		}
	}
}

func GetToken(c echo.Context) string {
	cookie, _ := c.Cookie(util.TokenCookieKey)

	var token string
	if cookie != nil {
		token = cookie.Value
	}
	if len(token) == 0 {
		token = c.Request().Header.Get(util.TokenCookieKey)
	}

	return token
}
