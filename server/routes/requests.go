package routes

import (
	"time"
	"context"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

)

var todoCollection *mongo.Collection = OpenCollection(Client, "todos")

// func CreateTodo(c *fiber.Ctx) {
	
// }

// func GetTodos(c *fiber.Ctx) {
	
// }

// func GetTodo(c *fiber.Ctx) {
	
// }

// func UpdateTodo(c *fiber.Ctx) {
	
// }

func DeleteTodo(c *fiber.Ctx) error {
	todoID := c.Params("id")
	docID, _ := primitive.ObjectIDFromHex(todoID)

	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

	result, err := todoCollection.DeleteOne(ctx, bson.M{"_id": docID})

	if err != nil {
		return c.Status(500).JSON(err.Error())
	}

	defer cancel()

	return c.Status(204).JSON(result.DeletedCount)
}
