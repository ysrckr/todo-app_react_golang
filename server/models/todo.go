package models


type Todo struct {
	Title	 string `json:"title, omitempty" validate:"required"`
	Completed bool `json:"completed" default:"false"`
	Body	 string `json:"body, omitempty" validate:"required"`
}
