import React from 'react'
import BookForm from "../Form/index"
import Header from "../../shared/Header/index"
import { Container } from 'react-bootstrap';


export default function New() {
    return (
        <>
        <Header title="Books">
        Hi, Create a Book Now!!!
        </Header>
        <Container>
        <BookForm
        endpoint="books"
        buttonLabel = "Create"
        />
        </Container>
        </>
    );
}
