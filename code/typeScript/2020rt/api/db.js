/*
 * @Author: your name
 * @Date: 2020-12-22 11:39:31
 * @LastEditTime: 2020-12-25 16:43:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\ts\2020rt\api\db.js
 */

let mongoose = require('mongoose')
let {url } = require('./settings')
let conn = mongoose.createConnection(url, { useUnifiedTopology: true,useNewUrlParser: true })
let UserSchema = new mongoose.Schema({
    username:String,
    password: String,
    email: String,
    avatar: String,
    phone: String
})
let User = conn.model('User', UserSchema);

let SlidersSchema = new mongoose.Schema({
    url:String,
})
let Slider = conn.model('Slider', SlidersSchema);
module.exports = {
    User,
    Slider
}