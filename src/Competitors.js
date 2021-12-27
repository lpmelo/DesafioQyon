import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';

class Competitors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            sexo: 'Masculino',
            temperaturaMediaCorpo: '0.0',
            peso: '0.00',
            altura: '0.00',
            dataJson:[]
        };
        this.sendValue = this.sendValue.bind(this);
        this.getApiData = this.getApiData.bind(this);
    }

    hideShow(element) {
        element = document.getElementById(element);
        let option = element.id;
        switch (option) {
            case ("register"):
                document.getElementById('edit').style.display = 'none';
                if (element.style.display === 'none') {
                    element.style.display = 'block';
                } else {
                    element.style.display = 'none';
                }
                break;
            case ("edit"):
                document.getElementById('register').style.display = 'none';
                this.getApiData();
                if (element.style.display === 'none') {
                    element.style.display = 'block';
                } else {
                    element.style.display = 'none';
                }
                break;
        }
    }
    getApiData(){
        let data = [];
        axios.get("http://localhost:3000/competidores").then(res=>{
            this.setState({dataJson: res.data})
        });
        data = this.state.dataJson;
        let dropdown = document.getElementById('dropdownEdit');
        dropdown.length = 0;
        let defaultOption = document.createElement('option');
        defaultOption.text = "-- Selecione um Id --"
        dropdown.add(defaultOption);
        dropdown.selectedIndex = 0;
        let option;
        for(let i = 0; i< data.length; i++){
             option = document.createElement('option');
           option.text = data[i].id;
             dropdown.add(option);
         }
    }
    sendValue() {
        const data = {
            nome: this.state.nome,
            sexo: this.state.sexo,
            TemperaturaMediaCorpo: this.state.temperaturaMediaCorpo,
            Peso: this.state.peso,
            Altura: this.state.altura
        }
        axios.post("http://localhost:3000/competidores", data)
    }

    render() {
        const defaultVisible = {
            display: 'none'
        }
        return (
            <div className='formControl comp'>
                <div className='btnOption'>
                    <button className='btnRegisterOn' onClick={() => this.hideShow('register')}>Cadastrar</button>
                    <button className='btnEditOn' onClick={() => this.hideShow('edit')}>Editar</button>
                    <button className='btnRemoveOn'>Remover</button>
                </div>
                <div className='containerForm'>
                    <div className='registerForm' id='register' style={defaultVisible}>
                        <h3 className='lblRegister'>Cadastro de Competidores</h3>
                        <label>Nome:</label>
                        <br />
                        <input type="text" id="tbName" value={this.state.nome} onChange={(e) => this.setState({ nome: e.target.value })} />
                        <br />
                        <label>Temperatura Média Corporal:</label>
                        <br />
                        <input type="number" id="tbTemp" value={this.state.temperaturaMediaCorpo} onChange={(e) => this.setState({ temperaturaMediaCorpo: e.target.value })} />
                        <br />
                        <label>Peso:</label>
                        <br />
                        <input type="number" id="tbWeight" value={this.state.peso} onChange={(e) => this.setState({ peso: e.target.value })} />
                        <br />
                        <label>Altura:</label>
                        <br />
                        <input type="number" id="tbHeight" value={this.state.altura} onChange={(e) => this.setState({ altura: e.target.value })} />
                        <br />
                        <label>Sexo:</label>
                        <br />
                        <select id="scGender" onChange={(e) => this.setState({ sexo: e.target.value })}>
                            <option>
                                Masculino
                            </option>
                            <option>
                                Feminino
                            </option>
                        </select>
                        <br />
                        <button className='btnSend' onClick={this.sendValue}>Enviar</button>
                    </div>
                    <div className='editForm' id='edit' style={defaultVisible}>
                        <h3>Editar Competidores</h3>
                        <select id='dropdownEdit'>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}
export default Competitors;
