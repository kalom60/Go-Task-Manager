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
		writeJSON(w, http.StatusBadRequest, "Could not parse request data")
		return
	}

	defer r.Body.Close()

	err = newUser.Save()
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, "Failed to create user")
		return
	}

	writeJSON(w, http.StatusCreated, "User created successfully!")
}
