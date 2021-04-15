/*
 * @Author: your name
 * @Date: 2020-12-21 15:24:53
 * @LastEditTime: 2020-12-25 16:43:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\ts\2020rt\api\server.js
 */

  let express = require('express');
  let bodyParser = require('body-parser')
  let session = require('express-session')
  let MongoStore = require('connect-mongo')(session)
  let { url }  = require('./settings')
  let {User, Slider} = require('./db')
  let cors = require('cors');   //防止跨域
  let app = express()
  let multer = require('multer')
 app.use(
     cors({
         origin: ['http://localhost:8080', 'http://localhost:8081'],
         credentials: true,
         allowedHeaders: 'Content-Type',
         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
     })
 )
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json())
  app.use(session({
      resave: true,
      saveUninitialized: false,
      secret: 'reactDd',
      store: new MongoStore({ url })
  }))
  app.use(function (req,res,next) {
      res.success = function (data) { 
          res.json({code: 0, data})
       }
       res.error = function (error) {
           res.json({code: 1, error})
         }
       next()
    })
 //   验证用户注册
  app.post('/register', async (req,res)=>{
      debugger
       let user = req.body;
       let result = await User.create(user)
       res.json({
           code: 0, 
           data: result
       })
  })
  app.post('/login', async (req,res)=>{
    let query = req.body;  //{{username. password}}
    let user = await User.findOne(query)
    if(user){
        req.session.user = user;
        res.json({
            code: 0,
            data: user
        })
    }else{
        res.json({
            code: 1,
            error: '用户登录失败'
        })
    }
  })
  app.get('/validate', async (req,res)=>{
       if(req.session.user){
           res.json({
               code: 0, 
               data: req.session.user
           })
       }else{
           res.json({
               code: 1,
               data: '此用户尚未登录'
           })
       }
  })
  app.get('/logout', async (req,res)=>{
      req.session.user = null
      res.success('退出登录成功')
  })
  app.get('/getSliders', async (req,res)=>{ 
      let sliders = await Slider.find()
      res.success(sliders)
})
  app.listen(9000)