  // requiring our packages 
const express = require('express')
   const app = express()
     require('dotenv').config()
       const passport = require('passport')
         const mongoose = require('mongoose')
           const bcrypt = require('bcrypt')

           // connect to our server
        app.listen(9000, () => {
             console.log('server is running on port 9000 ...');
            });

           // connect ot our database
        mongoose.connect('', // your database connection string 
          { useNewUrlParser: true, useUnifiedTopology: true}, () => {
                 console.log("Database Connected ...");
            });

           // create user model called( 'User' ) for Registration process
           const userSchema = new mongoose.Schema({
            username: { type: String, required: true },
              password: { type: String, required: true },  
               }, { versionKey: false });
           
                 const User = mongoose.model("User", userSchema);
           
                // create a new user (Register)   
            app.post('/api/register', async (req, res) => {
             const hashedPass = await bcrypt.hash(req.body.password, 10);
              const newUser = new User({ username: req.body.username, password: hashedPass });
               newUser.save().then(result => {
                 res.json(result)
                   }).catch(error => {
                     res.json({ msg: error.message }); 
                   });
                 });    

                // here is passport function fot authenticate user 

                // login by this user 
            app.post('/api/login', ); // login middlewares     