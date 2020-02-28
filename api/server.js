const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session=require("express-session");
const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const usersRouter=require('../users/users-router')

const sessionConfig={
    name:'monster',
    secret:'Keep it Secret, Keep it Safe!',
    resave:false,
    saveUninitialized: true,
    cookie:{
      maxAge:1000*60*10,
      secure:false,
      httpOnly:true
    }
  }

const server = express();
server.use(session(sessionConfig))
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/', usersRouter);
server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
