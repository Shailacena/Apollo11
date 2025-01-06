package util

import "github.com/google/uuid"

const (
	TokenCookieKey = "token"
)

func NewToken() string {
	uid := uuid.New()
	return uid.String()
}

