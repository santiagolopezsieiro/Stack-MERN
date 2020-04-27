const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { mongoose }  = require("./database")

const app = express();

//setting
app.set('port', process.env.PORT || 4000)

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use("/api/tasks", require("./routes/task.routes"));


//static
app.use(express.static(path.join(__dirname, "public")))

//inicialization
app.listen(app.get('port') , () => {
    console.log(`server on port ${app.get('port')}`);
});