package routes

import (
	"time"
	"context"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"github.com/ysrckr/todo-app_react_golang/models"

)

var todoCollection *mongo.Collection = OpenCollection(Client, "todos")

func CreateTodo(c *fiber.Ctx) error {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

	todo := new(models.Todo)

	if err := c.BodyParser(&todo); err != nil {
		c.Status(500).JSON(err.Error())
	}

	result, err := todoCollection.InsertOne(ctx, todo)

	if err != nil {
		c.Status(500).JSON(err.Error())
	}

	defer cancel()

	return c.Status(201).JSON(result)
	
}

func GetTodos(c *fiber.Ctx) error {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

	var todos []bson.M

	cursor, err := todoCollection.Find(ctx, bson.M{})

	if err != nil {
		c.Status(500).JSON(err.Error())
	}

	defer cursor.Close(ctx)

	defer cancel()

	for cursor.Next(ctx) {
		var todo bson.M
		cursor.Decode(&todo)
		todos = append(todos, todo)
	}

	return c.Status(200).JSON(todos)

}

func GetTodo(c *fiber.Ctx) error {
	todoID := c.Params("id")
	docID, _ := primitive.ObjectIDFromHex(todoID)

	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

	var todo bson.M

	err := todoCollection.FindOne(ctx, bson.M{"_id": docID}).Decode(&todo)

	if err != nil {
		return c.Status(500).JSON(err.Error())
	}

	defer cancel()

	return c.Status(200).JSON(todo)
	
}

func UpdateTodo(c *fiber.Ctx) error {
	todoID := c.Params("id")
	docID, _ := primitive.ObjectIDFromHex(todoID)

	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

	todo := models.Todo{}


	if err := c.BodyParser(&todo); err != nil {
		c.Status(500).JSON(err.Error())
	}

	update := bson.M{
		"title": todo.Title,
		"completed": todo.Completed,
		"body": todo.Body,
	}


	result, err := todoCollection.UpdateOne(ctx, bson.M{"_id": docID}, bson.M{"$set": update})

	if err != nil {
		c.Status(500).JSON(err.Error())
	}


	if err != nil {
		c.Status(500).JSON(err.Error())
	}

	defer cancel()

	return c.Status(204).JSON(result)
	
}

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
