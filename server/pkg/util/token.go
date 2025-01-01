package util

import "github.com/google/uuid"

const (
	TokenCookieKey = "X-TOKEN"
)

func NewToken() string {
	uid := uuid.New()
	return uid.String()
}

