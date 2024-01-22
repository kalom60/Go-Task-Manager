package middlewares

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"
	"todo-manager/utils"
)

func writeJSON(w http.ResponseWriter, status int, key string, v any) {
	switch v.(type) {
	case string:
		message := map[string]interface{}{
			key: v,
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(status)
		json.NewEncoder(w).Encode(message)
	default:
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(status)
		json.NewEncoder(w).Encode(v)
	}
}

func Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		token := strings.TrimPrefix(authHeader, "Bearer ")
		if token == "" {
			writeJSON(w, http.StatusUnauthorized, "message", "Please login.")
			return
		}

		userID, err := utils.VerifyToken(token)
		if err != nil {
			if err.Error() == "Token is expired." {
				writeJSON(w, http.StatusUnauthorized, "message", "Expired token")
				return
			} else {
				writeJSON(w, http.StatusUnauthorized, "message", "Invalid or expired token. Please authenticate again.")
				return
			}
		}

		type keyType string

		const userIDKey keyType = "userID"
		ctx := context.WithValue(r.Context(), userIDKey, userID)

		// ctx := context.WithValue(r.Context(), "userID", userID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func AuthenticateRefreshToken(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		c, err := r.Cookie("refresh_token")
		if err != nil {
			if err == http.ErrNoCookie {
				writeJSON(w, http.StatusUnauthorized, "message", "Please login.")
				return
			}
			writeJSON(w, http.StatusBadRequest, "message", "Something went wrong. Please try again later.")
			return
		}

		token := c.Value
		userID, err := utils.VerifyToken(token)
		if err != nil {
			writeJSON(w, http.StatusUnauthorized, "message", "Please login.")
			return
		}

		type keyType string

		const userIDKey keyType = "userID"
		ctx := context.WithValue(r.Context(), userIDKey, userID)

		// ctx := context.WithValue(r.Context(), "userID", userID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
