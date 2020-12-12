import React, {useContext} from 'react'
import {Route, Switch} from "react-router-dom";
import New from "./New/index"
import Edit from "./Edit/index"
import {UserContext} from "../Authentication/UserProvider"
import Index from "./index"
export default function Routes() {
    const {user} = useContext(UserContext)
    return (
        <Switch>
            <Route exact path="/books" component={Index} />
            
            {user && user.token ? (
            <>
                <Route path="/books/create" component={New} />
                <Route path="/books/update/:id" component={Edit} />
            </>):
            null}
        </Switch>
    )
}
