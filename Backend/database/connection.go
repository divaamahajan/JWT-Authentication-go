package database

import (
	"JWT-Authentication-go/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// creating a reference to a GORM database connection that can be used throughout your application to perform 
// database operations like querying, inserting, updating, and deleting data from the database.
var DB *gorm.DB

// Connect to MySQL database
func ConnectDB() (*gorm.DB, error) {
    // Database configuration
    dsn := "root:admin@tcp(localhost:3306)/userdb"
    // dsn := "user:password@tcp(localhost:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"

    // Connect to MySQL database
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        return nil, err
    }

    DB = db

    db.AutoMigrate(&models.User{})
    return db, nil
}

