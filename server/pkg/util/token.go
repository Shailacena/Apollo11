package util

import "github.com/google/uuid"

const (
	TokenCookieKey = "Ttttt" // token
	RoleCookieKey  = "Rrrr"  // role
)

func NewToken() string {
	uid := uuid.New()
	return uid.String()
}
