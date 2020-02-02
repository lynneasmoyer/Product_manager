const express = require("express"),
    app = express(),
    port = 8000,
    mongoose = require('mongoose'),
    server = app.listen(port, () => console.log('Listening on port 8000.')),
    path = require('path')


app.use(express.json());

require('./server/config/database')
require('./server/config/routes')(app)
app.use(express.static( __dirname + '/public/dist/public' ));

//Reroutes to Angular project if it doens't hit express routes.
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});
