import React from 'react';
import './App.css';
import BreadcrumTrail from "./Component/BreadcrumTrail";

function App(props){
    // it can of course be a state, but here for the test it's just a simple const
    const content = [
        (<div>
            test content 1 <br/>
            <input type="text" placeholder="dummy input test 1" required/>
        </div>),
        "test content 2",
        (<div>test content 3</div>),
        (<div>test content 4</div>),
    ];

    return (
        <div className="main-container">
            <BreadcrumTrail
                content={content}
                onSubmit={(e)=>{e.preventDefault(); alert('tg');}}
            />
        </div>
    );
}

export default App;
