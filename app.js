  /*    */

const express = require('express')
const app = express()
  require('dotenv').config()
      const jwt = require('jsonwebtoken')
        
     // Middlewares
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  
   
         // connect to server
      app.listen(7000, () => {
         console.log('server is running on port 7000 ...');
      });
        
     app.post('/login', (req, res) => {
      const { username, password } = req.body;
       if (!username || !password) return res.json({ msg: "Missing Credentials" })
               const id = new Date().getDate()
              const user = { id, username }
            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '25d' })
                                
         res.status(200).json({ token });
     })


            
     const authMiddleware = async (req, res, next) => {
  /*
  You Can save Token In Which Place You Want ( Like Cookies Or Sessions ) To Be Able To Access It In The Verification Step
  */
      const authHeader = req.headers.token
     
       if (!authHeader || !authHeader.startsWith('Bearer ')) {
           res.json({ msg: "No Token Provided" });
       }
     
       const accessToken = authHeader.split(' ')[1]
       try {
          const payload = jwt.verify(accessToken, process.env.JWT_SECRET)
          const { id, username } = payload
          req.user = { id, username }
          next()
        } catch (error) {
          res.json({ msg: "Sorry, You can't Access This Route" });
       }
     } 
            

      app.get('/data',  authMiddleware, (req, res) => {
         res.json({ msg: "Token Provided, Authorized successfully ..." });
     });     



     /*   */
