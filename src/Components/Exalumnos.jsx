import React, {Component} from 'react';
import axios from 'axios';
import CardAlumno from './CardAlumno';
import {Link} from 'react-router-dom';

//Crear clase principal donde veremos todas las tarjetas
class Exalumnos extends Component {
    constructor(props){
        super(props)
        //estado incial del constructor
        this.state={
            Exalumnos:[],
            name:"",
            generation:"",
            carrer:"",
            age:"",
            current_job:"",
            income:""
        }
    }

    //siguiendo ciclo de vida
    //empieza a hacer petición a servidor externo después de renderizar información
    componentDidMount(){
        axios.get('https://graduadosdevf.herokuapp.com/all/graduates')
        .then ((Exalumnos)=>{
            //obtenemos data y la agregamos al estado que teníamos inicialmente
            this.setState({
                Exalumnos: Exalumnos.data
            })
            console.log(this.state.Exalumnos)
        })
        .catch(err=>console.log(err))
    }

    redirect = (id) => {
        console.log(id);
        this.props.history.push(`/Exalumno/${id}`)
    }

    renderExalumnos(){
        if(this.state.Exalumnos.length !==0){
            const exalumno=this.state.Exalumnos.map((alumno,index)=>{
                return(
                    //estado alumno debe tener el mismo nombre del estado inicial de CardAumno
                    <CardAlumno alumno={alumno} redirect={this.redirect}/>
                )
            })
            return exalumno
        }else{
            return(
                <div>
                    <label htmlFor="">No tienes exalumnos que mostrar</label>
                </div>
            )   
        }
    }


    onInputCheck = (e)=>{
        let name = e.target.name
        let value = e.target.value

        this.setState({
            [name]:value
        })
    }

    onFormSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state);
        if(this.state.name !== ""){
            axios.post('https://graduadosdevf.herokuapp.com/create/graduate/',this.state)
                .then(response=>{
                    console.log(response)
                    alert("El alumno fue registrado")
                    window.location.reload()
                })
        }else{
            alert("El nombre no fue ingresado")
        }
    }

    //todo componente neceita render para pintar en pantalla
    render(){
        return(
            <div>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <Link to='/prueba/'><button>Ir a Prueba</button></Link>
                        <h3>Registrar nuevo exalumno</h3>
                        <form onSubmit={this.onFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="">Nombre:</label>
                                <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onInputCheck} id=""></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Carrera:</label>
                                <input type="text" className="form-control" name="carrer" value={this.state.carrer} onChange={this.onInputCheck} id=""></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Generación:</label>
                                <input type="text" className="form-control" name="generation" value={this.state.generation} onChange={this.onInputCheck} id=""></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Edad:</label>
                                <input type="text" className="form-control" name="age" value={this.state.age} onChange={this.onInputCheck} id=""></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Trabajo actual:</label>
                                <input type="text" className="form-control" name="current_job" value={this.state.current_job} onChange={this.onInputCheck} id=""></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Ingreso actual:</label>
                                <input type="text" className="form-control" name="income" value={this.state.income} onChange={this.onInputCheck} id=""></input>
                            </div>
                            <button type="submit" className="btn-success btn-block">Guardar</button>
                        </form>
                    </div>
                </div>
                <h3>Exalumnos registrados</h3><br/>
                <div className="row">
                    {this.renderExalumnos()}
                </div>
            </div>
        )
    }
}

export default Exalumnos;