package utils

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var secretKey = os.Getenv("SECRET_KEY ")

func GenerateToken(email, userID string, expiration time.Time) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email":  email,
		"userID": userID,
		"exp":    expiration.Unix(),
	})

	return token.SignedString([]byte(secretKey))
}

func VerifyToken(token string) (string, error) {
	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("Unexpected signing method.")
		}

		return []byte(secretKey), nil
	})

	if err != nil {
		return "", errors.New("Could not parse token.")
	}

	tokenIsValid := parsedToken.Valid
	if !tokenIsValid {
		return "", errors.New("Invalid token.")
	}

	claims, ok := parsedToken.Claims.(jwt.MapClaims)
	if !ok {
		return "", errors.New("Invalid token claims.")
	}

	if exp, ok := claims["exp"].(float64); ok {
		if time.Unix(int64(exp), 0).Before(time.Now()) {
			return "", errors.New("Token is expired.")
		}
	} else {
		return "", errors.New("Invalid token expiration.")
	}

	// email := claims["email"].(string)
	userID := claims["userID"].(string)
	return userID, nil
}
