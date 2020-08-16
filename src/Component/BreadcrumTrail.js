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

    handleTabLinkClick = (e,newIndex) => {
        let currentElement = e.currentTarget;
        let animatedElements = document.getElementsByClassName('link-temp-grey-circle');
        for(let i = 0; i < animatedElements.length; i++){
            animatedElements[i].remove();
        }
        let newAnimatedElement = document.createElement("div");
        newAnimatedElement.className = 'link-temp-grey-circle';
        currentElement.appendChild(newAnimatedElement);

        let highestTab = this.state.highestTab;
        if(newIndex >= highestTab){
            highestTab = newIndex;
        }

        this.setState({
            highestTab : highestTab,
            currentTab : newIndex
        });
    }

    handleBtnClick = (e,newIndex) => {
        let highestTab = this.state.highestTab;
        if(newIndex >= highestTab){
            highestTab = newIndex;
        }
        this.setState({
            highestTab : highestTab,
            currentTab : newIndex
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
                            <div className={linkClasses} onClick={(e) => this.handleTabLinkClick(e,index)} key={index}>
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

                    let prevBtn = <div className="dummy-btn">dummy</div>;
                    let nextBtn = prevBtn;
                    if(index !== 0){
                        prevBtn = <div className="breadcrum-button button-previous" onClick={(e) => this.handleBtnClick(e,index-1)}>Précédent</div>;
                    }
                    if(index !== this.props.content.length - 1){
                        nextBtn = <div className="breadcrum-button button-next" onClick={(e) => this.handleBtnClick(e,index+1)}>Suivant</div>;
                    }
                    return (
                        <div className={elementClasses} key={index}>
                            <div>{tab}</div>
                            <div className="breadcrum-content-footer">
                                {prevBtn}
                                {nextBtn}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}