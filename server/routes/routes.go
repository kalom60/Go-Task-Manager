package routes

import "github.com/gorilla/mux"

func RegisterRoutes(r *mux.Router) {
	r.HandleFunc("/todo", createTodo).Methods("POST")
	r.HandleFunc("/todo", getTodos).Methods("GET")
	r.HandleFunc("/todo/important", importantTodo).Methods("GET")
	r.HandleFunc("/todo/completed", completedTodo).Methods("GET")
	r.HandleFunc("/todo/now", incompletedTodo).Methods("GET")
	r.HandleFunc("/todo/{id}", getTodoByID).Methods("GET")
	r.HandleFunc("/todo/{id}", updateTodo).Methods("PUT")
	r.HandleFunc("/todo/{id}", updateTodoCompletion).Methods("PATCH")
	r.HandleFunc("/todo/{id}", deleteTodo).Methods("DELETE")
}
