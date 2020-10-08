import React, {useState} from "react";
import PropTypes from 'prop-types';
import './BreadcrumTrail.css';

export default function BreadcrumTrail(props){
    const formId = 'form-' + Math.random().toString(36).substr(2, 9);
    const {onSubmit, content, encType, action, mainColor, mainLightColor, submitting} = props;
    const [highestTab, setHighestTab] = useState(0);
    const [currentTab, setCurrentTab] = useState(0);

    function handleTabLinkClick(e,newIndex){
        let currentElement = e.currentTarget;
        let animatedElements = document.getElementsByClassName('link-temp-grey-circle');
        for(let i = 0; i < animatedElements.length; i++){
            animatedElements[i].remove();
        }
        let newAnimatedElement = document.createElement("div");
        newAnimatedElement.className = 'link-temp-grey-circle';
        currentElement.appendChild(newAnimatedElement);

        switchTab(newIndex);
    }

    function switchTab(newIndex){
        const formElement = document.getElementById(formId);
        if(formElement.reportValidity() !== false){
            let newHighestTab = highestTab;
            if(newIndex >= newHighestTab){
                newHighestTab = newIndex;
            }
            setHighestTab(newHighestTab);
            setCurrentTab(newIndex);
        }
    }

    function updateProgressBarWidth(){
        let floatWidth = 100 / props.content.length;
        let width = (currentTab * floatWidth) + (floatWidth / 2);
        setCSSVariableProperty('--progress-bar-width',width + '%');
    }

    function setCSSVariableProperty(property,value){
        document.documentElement.style.setProperty(property,value);
    }

    let onSubmitFunc = onSubmit;
    if(onSubmitFunc === undefined || !(onSubmitFunc instanceof Function)){
        onSubmitFunc = (e)=>{};
    }

    if(mainColor !== undefined){
        setCSSVariableProperty('--main-color', mainColor);
    }
    if(mainLightColor !== undefined){
        setCSSVariableProperty('--main-light-color', mainLightColor);
    }

    if(content.length === 0){
        return (<div>No data given to form</div>);
    }
    updateProgressBarWidth();
    return (
        <div className='breadcrum-container'>
            <form id={formId} action={action ?? ''} onSubmit={onSubmitFunc} encType={encType ?? ''} >
                <div className="breadcrum-header">
                    <div className="breadcrum-header-progress-bar breadcrum-header-progress-bar-base"/>
                    <div className="breadcrum-header-progress-bar breadcrum-header-progress-bar-active"/>
                    {content.map((tab,index) => {
                        let linkClasses = 'breadcrum-tab-link';
                        if(index <= highestTab){
                            linkClasses += ' breadcrum-link-seen';
                        }
                        if(index === currentTab){
                            linkClasses += ' breadcrum-link-active';
                        }
                        return (
                            <div className={linkClasses} onClick={(e) => handleTabLinkClick(e,index)} key={index}>
                                <div className="breadcrum-tab-link-inner-container">
                                    <span>{index+1}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {content.map((tab,index) => {
                    let elementClasses = 'breadcrum-tab-content';
                    if(index !== currentTab){
                        elementClasses += ' breadcrum-content-hidden'
                    }

                    let prevBtn = <div className="dummy-btn">dummy</div>;
                    let nextBtn = prevBtn;
                    if(index !== 0){
                        prevBtn = <div className="breadcrum-button button-previous" onClick={(e) => switchTab(index-1)}>Précédent</div>;
                    }
                    if(index !== content.length - 1){
                        nextBtn = <div className="breadcrum-button button-next" onClick={(e) => switchTab(index+1)}>Suivant</div>;
                    }else{
                        nextBtn = <button disabled={submitting ?? false} className="breadcrum-button breadcrum-submit-button button-next">Valider</button>
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

BreadcrumTrail.propTypes = {
    content: PropTypes.array,
    onSubmit: PropTypes.func,
    encType: PropTypes.string,
    action: PropTypes.string,
    mainColor: PropTypes.string,
    mainLightColor: PropTypes.string
};