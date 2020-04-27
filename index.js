const express=require('express');
const http=require('http');
const port=8000;
const expressLayouts=require('express-ejs-layouts');



const app=express();
// app.createserver(http);
app.use(express.static('assets'));

app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

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

