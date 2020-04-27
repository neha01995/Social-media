const mongoose=require('mongoose');
const db=mongoose.connection;

db.on(err,function(err){
    if (err){
        console.log('error in connectiing the mongodb');


    }
})

db.once(mongodb,)