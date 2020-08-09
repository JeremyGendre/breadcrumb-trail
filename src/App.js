import React, {Component} from 'react';
import './App.css';
import BreadcrumTrail from "./Component/BreadcrumTrail";

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            content : []
        };
    }

    handlebtnclick = () => {
        this.setState({
            content:[
                (<div>hehehe</div>),
                "test3",
                (<div>hahaha</div>),
            ]
        });
    }

    render (){
        return (
            <div className="main-container">
                <BreadcrumTrail content={this.state.content}/>
                <div onClick={this.handlebtnclick}>btn test</div>
            </div>
        );
    }
}

export default App;
