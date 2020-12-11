const Book = require('../models/book');

exports.index = async (req, res, next) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
}

exports.show = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
}

exports.create = async (req, res, next) => {
  try {
    const { id, name, author, genre, price , date } = req.body;
    const newBook = await Book.create({
        name,
        author,
        genre,
        price,
        date: new Date(date)
    });
    res.status(200).json({message: 'Book was created successfully', status: 'success', book: newBook});
  } catch (error) {
    next(error);
  }
}

exports.update = async (req, res, next) => {
  try {
    const { id, name, author, genre, price , date } = req.body;
    const book = await Book.findOneAndUpdate( req.params.id , {
      name,
      author,
      genre,
      price,
      date: new Date(date)
    });
    res.status(200).json({message: 'Book was updated successfully', status: 'success', book: book});
  } catch (error) {
    next(error);
  }
}

exports.destroy = async (req, res, next) => {
  try {
    await Book.findByIdAndDelete( req.params.id);
    res.status(200).json({message: 'Book was deleted successfully', status: 'success'});
  } catch (error) {
    next(error);
  }
}
