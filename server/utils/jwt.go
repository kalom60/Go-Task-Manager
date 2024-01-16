package utils

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var secretKey = os.Getenv("SECRET_KEY ")

func GenerateToken(email, userID string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email":  email,
		"userID": userID,
		"exp":    time.Now().Add(time.Hour + 1).Unix(),
	})

	return token.SignedString([]byte(secretKey))
}

func VerifyToken(token string) (string, error) {
	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)
		if !ok {
			return nil, errors.New("Unexpected signing method.")
		}

		return []byte(secretKey), nil
	})

	if err != nil {
		return "", errors.New("Could not parse token.")
	}

	tokenIsValid := parsedToken.Valid
	if !tokenIsValid {
		return "", errors.New("Invalid toke.")
	}

	claims, ok := parsedToken.Claims.(jwt.MapClaims)
	if !ok {
		return "", errors.New("Invalid token claims.")
	}

	// email := claims["email"].(string)
	userID := claims["userID"].(string)
	return userID, nil
}
