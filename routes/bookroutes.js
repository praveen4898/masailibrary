const express=require("express")
const { BookModel } = require("../model/bookmodel")
const { auth } = require("../middleware/authmiddlware")
const { access } = require("../middleware/accessmiddleware")

const bookRoute=express.Router()

//allbooks
bookRoute.get("/",auth,async(req,res)=>{
    try {
        const books= await BookModel.find()
        res.status(200).send({"msg":"The available books are ",books})
    } catch (error) {
        res.status(500).send({"msg":"Error in fetching books",error})
    }
})


//singlebook
bookRoute.get("/:id",auth,async(req,res)=>{
    try {
        const {id}=req.params
        const book= await BookModel.findOne({_id:id})
        res.status(200).send({"msg":"here the book you wanted",book})
    } catch (error) {
        res.status(500).send({"msg":"error occured",error})
    }
}
)

//categorybasedbook
bookRoute.get('/category/:category',auth,async (req, res) => {
    const { category } = req.params;
    try {
      const books = await BookModel.find({ category });
      res.status(200).send({"msg":"here the book you wanted",books})
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ "msg": "Server Error" });
    }
  });



//auhtor&categorybasedbook
  bookRoute.get('/author/:author/category/:category',auth, async (req, res) => {
    const { author, category } = req.params;
    try {
      const books = await BookModel.find({ author, category });
      res.status(200).send({"msg":"here the book you wanted",books})
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ "msg": "Server Error" });
    }
  });
  



  //adding a new book by admin

 bookRoute.post("/",auth,access(true),async(req,res)=>{
    try {
        const book= new BookModel(req.body)
        await book.save()
        res.status(201).send({"msg":"new book has been added suucessfully"})

    } catch (error) {
        res.status(500).send({"msg":"Error in adding  book",error})
    }
 })


 //toupdate a book by admin
bookRoute.patch("/:bookID",auth,access(true),async(req,res)=>{
    try {
        const{bookID}=req.params
        const updatedbook= await BookModel.findByIdAndUpdate({_id:bookID},req.body)
        res.status(201).send({"msg":"Book got updated",updatedbook})
    } catch (error) {
        res.status(500).send({"msg":"error in updating a book",error})
    }
}
)

//tp delete a book by admin
bookRoute.delete("/:bookID",auth,access(true),async(req,res)=>{
    try {
        const{bookID}=req.params
        const updatedbook=   await BookModel.findByIdAndDelete({_id:bookID})
        res.status(201).send({"msg":"Book got deleted"})
    } catch (error) {
        res.status(500).send({"msg":"error in Deleting a book",error})
        console.log(error)
    }
}
)



module.exports={
    bookRoute
}