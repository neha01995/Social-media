const express=require('express');
const http=require('http');
const port=8000;


const app=express();
// app.createserver(http);


// set up the routes

app.use('/', require('./routes/index'));

// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');








// listen to port
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`server is running on port : ${port}`);
});

