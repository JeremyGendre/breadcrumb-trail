import React, {Component} from "react";
import './BreadcrumTrail.css';

export default class BreadcrumTrail extends Component{

    render(){
        console.log(this.props.content);
        return (
            <div className='breadcrum-container'>
                Test
            </div>
        );
    }
}