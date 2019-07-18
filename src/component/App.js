import React, {Component} from 'react';
import logo from '../logo.svg';
import '../sass/App.scss';

import Header from './Header';
import Formulario from './Formulario';
import Resumen from './Resumen';
import {calcularMarca, obtenerDiferenciaAnio, obtenerPlan} from '../helper';

class App extends Component{
    state = {
        resultado : '',
        datos: {}
    };

    cotizarSeguro = (datos) => {
        const {marca, plan, year} = datos;

        //agregar una base de 2000
        let resultado = 2000;

        //obtener la diferencia de años y
        const diferencia = obtenerDiferenciaAnio(year);
        //console.log(`La diferencia de años es de ${diferencia}`);

        //por cada año restar el tres por ciento del valor del seguro.
        resultado -= ((diferencia * 3) * resultado) / 100;
        //console.log(resultado);

        //Americano 15%, Asiatico 5% y Europeo 30% de incremento al valor actual
        resultado = calcularMarca(marca) * resultado;

        //el plan del auto, el basico incrementa el valor 20%
        //y cobertura completa 50%

        let incrementoPlan = obtenerPlan(plan);
        //console.log(incrementoPlan);

        //dependiendo del plan incrementar
        resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

        //console.log(resultado);

        //crear objeto para el resumen
        const datosAuto = {
            marca : marca,
            plan : plan,
            year : year
        };

        //ya tenemos el costo
        this.setState({
            resultado : resultado,
            datos : datosAuto

        });
    };

    render(){
    return (
        <div className="contenedor">
            <Header
                titulo='Cotizador de Seguro de Auto'
            />
            <div className="contenedor-formulario">
            <Formulario
            cotizarSeguro={this.cotizarSeguro}
            />
            <Resumen
                datos = {this.state.datos}
                resultado = {this.state.resultado}
            />
            </div>
        </div>
    );
    }

}

export default App;
