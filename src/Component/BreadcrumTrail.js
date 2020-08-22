import React, {Component} from "react";
import './BreadcrumTrail.css';

export default class BreadcrumTrail extends Component{

    formId = 'form-' + Math.random().toString(36).substr(2, 9);

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

        this.switchTab(newIndex);
    }

    switchTab = (newIndex) => {
        let formElement = document.getElementById(this.formId);
        if(formElement.reportValidity() !== false){
            let highestTab = this.state.highestTab;
            if(newIndex >= highestTab){
                highestTab = newIndex;
            }

            this.setState({
                highestTab : highestTab,
                currentTab : newIndex
            });
        }
    }

    updateProgressBarWidth(){
        let floatWidth = 100 / this.props.content.length;
        let width = (this.state.currentTab * floatWidth) + (floatWidth / 2);
        this.setCSSVariableProperty('--progress-bar-width',width + '%');
    }

    setCSSVariableProperty(property,value){
        document.documentElement.style.setProperty(property,value);
    }

    render(){
        let {onSubmit,content, encType, action, mainColor, mainLightColor} = this.props;
        if(onSubmit === undefined || !(onSubmit instanceof Function)){
            onSubmit = (e)=>{};
        }

        if(mainColor !== undefined){
            this.setCSSVariableProperty('--main-color',mainColor);
        }
        if(mainLightColor !== undefined){
            this.setCSSVariableProperty('--main-light-color',mainLightColor);
        }

        if(content.length === 0){
            return (<div>No data given to form</div>);
        }
        this.updateProgressBarWidth();
        return (
            <div className='breadcrum-container'>
                <form id={this.formId} action={action ?? ''} onSubmit={onSubmit} encType={encType ?? ''} >
                    <div className="breadcrum-header">
                        <div className="breadcrum-header-progress-bar breadcrum-header-progress-bar-base"/>
                        <div className="breadcrum-header-progress-bar breadcrum-header-progress-bar-active"/>
                        {content.map((tab,index) => {
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
                                        <span>{index+1}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {content.map((tab,index) => {
                        let elementClasses = 'breadcrum-tab-content'
                        if(index !== parseInt(this.state.currentTab)){
                            elementClasses += ' breadcrum-content-hidden'
                        }

                        let prevBtn = <div className="dummy-btn">dummy</div>;
                        let nextBtn = prevBtn;
                        if(index !== 0){
                            prevBtn = <div className="breadcrum-button button-previous" onClick={(e) => this.switchTab(index-1)}>Précédent</div>;
                        }
                        if(index !== content.length - 1){
                            nextBtn = <div className="breadcrum-button button-next" onClick={(e) => this.switchTab(index+1)}>Suivant</div>;
                        }else{
                            nextBtn = <button className="breadcrum-button breadcrum-submit-button button-next">Valider</button>
                        }
                        return (
                            <div className={elementClasses} key={index}>
                                <div className="breadcrum-content">{tab}</div>
                                <div className="breadcrum-content-footer">
                                    {prevBtn}
                                    {nextBtn}
                                </div>
                            </div>
                        );
                    })}
                </form>
            </div>
        );
    }
}