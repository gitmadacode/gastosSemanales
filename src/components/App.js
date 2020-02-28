import React, { Component } from 'react';
import '../css/App.css';
import Header from './Header';
import Formulario from './Formulario';
import Listado from './Listado';
import ControlPresupuesto from './ControlPresupuesto';
import {validarPresupuesto} from '../helper';


class App extends Component{
  
  state = {
    presupuesto : '',
    restante: '',
    gastos: {}
  } 

  //Para consulta a una API , No sobrecargar ;-;
  componentDidMount(){
    this.obtenerPresupuesto();
  }

  obtenerPresupuesto = () => {
    let presupuesto = prompt('Cual es tu presupuesto?');
    
    let resultado = validarPresupuesto(presupuesto);
    
    if(resultado){
      //console.log('Valido!');
      this.setState({
        presupuesto: presupuesto,
        restante : presupuesto
      })
    }else{
      this.obtenerPresupuesto();
    }
  }

  //Agregar un gasto nuevo al state
  agregarGasto = gasto => {
    //Tomar una copia del state actual
    const gastos = {...this.state.gastos};

    
    //Agregar al gasto al objeto del state
    gastos[`gasto${Date.now()}`] = gasto;
    
    //Restar al presupuesto
    this.restarPresupuesto(gasto.cantidadGasto);
    
    //Ponerlo en el state
    this.setState({
      gastos
    })
  }
    //Metodo para restar del presupuesto
  restarPresupuesto = cantidad => {
    //Leer el gasto 
    let restar = Number(cantidad);
    //Tomar una copia del state actual
    let restante = this.state.restante;
    //Se resta
    restante -= restar;
    
    //Se agrega el nuevo State
    this.setState({
        restante
    })
  }


  render(){
  return (
    <div className="App container">
      <Header 
         titulo="Gastos por semana"
      />
      <div className="contenido-principal contenido">
        <div className="row">
          <div className="one-half column">
            <Formulario
              agregarGasto = {this.agregarGasto}
            />
          </div>
          <div className="one-half column">
            <Listado
            gastos={this.state.gastos}
            />
            <ControlPresupuesto
            presupuesto = {this.state.presupuesto}
            restante = {this.state.restante}
            />
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
