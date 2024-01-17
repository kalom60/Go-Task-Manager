package models

import (
	"context"
	"errors"
	"time"
	"todo-manager/common"
	"todo-manager/utils"

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

	hashedPassword, err := utils.HashPassword(u.Password)
	if err != nil {
		return err
	}

	u.Password = hashedPassword

	_, err = coll.InsertOne(context.Background(), u)
	if err != nil {
		return err
	}
	return nil
}

func Login(email, password string) (string, error) {
	coll := common.GetDBCollection("user")

	var existingUser User
	err := coll.FindOne(context.Background(), bson.M{"email": email}).Decode(&existingUser)
	if err == mongo.ErrNoDocuments {
		return "", errors.New("User doesn't exist.")
	} else if err != nil {
		return "", err
	}

	isPasswordValid := utils.CheckPasswordHash(password, existingUser.Password)
	if !isPasswordValid {
		return "", errors.New("User doesn't exist.")
	}

	return existingUser.ID.Hex(), nil
}
