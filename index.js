// const express = require('express');
// const {MongoClient} = require('mongodb ')
// const dotenv = require('dotenv');

import express from 'express';
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
// import {moviesRouter} from './routes/movies.js';
// import {usersRouter} from './routes/users.js';
// import bcrypt from 'bcrypt';

dotenv.config();
console.log(process.env)
const app = express();

app.use(cors());


app.use(express.json())

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Welcome")
})
const pizza = [{
    "id": "100",
    "name": "Veggie Paradise",
    "image": "https://vegplatter.in/files/public/images/partner/catalog/195/spicy_triple_tango.jpg",
    "summary": "The awesome foursomee! Golden corn, black olives, capsicum, red paprika",
    "type":"veg"
},
{
    "id": "101",
    "name": "Margherita",
    "image": "https://www.kimscravings.com/wp-content/uploads/2020/01/Margherita-Pizza-5.jpg",
    "summary": "A classic delights with 100% Real mozzarella cheese",
    "type":"veg"
},
{   
    "id": "102",
    "name": "Double Cheese Margherita",
    "image": "https://buddyspizzaandcafe.com/wp-content/uploads/2021/06/pizza-margherita-recipe.jpg",
    "summary": "A classic delight loaded with extra 100% real mozzarella cheese",
    "type":"veg"
},
{   
    "id": "103",
    "name": "Veg Extravaganza",
    "image": " https://www.bindowkart.com/product-images/original/55117-veg-extravaganza.jpg",
    "summary": "Black olives, capsicum, onion, grilled mushroom, corn, tomato, jalapeno & extra cheese",
    "type":"veg"},
{   
       "id": "104",
        "name": "Cheese n Corn",
        "image": "https://static.toiimg.com/thumb/59863239.cms?imgsize=284845&width=800&height=800",
        "summary": "Sweet & Juicy Golden corn and 100% real mozzarella cheese in a delectable combination !",
        "type":"veg"},
{   
            "id": "105",
            "name": "Chicken Dominator",
            "image": "https://phyllo.in/images/products/1593851134mhpvnqrxftcodzl7chzx.jpg",
            "summary": "Loaded with double pepper barbecue chicken, peri-peri chicken, chicken tikka & grilled chicken rashers",
            "type":"veg"},
{   
 "id": "106",
 "name": "Chicken Golden Delight",
 "image": "https://www.homemadebakers.in/wp-content/uploads/2020/10/chicken-pizza-300x300.jpg",
 "summary": "Double pepper barbecue chicken, golden corn and extra cheese, true delight",
 "type":"nonveg"},
 {   
    "id": "107",
    "name": "Chicken Pepperoni",
    "image": "https://thumbs.dreamstime.com/z/pizza-chicken-meat-mozzarella-cheese-pepperoni-tomato-olive-salami-pizza-chicken-meat-mozzarella-cheese-pepperoni-tomato-129458486.jpg",
    "summary": "Double pepper barbecue chicken, golden corn and extra cheese, true delight",
    "type":"nonveg"},
    {   
        "id": "108",
        "name": "Pepper Barbecue Chicken",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDQFdVrR8GSElMeHBRm5McfbzTnnYb9HlfA&usqp=CAU",
        "summary": "Pepper barbecue chicken for that extra zing",
        "type":"nonveg"},
        {   
            "id": "109",
            "name": "Indi Chicken Tikka",
            "image": "https://thumbs.dreamstime.com/b/homemade-indian-chicken-tikka-masala-pizza-onions-cilantro-homemade-indian-chicken-tikka-masala-pizza-221590330.jpg",
            "summary": "The wholesome flavour of tandoori masala with Chicken tikka, onion, red paprika & mint mayo",
            "type":"nonveg"},
{   
    "id": "110",
    "name": "Bailley One (500ml)",
    "image": "https://tiimg.tistatic.com/fp/1/004/864/1l-bailley-packaged-drinking-water-184-w300.jpg",
    "summary": "Packaged Drinking Water",
    "type":"beverage"},
    {   
        "id": "111",
        "name": "Pepsi (500ml)",
        "image": "https://static.news.bitcoin.com/wp-content/uploads/2021/12/image-2021-12-09-100057.jpg",
        "summary": "Sparkling and Refreshing Beverage",
        "type":"beverage"},
        {   
            "id": "112",
            "name": "Nimbooz ( 350ml )",
            "image": "https://cdna.artstation.com/p/assets/images/images/021/690/578/large/s-pavithran-nimbooz-poster-design.jpg?1572593581",
            "summary": "Nimbooz ( 350ml )",
            "type":"beverage"}]
        
            // mongodb+srv://gowtham:<password>@cluster0.um5iv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
            //  const MONGO_URL = "mongodb://localhost"

            const MONGO_URL = process.env.MONGO_URL;

            async function createConnection(){
                const client = new MongoClient(MONGO_URL)
                await client.connect()
                return client;
            }
            
   const client = await createConnection()

app.get("/pizzas",async (req, res) => {
    const {type,name} = req.query;
   console.log(req.query ,type );
   
//    db.pizza.find({})

   const result =await client.db("firstmongo")
   .collection("pizza")
   .find(req.query)
   .toArray()
   res.send(result)

})


   app.get("/pizzas/:id",async(req, res) => {
       const{id} = req.params;
       console.log(id);
       const result =await client.db("firstmongo")
       .collection("pizza")
       .findOne({id:id})
       res.send(result)

       result ? response.send(result) : response.status(404).send({message:"no items found"})
   })

   app.delete("/pizzas/:id",async(req, res) => {
    const{id} = req.params;
    console.log(id);
    const result =await client.db("firstmongo")
    .collection("pizza")
    .findOne({id:id})
    res.send(result)

    result ? res.send(result) : res.send({message:"no items found"})
})

app.post("/pizzas" , async (req, res) => {
    const newPizza = req.body;
        console.log(newPizza)
        // const movie = movies.find((mvs) => mvs.id === req.params.id)
        const movie = await client.db("firstmongo")
        .collection("pizza")
        .insertMany(newPizza);
        res.send(movie) 
    })

            app.listen(PORT,() => console.log("server started",PORT));

