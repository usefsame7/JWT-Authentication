const express = require('express')
const app = express()
require('dotenv').config()
const passport = require('passport')
const mongoose = require('mongoose')



app.listen(9000, () => {
 console.log('server is running on port 9000 ...');
});