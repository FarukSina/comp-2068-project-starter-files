import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../shared/Header';

const Home = () => {
  return (
    <>
      <Header title="Welcome to My Book Store">
        <p>
          Welcome to Book Store where you can authenticate and create a new book
        </p>

        <p>
          The header is editable under <strong>/src/components/Pages/Home/index.jsx</strong>
        </p>
      </Header>

      <Container>
        <hr/>

        <p>
          The content is editable under <strong>/src/components/Pages/Home/index.jsx</strong>
        </p>

        <p>You home page content!</p>
      </Container>
    </>
  );
}
 
export default Home;