package routes

import (
	"encoding/json"
	"net/http"
	"time"
	"todo-manager/models"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func writeJSON(w http.ResponseWriter, status int, v any) {
	switch v.(type) {
	case string:
		message := map[string]interface{}{
			"message": v,
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

func createTodo(w http.ResponseWriter, r *http.Request) {
	var newTodo models.Todo

	// Set default values before decoding the request body
	newTodo.Completed = false
	newTodo.CreatedAt = time.Now()

	err := json.NewDecoder(r.Body).Decode(&newTodo)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, "Invalid request format. Please check your input and try again.")
		return
	}

	defer r.Body.Close()

	// if newTodo.Todo == "" {
	// 	writeJSON(w, http.StatusBadRequest, "Todo could not be empty.")
	// 	return
	// }

	err = newTodo.Save()
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, "Something went wrong. Please try again later.")
		return
	}

	writeJSON(w, http.StatusCreated, "Task successfully created!")
}

func getTodos(w http.ResponseWriter, r *http.Request) {
	todos, err := models.GetTodos()
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, "Something went wrong. Please try again later.")
		return
	}

	writeJSON(w, http.StatusOK, &todos)
}

func getTodoByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	objId, err := primitive.ObjectIDFromHex(vars["id"])
	if err != nil {
		writeJSON(w, http.StatusBadRequest, "Invalid Task ID.")
		return
	}

	todo, err := models.GetTodoByID(objId)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, "Something went wrong. Please try again later.")
		return
	}

	writeJSON(w, http.StatusOK, &todo)
}

func updateTodo(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	objId, err := primitive.ObjectIDFromHex(vars["id"])
	if err != nil {
		writeJSON(w, http.StatusBadRequest, "Invalid Task ID.")
		return
	}

	var updatedTodo models.Todo
	err = json.NewDecoder(r.Body).Decode(&updatedTodo)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, "Invalid request format. Please check your input and try again.")
		return
	}

	defer r.Body.Close()

	updatedTodo.ID = objId
	err = updatedTodo.UpdateTodo()
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, "Something went wrong. Please try again later.")
		return
	}

	writeJSON(w, http.StatusOK, "Task successfully updated!")
}

func updateTodoCompletion(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	objId, err := primitive.ObjectIDFromHex(vars["id"])
	if err != nil {
		writeJSON(w, http.StatusBadRequest, "Invalid Task ID.")
		return
	}

	var body struct {
		Completed *bool `json:"completed"`
	}

	err = json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, "Invalid request format.")
		return
	}

	defer r.Body.Close()

	err = models.UpdateComplete(objId, body.Completed)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, "Something went wrong. Please try again later.")
		return
	}

	writeJSON(w, http.StatusOK, "Task successfully updated!")
}

func deleteTodo(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	objId, err := primitive.ObjectIDFromHex(vars["id"])
	if err != nil {
		writeJSON(w, http.StatusBadRequest, "Invalid Task ID.")
		return
	}

	err = models.DeleteTodo(objId)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, "Something went wrong. Please try again later.")
		return
	}

	writeJSON(w, http.StatusOK, "Task successfully deleted!")
}

func importantTodo(w http.ResponseWriter, r *http.Request) {
	todos, err := models.ImportantTodo()
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, "Something went wrong. Please try again later.")
		return
	}

	writeJSON(w, http.StatusOK, todos)
}

func completedTodo(w http.ResponseWriter, r *http.Request) {
	todos, err := models.CompletedTodo()
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, "Something went wrong. Please try again later.")
		return
	}

	writeJSON(w, http.StatusOK, todos)
}

func incompletedTodo(w http.ResponseWriter, r *http.Request) {
	todos, err := models.InCompletedTodo()
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, "Something went wrong. Please try again later.")
		return
	}

	writeJSON(w, http.StatusOK, todos)
}

func todayTask(w http.ResponseWriter, r *http.Request) {
	tasks, err := models.TodayTask()
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, "Something went wrong. Please try again later.")
		return
	}

	writeJSON(w, http.StatusOK, tasks)
}
