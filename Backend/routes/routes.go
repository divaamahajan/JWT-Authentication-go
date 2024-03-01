package routes

import (
	"JWT-Authentication-go/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {    // Test route to verify application setup
    app.Get("/", controllers.Hello)
    app.Post("/api/register", controllers.Register)
    app.Post("/api/login", controllers.Login)
    app.Get("/api/user", controllers.User)
    app.Post("/api/logout", controllers.Logout)
}