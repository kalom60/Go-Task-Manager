package routes

import (
	"net/http"
	"todo-manager/middlewares"

	"github.com/gorilla/mux"
)

func RegisterRoutes(r *mux.Router) {
	// routes without middleware
	r.HandleFunc("/signup", createUser).Methods("POST")
	r.HandleFunc("/signin", logIn).Methods("POST")
	r.Handle("/refreshToken", middlewares.AuthenticateRefreshToken(http.HandlerFunc(refreshToken))).Methods("POST")

	// create a subrouter
	s := r.PathPrefix("/todo").Subrouter()

	// apply the middleware to the subrouter
	s.Use(middlewares.Authenticate)

	// routes with middleware
	s.HandleFunc("", createTodo).Methods("POST")
	s.HandleFunc("", getTodos).Methods("GET")
	s.HandleFunc("/important", importantTodo).Methods("GET")
	s.HandleFunc("/completed", completedTodo).Methods("GET")
	s.HandleFunc("/waiting", incompletedTodo).Methods("GET")
	s.HandleFunc("/today", todayTask).Methods("GET")
	s.HandleFunc("/{id}", getTodoByID).Methods("GET")
	s.HandleFunc("/{id}", updateTodo).Methods("PUT")
	s.HandleFunc("/{id}", updateTodoCompletion).Methods("PATCH")
	s.HandleFunc("/{id}", deleteTodo).Methods("DELETE")
}
