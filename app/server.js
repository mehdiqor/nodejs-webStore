const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');

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
            return console.log("failed to connect to MongoDB");
        })
    }
    createRoutes(){

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