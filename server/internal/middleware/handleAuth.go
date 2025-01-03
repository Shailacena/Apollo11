package middleware

import (
	"apollo/server/pkg/util"

	"github.com/labstack/echo/v4"
)

func HandleAuth() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// token := GetToken(c)

			// token不相同

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
