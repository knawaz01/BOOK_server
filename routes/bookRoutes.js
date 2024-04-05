// server/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.post("/add",async(req,res)=>{
    // console.log(req.body)
    const {title,author,genre,image,description}=req.body
    if (!title || !author || !genre || !image || !description) {
        res.status(422).json("plz fill the data")
    } 
    
try {
  const preuser = await Book.findOne({title:title})
  console.log(preuser)
  if (preuser) {
    res.status(422).json("This Book is already availble in Database")
  } else {
    const addbook = new Book({title,author,genre,image,description})
    await addbook.save()
    res.status(201).json(addbook)
    console.log(addbook)
  }
} catch (error) {
  res.status(404).json(error)
} 
})



// Define API endpoints
router.get('/getdata', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(201).json(books)
    console.log(books);
    // res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/getbook/:id',async(req,res)=>{
    try {
      console.log(req.params)
      const {id} =req.params

      const bookindividual = await Book.findById({_id:id})
      console.log(bookindividual)
      res.status(201).json(bookindividual)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
})

// router.post('/', async (req, res) => {
//   const book = new Book(req.body);
//   try {
//     const newBook = await book.save();
//     res.status(201).json(newBook);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// Update a book by ID
router.patch('/updatebook/:id',async(req,res)=>{
  try {
    const {id}=req.params
    const updatebook = await Book.findByIdAndUpdate(id,req.body,{
      new:true
    })
    console.log(updatebook)
    res.status(201).json(updatebook)
  } catch (error) {
    res.status(404).json(error)
  }
})



// router.put('/:id', async (req, res) => {
//   try {  
//     const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedBook) {
//       return res.status(404).json({ message: 'Book not found' });
//     }

//     res.json(updatedBook);
//   } catch (error) {
//     console.error('Error updating book:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   } 
// });

router.delete('/deletebook/:id', async (req, res) => {
  try {
    const {id} = req.params
    const deletedBook = await Book.findByIdAndDelete({_id:id});
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
