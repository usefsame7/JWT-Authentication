  // requiring our packages 
const express = require('express')
   const app = express()
     require('dotenv').config()
       const passport = require('passport')
         const mongoose = require('mongoose')
           const bcrypt = require('bcrypt')
             const LocalStrategy = require("passport-local").Strategy;


           // Middlewares
        app.use(express.urlencoded({ extended: true }))
        app.use(express.json())
        app.use(passport.initialize());

        

         
           // connect to server
            app.listen(7000, () => {
               console.log('server is running on port 7000 ...');
            });
              
           // connect ot database
            mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true ,useUnifiedTopology: true })
            .then(() => console.log("Database connected ..."))
            .catch(err => console.log( err.message ));

           // create a user model for Registration process
           const userSchema = new mongoose.Schema({
            username: { type: String, required: true },
              password: { type: String, required: true },  
               }, { versionKey: false });
           
                 const User = mongoose.model("User", userSchema);
           
            
                  // Home Page
            app.get('/', (req, res) => {
                res.send('Welcome !!');
            });     



                 // create a new user (Registration)   
            app.post('/api/register', async (req, res) => {
             const hashedPass = await bcrypt.hash(req.body.password, 10);
               const newUser = new User({ username: req.body.username, password: hashedPass });
                 newUser.save().then(result => {
                   res.json({
                    username: result.username,
                     password: result.password
                      })
                       }).catch(error => {
                        res.json({ msg: error.message }); 
                      });
                   });    


                


                // login by this user 
                app.post('/api/login', /*passport middleware*/ (req, res) => {

                });

              