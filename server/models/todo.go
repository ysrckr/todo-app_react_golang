package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Todo struct {
	ID		 primitive.ObjectId `bson:"id"`
	Title	 *string `json:"title"`
	Completed *bool `json:"completed"`
	Body	 *string `json:"body"`
}
