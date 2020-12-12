import React, { useEffect, useContext, useState } from 'react';
import Axios from 'axios';
import { GlobalStoreContext } from '../../shared/Globals';
import { NotificationContext } from '../../shared/Notifications';
import { Container, Table } from 'react-bootstrap';
import Header from '../../shared/Header';
import {Link} from "react-router-dom";
import {UserContext} from "./../../Authentication/UserProvider"

const Details = (props) => {
  const [book, setBook] = useState();
  const { setNotification } = useContext(NotificationContext);
  const { user } = useContext(UserContext);
  const { globalStore } = useContext(GlobalStoreContext);

  console.log("globalStore", globalStore.REACT_APP_ENDPOINT)

  useEffect(() => {
    Axios.get(`${globalStore.REACT_APP_ENDPOINT}/books/${props.match.params.id}?secret_token=${user.token}`)
    .then(({ data }) => setBook([data]))
    .catch(error => {
      console.error(error.message);

      setNotification({
        type: "danger",
        message: "Couldn't access the specific book___id at this time."
      });
    })
  }, [globalStore]);
  console.log("book map details", book)

  return (
    book ? (
      <>
        <Header title="Details of Book">
          <p>
            In this Page <strong>You can view a detailed book</strong>
          </p>
        </Header>
        <Container className="my-3">
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Author</th>
                <th>Name</th>
                <th>Genre</th>
                <th>Price</th>
                <th>Date</th>
                </tr>
            </thead>
            <tbody>
            {book.map(({author,name,genre,price,date, _id}, i) => (
                <tr key={i}>
                  <td>{i+1}</td>
                  <td >{author}</td>
                  <td >{name}</td>
                  <td >{genre}</td>
                  <td >{`${price} $`}</td>
                  <td >{date.substring(0,10)}</td>
                   </tr>
               ))}
            </tbody>
        </Table>
    </Container>
      </>
    ) : null
  );
}
 
export default Details;