import React, {Component} from 'react';
import './App.css';
import BreadcrumTrail from "./Component/BreadcrumTrail";

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            content:[
                (<div>
                    test content 1 <br/>
                    <input type="text" placeholder="dummy input test 1" required/>
                </div>),
                "test content 2",
                (<div>test content 3</div>),
                (<div>test content 4</div>),
            ]
        };
    }

    render (){
        return (
            <div className="main-container">
                <BreadcrumTrail
                    content={this.state.content}
                    onSubmit={(e)=>{e.preventDefault(); alert('tg');}}
                />
            </div>
        );
    }
}

export default App;
