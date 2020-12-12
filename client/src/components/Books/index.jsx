import React, { useEffect, useContext, useState } from 'react';
import Axios from 'axios';
import { GlobalStoreContext } from '../shared/Globals';
import { NotificationContext } from '../shared/Notifications';
import { Container, Table } from 'react-bootstrap';
import Header from '../shared/Header';
import {Link} from "react-router-dom";
import {UserContext} from "./../Authentication/UserProvider"
const Books = () => {
  const { globalStore } = useContext(GlobalStoreContext);
  const [books, setBooks] = useState([]);
  const { setNotification } = useContext(NotificationContext);
  const { user } = useContext(UserContext);

  const deleteBook = (id) => {

    Axios.post(`http://localhost:4000/books/destroy/${id}?secret_token=${user.token}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log("Error: " + err));
    setBooks(books.filter((el) => el._id !== id));
    console.log("Books after delete", books);
  };
  useEffect(() => {
    Axios.get("http://localhost:4000/books")
    .then(({ data }) => setBooks(data))
    .catch(error => {
      console.error(error.message);

      setNotification({
        type: "danger",
        message: "Couldn't access the books at this time."
      });
    });
  }, []);

  return (
    books ? (
      <>
        <Header title="Your title for the Header component block">
          <p>
            This paragraph will be the value for <strong>&#123;children&#125;</strong> in the <strong>Header component</strong>.
          </p>

          <p>
            The header is editable under <strong>/src/components/Books/index.jsx</strong>
          </p>
        </Header>

        <Container className="my-3">
          <Table striped bordered hover >
            <thead>
              <tr>
                <td>Author</td>
                <td>Name</td>
                <td>Genre</td>
                <td>Price</td>
                <td>Date</td>
                <td>Actions</td>
              </tr>
            </thead>

            <tbody>
              {books.map(({author,name,genre,price,date, _id}, i) => (
                <tr key={i}>
                  <td >{author}</td>
                  <td >{name}</td>
                  <td >{genre}</td>
                  <td >{`${price} $`}</td>
                  <td >{date.substring(0,10)}</td>
                  <td>
        <Link to={"/books/update/" + _id}>Edit || </Link>
        <a
          href="#"
          onClick={() => {
            if (window.confirm("Are you sure to delete?")) {
              deleteBook(_id)
            } else {
              window.alert = "You did not want to delete";
            }
          }} 
        >
          Delete
        </a>
      </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </>
    ) : null
  );
}
 
export default Books;