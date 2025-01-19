package middleware

import (
	"apollo/server/internal/model"
	"net/http"

	"github.com/labstack/echo/v4"
)

func CheckRoleHandler(role model.SysUserRole) func() echo.MiddlewareFunc {
	return func() echo.MiddlewareFunc {
		return func(next echo.HandlerFunc) echo.HandlerFunc {
			return func(c echo.Context) error {
				h := GetDataFromHeader(c)

				if role != model.SysUserRole(h.Role) {
					return echo.NewHTTPError(http.StatusForbidden, "禁止访问")
				}

				return next(c)
			}
		}
	}
}
