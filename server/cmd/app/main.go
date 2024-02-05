package main

import (
	"fmt"
	"log"
	"net/http"
	"todo-manager/common"
	"todo-manager/routes"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	err := run()
	if err != nil {
		panic(err)
	}
}

func run() error {
	err := common.LoadEnv()
	if err != nil {
		return err
	}

	err = common.InitDB()
	if err != nil {
		return err
	}

	defer common.CloseDB()

	r := mux.NewRouter().StrictSlash(true)
	routes.RegisterRoutes(r)

	fmt.Println("Server running at port:", 8080)
	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"http://localhost:5173"}) // replace with your client side origin
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"})
	credentials := handlers.AllowCredentials()

	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(originsOk, headersOk, methodsOk, credentials)(r)))

	return nil
}
