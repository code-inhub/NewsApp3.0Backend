const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();
const schema = require("../models/schema.js");
const userSchema = require("../models/UserSchema.js");
const { ObjectId } = require("mongodb");
const UserSchema = require("../models/UserSchema.js");

var data;
const getdata = async (_id) => {
  try {
    data = await schema.find({ _id:new mongoose.Types.ObjectId(`${_id}`) });
    return data;
  }  
  catch (error) {
    console.error("Not able to get data from mongodb Error:", error);
    throw error;
  }
};

 
  route.post("/bookmark",async (req,res)=>{
          try{
            const {title,description,imageUrl,newsUrl,author,date,source,email} = req.body;
                    
            const Bookmark= await UserSchema.findOneAndUpdate({email:email},{$push:{bookmarks:{title,description,imageUrl,newsUrl,author ,date,source}}})
            await Bookmark.save();
            }

          catch(error){
            console.error("Error:",error);
          }
    }
  )

  route.get(`/bookmark/:email`,async (req,res)=>{
          try{
            const email = req.params.email;
            // console.log(email)
            const data = await UserSchema.find({email:email});
            console.log(data[0].bookmarks)
            res.status(200).json(data[0].bookmarks);
          }
          catch(error){
            console.error("Error:",error);  
            res.status(500).json(error);
          }
           
  })


   route.post("/removeBookmark",async (req,res)=>{
           try{
            const { newsUrl, email } = req.body
            const user =  await UserSchema.findOneAndUpdate({email:email},{$pull:{bookmarks:{newsUrl:newsUrl}}},{new:true});
            console.log(user.bookmarks)
           return res.status(200).json(user.bookmarks);
           }
            catch(error){
              console.error("Error:",error);
              res.status(500).json(error);
            }
   });


   route.post("/checkForBookmark",async (req,res)=>{
    try{
      const { newsUrl, email } = req.body
      console.log(newsUrl,email);
      const bookmark= await UserSchema.findOne({email:email,bookmarks:{$elemMatch:{newsUrl:newsUrl}}});
      console.log(bookmark);
      if(bookmark){
        return res.status(200).json(true);
      }
      else{
        return res.status(200).json(false);
      }
    }
    catch(error){
      console.error("Error:",error);
      res.status(500).json(error);
    }
});

        route.post("/addUser",async (req,res)=>{
          console.log(req.body)

             try{
                const {email,password,categories} = req.body;
                // const check = await userSchema.findOne({email:email});
                // console.log(check);
                // if(check!==null){
                //   return res.status(200).json("User already exists");
                // }
                
                // else{

                  const user = new userSchema({
                    email,
                    password,
                    categories
                  })
                  await user.save();
                  console.log(user)
                  res.status(200).json(user);
                // }
              
             }
              catch(error){
                console.error("Error:",error);
              }
        }
         
        )
        
        route.post("/login",async (req,res)=>{
             try{
              const check= await userSchema.findOne({email:req.body.email});
              console.log(check);
              if(check!==null &&check.password==req.body.password){
                res.status(200).json({data:"success", category:check.categories});
              }
              else{
                res.status(200).json("fail");
              }
        
             }
              catch(error){
                console.error("Error:",error);
              }
        }
        )


        // Routes for getting data

        route.get("/general", async (req, res) => {
          try {
            const data = await getdata("64e5f643c513c9f93316e2df");
            console.log(data)
            res.status(200).json(data);
          } catch (error) {
            console.error("Error:", error);
          }
        })
        
        route.get("/business", async (req, res) => {
          try {
            const data = await getdata("64e5f6ee8a6a32b7b402ceca");
            res.status(200).json(data);
          } catch (error) {
            console.error("Error:", error);
          }
        })
        
        route.get("/entertainment", async (req, res) => {
          try {
            const data = await getdata("64e5f7c4047d68f9354084e1");
            res.status(200).json(data);
          } catch (error) {
            console.error("Error:", error);
          }
        })
        
        route.get("/health", async (req, res) => {
          try {
            const data = await getdata("64e5f850dc86c507ebd2dac2");
            res.status(200).json(data);
          } catch (error) {
            console.error("Error:", error);
          }
        })
        
        route.get("/science", async (req, res) => {
          try {
            const data = await getdata("64e5f922936a005072783254");
            res.status(200).json(data);
          } catch (error) {
            console.error("Error:", error);
          }
        })
        
        route.get("/sports", async (req, res) => {
          try {
            const data = await getdata("64e5fa03137c783804dd812b");
            res.status(200).json(data);
          } catch (error) {
            console.error("Error:", error);
          }
        })
        
        route.get("/technology", async (req, res) => {
          try {
            const data = await getdata("64e5fb5911586bc267fe7736");
            res.status(200).json(data);
          } catch (error) {
            console.error("Error:", error);
          }
        })
        
        route.get("/finance", async (req, res) => {
          try {
            const data = await getdata("64e5f6ee8a6a32b7b402ceca");
            res.status(200).json(data);
          } catch (error) {
            console.error("Error:", error);
          }
        });
        route.get("/politics", async (req, res) => {
          try {
            const data = await getdata("64e5fdebf0d0920652bb5a88");
            res.status(200).json(data);
          } catch (error) {
            console.error("Error:", error);
          }
        })
        
        route.get("/fashion", async (req, res) => {
          try {
            const data = await getdata("64e5f7c4047d68f9354084e1");
            res.status(200).json(data);
          } catch (error) {
            console.error("Error:", error);
          }
        })



module.exports = route;
