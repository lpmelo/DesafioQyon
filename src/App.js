import React, { Component } from 'react';
import './css/style.css';
import Competitors from './Competitors.js'
class App extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    hideShow(element) {
        element = document.getElementById(element);
        if (element.style.display === 'none') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='containerMenu'>
                    <div className='containerLogo'>
                        <i className="fas fa-running"></i>
                        <a className='logoName'>RunAwesome</a>
                    </div>
                    <div className='menuBar'>
                        <a className='btnComp' onClick={() => this.hideShow('comp')}><div className='btnCompetitors'>Competidores</div></a>
                    </div>
                </div>
                <div className='pageCompetitors' id='comp'>
                    <Competitors />
                </div>

            </div>

        );
    }
}
export default App;