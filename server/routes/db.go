package routes

import (
	"log"
	"context"
	"time"
	"fmt"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"github.com/joho/godotenv"
)


func DBinstance() *mongo.Client {
	err := godotenv.Load("../.env.local")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	mongoDB := os.Getenv("MONGODB_URI")

	client, err := mongo.NewClient(options.Client().ApplyURI(mongoDB))
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)

	defer cancel()

	err = client.Connect(ctx)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	return client
}

var Client *mongo.Client = DBinstance()

func OpenCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	var collection *mongo.Collection = client.Database("todos").Collection(collectionName)

	return collection
}