import React from "react";
import { Route } from "react-router-dom";
import LoginForm from "./forms/login_form_container";

const App = () => (
    <div>
        <header>
            <h1>Ahchoo is Live!</h1>
        </header>
        <Route path='/login' exact component={LoginForm} />
    </div>
)

export default App;