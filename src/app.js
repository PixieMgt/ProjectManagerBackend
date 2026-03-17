require('dotenv').config();
const express = require('express')

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, (error) => {
    if(!error)
        console.log("Server is running and app is listening on port " + PORT)
    else
        console.log("Error occured, server can't be started", error)
})