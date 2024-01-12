package models

import (
	"context"
	"time"
	"todo-manager/common"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	Email     string             `bson:"email"`
	Password  string             `bson:"password"`
	CreatedAt time.Time          `bson:"createdAt,omitempty"`
}

func (u *User) Save() error {
	coll := common.GetDBCollection("user")

	_, err := coll.InsertOne(context.Background(), u)
	if err != nil {
		return err
	}

	return nil
}
