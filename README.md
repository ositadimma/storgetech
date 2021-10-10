# Inventory app

## Description
This is an Inventory app that enables users store Items with their associated categories into a mysql database and also view and modify these Items and categories as well as users in the front end.  
It consists of a Node js back end server and a react front end app

## Direction
Find react front end app within the inventory folder contained in the client-react folder
Find Node js back end/ server within the node-server folder

## Database 
- Database: mysql
- Database name: inventory
- Host: localhost or 127.0.0.1
- Username: root
- Password: "" 
#### note
These can be altered by changing settings in the sequelize "config/config.json" file and also the "src/database/connection.js" file  
Create Database and run migrations to create required tables

## Run
Run both apps seperately but concurrently using "npm start"  
Access the react app at port 3000  

