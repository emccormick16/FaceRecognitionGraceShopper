import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedBook } from "../../store/bookSlice";

const AdminBookEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const selectedBook = useSelector((state) => state.book.selectedBook);

  // State used for input:
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(selectedBook.title);
  const [author, setAuthor] = useState(selectedBook.author);
  const [description, setdescription] = useState(selectedBook.description);
  const [genre, setGenre] = useState(selectedBook.genre);
  const [volume, setVolume] = useState(selectedBook.volume);
  const [yearOfPublish, setYOP] = useState(selectedBook.yearOfPublish);
  const [isbn, setIsbn] = useState(selectedBook.isbn);
  const [edition, setEdition] = useState(selectedBook.edition);
  const [price, setPrice] = useState(selectedBook.price);
  const [stock, setStock] = useState(selectedBook.stock);
  const [isDeactivated, setStatus] = useState(selectedBook.isDeactivated);

  const adminBookFetcher = async () => {
    const { data } = await axios.get(`/api/books/${id}`);
    dispatch(setSelectedBook(data));
    setLoading(true);
  };

  useEffect(() => {
    adminBookFetcher();
  }, []);

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };
  const authorHandler = (event) => {
    setAuthor(event.target.value);
  };
  const descriptionHandler = (event) => {
    setdescription(event.target.value);
  };
  const genreHandler = (event) => {
    setGenre(event.target.value);
  };
  const volumeHandler = (event) => {
    setVolume(event.target.value);
  };
  const yopHandler = (event) => {
    setYOP(event.target.value);
  };
  const isbnHandler = (event) => {
    setIsbn(event.target.value);
  };
  const editionHandler = (event) => {
    setEdition(event.target.value);
  };
  const priceHandler = (event) => {
    setPrice(event.target.value);
  };
  const stockHandler = (event) => {
    setStock(event.target.value);
  };

  const bookUpdater = async (event) => {
    try {
      event.preventDefault();
      const updatedBook = {
        title,
        author,
        description,
        genre,
        volume,
        yearOfPublish,
        isbn,
        edition,
        price,
        stock,
      };
      console.log("body we are sending up for PUT -> ");
      console.log(updatedBook);

      // JWT & authorization header to give for authorization check in the API
      const token = window.localStorage.getItem("token");
      const config = { headers: { authorization: "Bearer " + token } };

      // Update book in DB
      const { data } = await axios.put(`/api/books/${id}`, updatedBook, config);

      // update setSelected book to have what's in DB
      dispatch(setSelectedBook(data));

      // navigate admin back to the list of all books
      navigate(`/admin/books`);
    } catch (error) {
      console.log(error);
    }
  };

  if (!loading) {
    return <div>Oops, something went wrong!</div>;
  }

  return (
    <div className="formBase">
      <div className="formDetail">
        <form onSubmit={bookUpdater}>
          <h1>Update Product</h1>
          <div className="formInput">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              className="editInput"
              placeholder={selectedBook.title}
              onChange={titleHandler}
            />
            <label htmlFor="author">Author</label>
            <input
              id="author"
              className="editInput"
              placeholder={selectedBook.author}
              onChange={authorHandler}
            />
            <label htmlFor="description">Description</label>
            <textarea
              rows="10"
              id="description"
              className="editInput"
              placeholder={selectedBook.description}
              onChange={descriptionHandler}
            />
            <label htmlFor="genre">Genre</label>
            <input
              id="genre"
              className="editInput"
              placeholder={selectedBook.genre}
              onChange={genreHandler}
            />
            <label htmlFor="volume">Volume</label>
            <input
              id="volume"
              className="editInput"
              placeholder={selectedBook.volume}
              onChange={volumeHandler}
            />
            <label htmlFor="yop">Year of Publishing</label>
            <input
              id="yop"
              className="editInput"
              placeholder={selectedBook.yearOfPublish}
              onChange={yopHandler}
            />
            <label htmlFor="isbn">ISBN</label>
            <input
              id="isbn"
              className="editInput"
              placeholder={
                selectedBook.isbn === null
                  ? "no isbn yet"
                  : `${selectedBook.isbn}`
              }
              onChange={isbnHandler}
            />
            <label htmlFor="edition">Edition</label>
            <input
              id="edition"
              className="editInput"
              placeholder={
                selectedBook.edition === null
                  ? "no edition info"
                  : selectedBook.edition
              }
              onChange={editionHandler}
            />
            <label htmlFor="price">Price in cents</label>
            <input
              id="price"
              className="editInput"
              placeholder={selectedBook.price}
              onChange={priceHandler}
            />
            <label htmlFor="stock">Stock</label>
            <input
              id="stock"
              className="editInput"
              placeholder={selectedBook.stock}
              onChange={stockHandler}
            />

            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminBookEdit;
