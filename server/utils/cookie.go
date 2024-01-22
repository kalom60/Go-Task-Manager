package utils

import (
	"net/http"
	"time"
)

func SetCookie(w http.ResponseWriter, name, value string, expiration time.Time) {
	cookie := buildCookie(name, value, expiration.Second())
	http.SetCookie(w, cookie)
}

func ClearCookie(w http.ResponseWriter, name string) {
	cookie := buildCookie(name, "", -1)
	http.SetCookie(w, cookie)
}

func buildCookie(name, value string, expires int) *http.Cookie {
	cookie := &http.Cookie{
		Name:     name,
		Value:    value,
		Path:     "/",
		HttpOnly: true,
		// Secure:   true,
		MaxAge: expires,
	}

	return cookie
}
