const express=require("express")
const bcrypt=require("bcrypt")
const { UserModel } = require("../model/usermodel")
const jwt=require("jsonwebtoken")
const { auth } = require("../middleware/authmiddlware")
const { OrderModel } = require("../model/ordermodel")
const { access } = require("../middleware/accessmiddleware")
const userRoute=express.Router()


userRoute.post("/register",async(req,res)=>{
    try {
        const {name,email,password,isAdmin}=req.body
      bcrypt.hash(password,5,(err,hash)=>{
        const user=new UserModel({name,email,password:hash,isAdmin})
        user.save()
        res.status(201).send({"msg":"New user has been registered successfully"})
      })
    } catch (error) {
        res.status(500).send({"msg":"Error in registering new user",error})
    }
})


userRoute.post("/login",async(req,res)=>{
    try {
        const{email,password}=req.body
        const user=await UserModel.findOne({email})
        bcrypt.compare(password, user.password, (err, result)=>{
           if(result){
            const token = jwt.sign({ userID:user._id }, 'masai');
            res.status(200).send({"msg":"user logged in successfully",token})
           }
           else{
            res.status(500).send({"msg":"Error occured"})
           }
        });
    } catch (error) {
        res.status(500).send({"msg":"Invalid credntials"})
    }
})



//to make order by the user 
userRoute.post('/', auth, async (req, res) => {
    try {
        const { books, totalAmount } = req.body;
        const order = new OrderModel({
            user: req.user._id,
            books: books, 
            totalAmount: totalAmount
        });
        
        await order.save();
        
        res.status(201).send({ "msg": "Order placed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ "msg": "Error placing order" });
    }
});


// GET /api/orders
userRoute.get('/', auth,access(true), async(req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).send({ "msg": "You are not authorized to access this page" });
        }
        const orders = await OrderModel.find().populate('user').populate('books');
        
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).send({ "msg": "Error fetching orders" });
    }
});





module.exports={
    userRoute
}