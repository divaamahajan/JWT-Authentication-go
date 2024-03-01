package main

import (
	"JWT-Authentication-go/database"
	"JWT-Authentication-go/routes"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	_, err := database.ConnectDB()
	if err != nil {
		panic("could not connect to db")
	}
	fmt.Println("Connection is successful")

	app := fiber.New()

	// Adding CORS middleware with specific origin
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowMethods:     "GET,POST,PUT,DELETE,PATCH,OPTIONS",
		AllowHeaders:     "Content-Type,Authorization,Accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Access-Control-Allow-Origin,Access-Control-Allow-Headers,Access-Control-Allow-Methods,Access-Control-Expose-Headers,Access-Control-Max-Age,Access-Control-Allow-Credentials",
		AllowCredentials: true,
	}))

	// Setup routes
	routes.SetupRoutes(app)

	// Start the server
	err = app.Listen(":8000")
	if err != nil {
		panic("could not start server")
	}
}
