package routes

import (
	"encoding/json"
	"net/http"
	"time"
	"todo-manager/models"
)

func createUser(w http.ResponseWriter, r *http.Request) {
	var newUser models.User

	newUser.CreatedAt = time.Now()

	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, "Invalid request format. Please check your input and try again.")
		return
	}

	defer r.Body.Close()

	err = newUser.Save()
	if err != nil {
		if err.Error() == "Email address already in use." {
			writeJSON(w, http.StatusBadRequest, "Email address already in use.")
			return
		} else {
			writeJSON(w, http.StatusInternalServerError, "Something went wrong. Please try again later.")
			return
		}
	}

	writeJSON(w, http.StatusCreated, "User successfully created!")
}

type Login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func logIn(w http.ResponseWriter, r *http.Request) {
	var userData Login

	err := json.NewDecoder(r.Body).Decode(&userData)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, "Invalid request format. Please check your input and try again.")
		return
	}

	defer r.Body.Close()

	userID, err := models.Login(userData.Email, userData.Password)
	if err != nil {
		if err.Error() == "User doesn't exist." {
			writeJSON(w, http.StatusInternalServerError, "Invalid email or password. Please check your credentials and try again.")
			return
		} else {
			writeJSON(w, http.StatusInternalServerError, "Failed to login. Please try again later.")
			return
		}
	}

	writeJSON(w, http.StatusOK, userID)
}
