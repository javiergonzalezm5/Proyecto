import React, {Component} from 'react';
import axios from 'axios';

class Exalumno extends Component {
    constructor(props){
        super(props);
        this.state={
            _id:props.match.params.id,
            name:"",
            generation:"",
            carrer:"",
            age:0,
            income:0,
            current_job:""
        }
    }

    componentDidMount(){
        axios.get(`https://graduadosdevf.herokuapp.com/graduate/${this.state._id}`)
        .then((alumno) => {
            this.setState({
                name:alumno.data.name,
                generation:alumno.data.generation,
                carrer:alumno.data.carrer,
                age:alumno.data.age,
                income:alumno.data.income,
                current_job:alumno.data.current_job
            })
            console.log(this.state)
        })
        .catch(err=>console.log(err))
    }

    render(){
        return(
            <div>
                <h1>{this.state.name}</h1>
                <label htmlFor="">Edad:{this.state.age}</label><br/>
                <label htmlFor="">Generación:{this.state.generation}</label><br/>
                <label htmlFor=""> Carrera:{this.state.carrer}</label><br/>
                <label htmlFor=""> Ingreso:{this.state.income}</label><br/>
            </div>
        )
    }

}

export default Exalumno;