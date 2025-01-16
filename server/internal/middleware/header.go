package middleware

import (
	"apollo/server/pkg/util"

	"github.com/labstack/echo/v4"
	"github.com/spf13/cast"
)

type Header struct {
	Token string
	Role  uint
}

func GetDataFromHeader(c echo.Context) Header {
	var h Header
	h.Token = c.Request().Header.Get(util.TokenCookieKey)
	r := c.Request().Header.Get(util.RoleCookieKey)

	h.Role = cast.ToUint(r)

	return h
}
