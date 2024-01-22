package routes

import (
	"encoding/json"
	"net/http"
	"time"
	"todo-manager/models"
	"todo-manager/utils"
)

func createUser(w http.ResponseWriter, r *http.Request) {
	var newUser models.User

	newUser.CreatedAt = time.Now()

	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, "message", "Invalid request format. Please check your input and try again.")
		return
	}

	defer r.Body.Close()

	err = newUser.Save()
	if err != nil {
		if err.Error() == "Email address already in use." {
			writeJSON(w, http.StatusBadRequest, "message", "Email address already in use.")
			return
		} else {
			writeJSON(w, http.StatusInternalServerError, "message", "Something went wrong. Please try again later.")
			return
		}
	}

	token, err := utils.GenerateToken(newUser.Email, newUser.ID.String(), time.Now().Add(time.Minute+15))
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, "message", "Failed to login. Please try again later.")
		return
	}

	refresh_token, err := utils.GenerateToken(newUser.Email, newUser.ID.String(), time.Now().Add(time.Hour+24))
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, "message", "Failed to login. Please try again later.")
		return
	}

	utils.SetCookie(w, "refresh_token", refresh_token, time.Now().Add(time.Hour+24))

	writeJSON(w, http.StatusCreated, "token", token)
}

type Login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func logIn(w http.ResponseWriter, r *http.Request) {
	var userData Login

	err := json.NewDecoder(r.Body).Decode(&userData)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, "message", "Invalid request format. Please check your input and try again.")
		return
	}

	defer r.Body.Close()

	userID, err := models.Login(userData.Email, userData.Password)
	if err != nil {
		if err.Error() == "User doesn't exist." {
			writeJSON(w, http.StatusInternalServerError, "message", "Invalid email or password.")
			return
		} else {
			writeJSON(w, http.StatusInternalServerError, "message", "Failed to login. Please try again later.")
			return
		}
	}

	token, err := utils.GenerateToken(userData.Email, userID, time.Now().Add(time.Minute+15))
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, "message", "Failed to login. Please try again later.")
		return
	}

	refresh_token, err := utils.GenerateToken(userData.Email, userID, time.Now().Add(time.Hour+24))
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, "message", "Failed to login. Please try again later.")
		return
	}

	utils.SetCookie(w, "refresh_token", refresh_token, time.Now().Add(time.Hour+24))

	writeJSON(w, http.StatusOK, "token", token)
}

func refreshToken(w http.ResponseWriter, r *http.Request) {}
