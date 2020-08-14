import React, {Component} from "react";
import './BreadcrumTrail.css';

export default class BreadcrumTrail extends Component{

    constructor(props) {
        super(props);
        if(!Array.isArray(props.content)){
            throw new Error('The given content is not valid. Make sure you gave an array.');
        }

        this.state = {
            highestTab : 0,
            currentTab : 0,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!Array.isArray(this.props.content)){
            throw new Error('The given content is not valid. Make sure you gave an array.');
        }
    }

    handleTabLinkClick = (e) => {
        let currentElement = e.currentTarget
        let animatedElements = document.getElementsByClassName('link-temp-grey-circle');
        for(let i = 0; i < animatedElements.length; i++){
            animatedElements[i].remove();
        }
        let newAnimatedElement = document.createElement("div");
        newAnimatedElement.className = 'link-temp-grey-circle';
        currentElement.appendChild(newAnimatedElement);

        let highestTab = this.state.highestTab;
        let newTabIndex = currentElement.getAttribute('data-index');
        if(newTabIndex >= highestTab){
            highestTab = newTabIndex;
        }

        this.setState({
            highestTab : highestTab,
            currentTab : newTabIndex
        });
    }

    render(){
        return (
            <div className='breadcrum-container'>
                <div className="breadcrum-header">
                    {this.props.content.map((tab,index) => {
                        let linkClasses = 'breadcrum-tab-link';
                        if(index <= this.state.highestTab){
                            linkClasses += ' breadcrum-link-seen';
                        }
                        if(index === parseInt(this.state.currentTab)){
                            linkClasses += ' breadcrum-link-active';
                        }
                        return (
                            <div className={linkClasses} onClick={this.handleTabLinkClick} data-index={index} key={index}>
                                <div className="breadcrum-tab-link-inner-container">
                                    <span>{index}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {this.props.content.map((tab,index) => {
                    let elementClasses = 'breadcrum-tab-content'
                    if(index !== parseInt(this.state.currentTab)){
                        elementClasses += ' breadcrum-content-hidden'
                    }
                    return (
                        <div className={elementClasses} key={index}>{tab}</div>
                    );
                })}
            </div>
        );
    }
}