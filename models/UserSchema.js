const mongoose = require( "mongoose");

const userSchema = new mongoose.Schema({

      password:{
            type:String,
            required:true,
      },
      email:{
            type:String,
            unique:true,
            required:true,},
      categories:[String],
      bookmarks:[{
            title:String,
            description:String,
            imageUrl:String,
            newsUrl:String,
            author:String,
            date:String,
            source:String,
      }]
  
})

module.exports = mongoose.model("user",userSchema);