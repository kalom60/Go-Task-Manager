package utils

import (
	"net/http"
	"time"
)

func SetCookie(w http.ResponseWriter, name, value string, expiration time.Time) {
	cookie := buildCookie(name, value, int(time.Until(expiration).Seconds()))
	http.SetCookie(w, cookie)
}

func ClearCookie(w http.ResponseWriter, name string) {
	cookie := buildCookie(name, "", -1)
	http.SetCookie(w, cookie)
}

func buildCookie(name, value string, expires int) *http.Cookie {
	cookie := http.Cookie{
		Name:     name,
		Value:    value,
		Path:     "/",
		MaxAge:   expires,
		HttpOnly: true,
	}

	return &cookie
}
