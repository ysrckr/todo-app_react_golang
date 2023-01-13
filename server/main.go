package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"

	"github.com/ysrckr/todo-app_react_golang/routes"
)

func main() {
	err := godotenv.Load("../.env.local")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}

	app := fiber.New()

	app.Use(cors.New())


	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})

	app.Post("/api/v1/todos", routes.CreateTodo)

	app.Get("/api/v1/todos", routes.GetTodos)
	app.Get("/api/v1/todos/:id", routes.GetTodo)

	app.Patch("/api/v1/todos/:id", routes.UpdateTodo)

	app.Delete("/api/v1/todos/:id", routes.DeleteTodo)



	log.Fatal(app.Listen(":" + port))

}