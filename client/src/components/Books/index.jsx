import React, { useEffect, useContext, useState } from 'react';
import Axios from 'axios';
import { GlobalStoreContext } from '../shared/Globals';
import { NotificationContext } from '../shared/Notifications';
import { Container, Table } from 'react-bootstrap';
import Header from '../shared/Header';
import {Link} from "react-router-dom";
import {UserContext} from "./../Authentication/UserProvider"
import classes from "./books.module.css"
const Books = () => {
  const [books, setBooks] = useState([]);
  const { setNotification } = useContext(NotificationContext);
  const { user } = useContext(UserContext);
  const { globalStore } = useContext(GlobalStoreContext);

  console.log("globalStore", globalStore.REACT_APP_ENDPOINT)

  const deleteBook = (id) => {

    Axios.post(`${globalStore.REACT_APP_ENDPOINT}/books/destroy/${id}?secret_token=${user.token}`)
      .then((res) => {
        console.log(res.data);
        setNotification({
          type: "success",
          message: "You delete it successfully"
        })
      })
      .catch((err) => console.log("Error: " + err));
    setBooks(books.filter((el) => el._id !== id));
    console.log("Books after delete", books);
  };
  useEffect(() => {
    Axios.get(`${globalStore.REACT_APP_ENDPOINT}/books`)
    .then(({ data }) => setBooks(data))
    .catch(error => {
      console.error(error.message);

      if(globalStore.REACT_APP_ENDPOINT){
        setNotification({
          type: "danger",
          message: "Couldn't access the books at this time."
        });
      }

    });
  }, [globalStore.REACT_APP_ENDPOINT,]);

  return (
    books ? (
      <>
        <Header title="Book Store Page">
          <p>
            Book Store Lists 
          </p>

          <p>
            In this Page <strong>You can edit and delete the books</strong>
          </p>
        </Header>

        <Container className="my-3">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <td>Author</td>
                <td>Name</td>
                <td>Genre</td>
                <td>Price</td>
                <td>Date</td>
                {user ?  <td>Actions</td> : null}
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
                  {user? <td>
        <Link to={"/books/update/" + _id}>Edit || </Link>
        <Link
          to="/books"
          onClick={() => {
            if (window.confirm("Are you sure to delete?")) {
              deleteBook(_id)
            } else {
              setNotification({
                type: "warning",
                message: "You did not delete it"
              });
            }
          }} 
        >
          Delete || 
        </Link>
        <Link to={"/books/details/" + _id}> Details</Link>
      </td>: null}
                </tr>
              ))}
            </tbody>
          </Table>
          <div className={classes.rowLength}>There are {books.length} Rows</div>
        </Container>
      </>
    ) : null
  );
}
 
export default Books;