import React, {useContext, useState} from 'react'
import { Form, Button } from 'react-bootstrap';
import {NotificationContext} from "../../shared/Notifications/index"
import {UserContext} from "../../Authentication/UserProvider"
import Axios from "axios";
import { GlobalStoreContext } from '../../shared/Globals';
import {Redirect} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const BookForm = ({endpoint , buttonLabel, preloadData = {}}) => {
    const [inputs, setInputs] = useState({...preloadData});
    const {user} = useContext(UserContext);
    const {setNotification} = useContext(NotificationContext);
    const {globalStore} = useContext(GlobalStoreContext);
    const [redirect, setRedirect] = useState(false);

    console.log("preloadData", preloadData, inputs)
    const handleChange = event => {
        const {value, name} = event.target;
        event.persist();
        setInputs({
            ...inputs,
            [name]:value
        })
    };
    
    // const onChangeDate = (date) => {
    //     setInputs({ ...inputs, date });
    //   };
    const handleSubmit = event => {
        event.preventDefault();
        Axios.post(`${globalStore.REACT_APP_ENDPOINT}/${endpoint}`,
        {
            ...inputs,
            secret_token : user && user.token
        }).
        then(({ data }) => {
            if(data){
                setNotification({
                    type: "success",
                    message: "Book was created successfully"
                })

            }
            
        setRedirect(true);
        }).catch(err => {
            setNotification({
                type:"danger",
                message: `There was an error creating the book : ${err.message}`
            })
        })
    };
    return (
        redirect ? (
            <Redirect to="/books"/>
          ) :
        <Form onSubmit = {handleSubmit}>

        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            name="author"
            onChange={handleChange}
            required
            defaultValue={inputs.author}
          />
        </Form.Group>
           
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            onChange={handleChange}
            required
            defaultValue={inputs.name}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Genre</Form.Label>
          <Form.Control
            name="genre"
            onChange={handleChange}
            required
            defaultValue={inputs.genre}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            onChange={handleChange}
            required
            defaultValue={inputs.price}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control
            name="date"
            onChange={handleChange}
            required
            defaultValue={inputs.date ? inputs.date.substring(0,10) : inputs.date}
          />
        </Form.Group>
        <Button type="submit">{ buttonLabel || "Submit" }</Button>
        </Form>
    );
}
export default BookForm;