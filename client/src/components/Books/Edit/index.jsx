import React, { useEffect, useContext, useState } from 'react';
import BookForm from "../Form/index"
import Header from "../../shared/Header/index"
import { Container } from 'react-bootstrap';
import Axios from "axios";
import { NotificationContext } from '../../shared/Notifications/index';
import {UserContext} from "../../Authentication//UserProvider"
import {GlobalStoreContext} from "../../shared/Globals"
export default function Edit(props) {
    const [book, setBook] = useState(null);
    const { setNotification } = useContext(NotificationContext);
    const { user } = useContext(UserContext);
    const { globalStore } = useContext(GlobalStoreContext);

    useEffect(() => {
        Axios.get(`${globalStore.REACT_APP_ENDPOINT}/books/${props.match.params.id}?secret_token=${user.token}`)
        .then(({ data }) => setBook(data))
        .catch(error => {
          console.error(error.message);
    
          setNotification({
            type: "danger",
            message: "Couldn't access the specific book___id at this time."
          });
        })
      }, [globalStore]);
      console.log("book edit 1 specific id", book)
    return (
        book ? (
        <>
        <Header title="Books">
        Hi, Edit a book
        </Header>
        <Container>
        <BookForm
        endpoint="books/update/:id"
        buttonLabel = "Update"
        preloadData={book}
        />
        </Container>
        </>
    ): 
    null)
}
