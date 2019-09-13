import{
    BrowserRouter as Router,
    Route, Redirect
} from 'react-router-dom';

import React, {Component} from 'react';
import Exalumnos from './Components/Exalumnos';
import Exalumno from './Components/Exalumno';
import Prueba from './Components/Prueba';

class Routers extends Component{
    render(){
        return(
            <Router>
                <main>
                    <Route exact path="/" component={Exalumnos}/>
                    <Route exact path="/Exalumnos" component={Exalumnos}/>
                    <Route exact path="/Exalumno/:id" component={Exalumno}/>
                    <Route exact path="/prueba" component={Prueba}/>
                </main>
            </Router>
        )
    }
}

export default Routers;