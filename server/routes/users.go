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
		writeJSON(w, http.StatusInternalServerError, "Something went wrong. Please try again later.")
		return
	}

	writeJSON(w, http.StatusCreated, "User successfully created!")
}
