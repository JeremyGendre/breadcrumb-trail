import React, {Component} from 'react';
import './App.css';
import BreadcrumTrail from "./Component/BreadcrumTrail";

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            content:[
                (<div>test content 1</div>),
                "test content 2",
                (<div>test content 3</div>),
            ]
        };
    }

    render (){
        return (
            <div className="main-container">
                <BreadcrumTrail content={this.state.content}/>
            </div>
        );
    }
}

export default App;
