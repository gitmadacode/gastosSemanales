import React, { Component } from 'react';
import {revisarPresupuesto} from '../helper';

class Restante extends Component {
    render(){
        const presupuesto = this.props.presupuesto;
        const restante = this.props.restante;
    
        return(
            //revisarPresupuesto es una clase del helper para cambiar el color de la alerta segun el restante
            <div className={revisarPresupuesto(presupuesto,restante)}>
            <p>Restante : ${this.props.restante}</p>
        </div>
        )
    }
}

export default Restante;