  /*    */

const express = require('express')
const app = express()
  require('dotenv').config()
   const mongoose = require('mongoose')
     const bcrypt = require('bcrypt')
      const jwt = require('jsonwebtoken')
        
     // Middlewares
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  
   
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
     

           // create a new user (Registration)   
      app.post('/register', async (req, res) => {
        const { username, password } = req.body;
         const hashedPass = await bcrypt.hash(password, 10);
          const newUser = new User(req.body, hashedPass);
                 // Check If Passed Usernam Is Used Before Or Not
             User.findOne({ username: username }).then(result => {
              if (result) {
                 res.json({ msg: "Username Used Before User Another One" });
              }; 
              newUser.save();
            res.json(newUser);
          }).catch(err => { res.json({ msg: err.message }) });
        });



      app.post('/login', (req, res) => {
         const { username, password } = req.body;
           const userData = User.findOne({ username: username })
            if (!userData) { res.json({ msg: 'Invalid Credentials' }) };
          
              const matchingPass =  bcrypt.compare(password, userData.password);
               if (!matchingPass) { res.json({ msg: "Incorrect Password" }) };
                const { id } = userData.id;
              const user = { id, username };
            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '25d' });
                                
         res.status(200).json({ token });
      });
           
            
     const authenticationMiddleware = async (req, res, next) => {
  /*
  You Can save Token In Which Place You Want To Be Able To Access It In The Verification Step
  */
      const authHeader = req.headers.token
     
       if (!authHeader || !authHeader.startsWith('Bearer ')) {
           res.json({ msg: "No Token Provided" });
       }
     
       const accessToken = authHeader.split(' ')[1]
       try {
         const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
         const { id, username } = decoded
         req.user = { id, username }
         next()
       } catch (error) {
         res.json({ msg: "Sorry, You can't Access This Route" });
       }
     } 
            

      app.get('/data',  authenticationMiddleware, (req, res) => {
         res.json({ msg: "Token Provided, Authorized successfully ..." });
     });     


     /*   */
