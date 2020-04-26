const express=require('express');
const http=require('http');
const port=8000;

const path=require('path');

const app=express();
// app.createserver(http);

app.use('/', require('./routes/index'));









app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`server is running on port : ${port}`);
});

