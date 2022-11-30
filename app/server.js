const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const { Allroutes } = require('./router/router');

module.exports = class Application {
    #app = express()
    #PORT;
    #DB_URI;
    constructor(PORT, DB_URI){
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.configApplication();
        this.connectToMongoDB();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    }
    configApplication(){
        this.#app.use(morgan('dev'))
        this.#app.use(express.json()); //json for sending data from client
        this.#app.use(express.urlencoded({extended : true})); //urlencoded for sending data with form
        this.#app.use(express.static(path.join(__dirname, "..", "public")));
    }
    createServer(){
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log('run > http://localhost:' + this.#PORT);
        })
    }
    connectToMongoDB(){
        mongoose.connect(this.#DB_URI, (error) => {
            if(!error) return console.log("connected to MongoDB...");
            return console.log(error.message);
        })
        mongoose.connection.on('connected', () => {
            console.log('mongoose connected to DB');
        })
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose is disconnected from DB');
        })
        process.on('SIGINT', () => {
            mongoose.connection.close();
            console.log('connection was closed successfully');
            process.exit();
            //disconnect app from DB when app is crashed!
        })
    }
    createRoutes(){
        this.#app.use(Allroutes)
    }
    errorHandling(){
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                statusCode : 404,
                message : "آدرس مورد نظر یافت نشد"
            })
        })
        this.#app.use((error, req, res, next) => {
            const statusCode = error.status || 500;
            const message = error.message || "InternalServer Error!";
            return res.status(statusCode).json({
                statusCode,
                message
            })
        })
    }
}