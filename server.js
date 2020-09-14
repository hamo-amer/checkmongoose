const express=require('express')
const mongoose=require('mongoose')

// install and setup mongoose
require('dotenv').config({path:'.env'});
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, useFindAndModify: false 
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
  });

// Create a person having this prototype
let Schema=mongoose.Schema;
let personSchema=new Schema({
  name:{type:String,required:true},
  age:Number,
  favoriteFoods:[String]
});
// Create and Save a Record of a Model

let personModel=mongoose.model('Person',personSchema); 
let person=personModel({
  name:"Assia",
  age:28,
  favoriteFoods:["pizza","chocalat"]
});
person.save(function(err,data){
  err ?
    console.log("error")
  :console.log("person is added")
});
//Create Many Records with model.create()
let arrayOfPeople=[
  {name:"Mohamed",age:36,favoriteFoods:["coscos","spaggete"]},
  {name:"Adel",age:49,favoriteFoods:["coscos","mokhia"]},
  {name:"Soufiane",age:30,favoriteFoods:["lobia","madfona","tajin"]}
];
personModel.create(arrayOfPeople,(err,data)=>{
  err ? console.log("error") : console.log(data)
});
//Use model.find() to Search Your Database
personModel.find({name:"Mohamed"}).
then(doc=>{console.log(doc)}).catch(()=>{console.log(err)});
// Use model.findOne() to Return a Single Matching Document from Your Database
personModel.findOne({favoriteFoods:{$in:["madfona"]}}).
then(doc=>{console.log(doc)}).catch(()=>{console.log(err)});
// Use model.findById() to Search Your Database By _id
personModel.findById({_id:"5f5f78217ad7a732e4b95c32"}).
then(doc=>{console.log(doc)}).catch(()=>{console.log(err)});
//Perform Classic Updates by Running Find, Edit, then Save
personModel.findById({_id:"5f5f78217ad7a732e4b95c32"},(err,person)=>{
 if(err) { console.log(error)}
 else
 person.age=15;
 person.save((err,person)=>{
   err? console.log(err):console.log(person)
 });
});
//Perform New Updates on a Document Using model.findOneAndUpdate()
personModel.findOneAndUpdate({name:"soufiane"},{age:20},{new:true},(err,person)=>{
  if(err) { console.log(error)}
 else { console.log(person)}
});
//Delete One Document Using model.findByIdAndRemove
personModel.findOneAndRemove({_id:"5f5fabd261c853127c02a6cf"},(err,person)=>{
  err ? console.log(err):console.log(person)
});
//MongoDB and Mongoose - Delete Many Documents with model.remove()
personModel.remove({name:"Mary"},(err,person)=>{
  err ? console.log(err):console.log("persons with name Mary are deleted")
});
// Chain Search Query Helpers to Narrow Search Results
personModel.find({favoriteFoods:{$in:["burrito"]}})
.sort({name:1})
.limit(2)
.select("-age")
.exec()
.then((doc)=>console.log(doc))
.catch(err=>console.log(err));