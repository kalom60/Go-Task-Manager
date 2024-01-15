package models

import (
	"context"
	"errors"
	"time"
	"todo-manager/common"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	Username  string             `bson:"username"`
	Email     string             `bson:"email"`
	Password  string             `bson:"password"`
	CreatedAt time.Time          `bson:"createdAt,omitempty"`
}

func (u *User) Save() error {
	coll := common.GetDBCollection("user")

	var existingUser User
	err := coll.FindOne(context.Background(), bson.M{"email": u.Email}).Decode(&existingUser)
	if err == nil {
		return errors.New("Email address already in use.")
	} else if err != mongo.ErrNoDocuments {
		return err
	}

	_, err = coll.InsertOne(context.Background(), u)
	if err != nil {
		return err
	}
	return nil
}
