package models

import (
	"context"
	"errors"
	"time"
	"todo-manager/common"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Todo struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	UserID      primitive.ObjectID `bson:"userId"`
	Todo        string             `bson:"todo"`
	Description string             `bson:"description"`
	Date        string             `bson:"date"`
	Completed   bool               `bson:"completed"`
	Important   bool               `bson:"important"`
	CreatedAt   time.Time          `bson:"createdAt,omitempty"`
}

func (t *Todo) Save() error {
	coll := common.GetDBCollection("todo")

	_, err := coll.InsertOne(context.Background(), t)
	if err != nil {
		return nil
	}

	return nil
}

func GetTodos() (*[]Todo, error) {
	coll := common.GetDBCollection("todo")

	toods := make([]Todo, 0)
	cursor, err := coll.Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}

	for cursor.Next(context.Background()) {
		todo := Todo{}
		err := cursor.Decode(&todo)
		if err != nil {
			return nil, err
		}
		toods = append(toods, todo)
	}

	return &toods, nil
}

func GetTodoByID(objectID primitive.ObjectID) (*Todo, error) {
	coll := common.GetDBCollection("todo")
	todo := new(Todo)

	err := coll.FindOne(context.Background(), bson.M{"_id": objectID}).Decode(todo)
	if err != nil {
		return nil, err
	}

	return todo, nil
}

func (t *Todo) UpdateTodo() error {
	coll := common.GetDBCollection("todo")

	result, err := coll.UpdateOne(context.Background(), bson.M{"_id": t.ID}, bson.M{"$set": t})
	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return errors.New("Todo not found.")
	}

	return nil
}

func UpdateComplete(objectID primitive.ObjectID, newCompleted *bool) error {
	coll := common.GetDBCollection("todo")
	update := bson.M{"completed": *newCompleted}

	result, err := coll.UpdateOne(context.Background(), bson.M{"_id": objectID}, bson.M{"$set": update})
	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return errors.New("Todo not found.")
	}

	return nil
}

func DeleteTodo(objectID primitive.ObjectID) error {
	coll := common.GetDBCollection("todo")

	result, err := coll.DeleteOne(context.Background(), bson.M{"_id": objectID})
	if err != nil {
		return err
	}

	if result.DeletedCount == 0 {
		return errors.New("Todo not found.")
	}

	return nil
}

func ImportantTodo() (*[]Todo, error) {
	coll := common.GetDBCollection("todo")

	cursor, err := coll.Find(context.Background(), bson.M{"important": true})
	if err != nil {
		return nil, err
	}

	todos := make([]Todo, 0)
	for cursor.Next(context.Background()) {
		todo := Todo{}
		err := cursor.Decode(&todo)
		if err != nil {
			return nil, err
		}
		todos = append(todos, todo)
	}

	return &todos, nil
}

func CompletedTodo() (*[]Todo, error) {
	coll := common.GetDBCollection("todo")

	cursor, err := coll.Find(context.Background(), bson.M{"completed": true})
	if err != nil {
		return nil, err
	}

	todos := make([]Todo, 0)
	for cursor.Next(context.Background()) {
		todo := Todo{}
		err := cursor.Decode(&todo)
		if err != nil {
			return nil, err
		}
		todos = append(todos, todo)
	}

	return &todos, nil
}

func InCompletedTodo() (*[]Todo, error) {
	coll := common.GetDBCollection("todo")

	cursor, err := coll.Find(context.Background(), bson.M{"completed": false})
	if err != nil {
		return nil, err
	}

	todos := make([]Todo, 0)
	for cursor.Next(context.Background()) {
		todo := Todo{}
		err := cursor.Decode(&todo)
		if err != nil {
			return nil, err
		}
		todos = append(todos, todo)
	}

	return &todos, nil
}

func TodayTask() (*[]Todo, error) {
	coll := common.GetDBCollection("todo")

	today := time.Now()
	dateStr := today.Format("2006-01-02")

	cursor, err := coll.Find(context.Background(), bson.M{"date": dateStr})
	if err != nil {
		return nil, err
	}

	tasks := make([]Todo, 0)
	for cursor.Next(context.Background()) {
		task := Todo{}
		err := cursor.Decode(&task)
		if err != nil {
			return nil, err
		}

		tasks = append(tasks, task)
	}

	return &tasks, nil
}
