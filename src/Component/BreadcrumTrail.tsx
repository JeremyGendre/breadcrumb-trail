import React, {FormEvent, ReactNode, useRef, useState} from "react";
import './BreadcrumTrail.css';

type Colors = {
    main? : string,
    background? : string,
    progress? : string,
};

type Buttons = {
    previous : ReactNode,
    next : ReactNode,
    last : ReactNode,
};

type Props = {
    action?: string,
    buttons?: Buttons,
    colors?: Colors,
    content: Array<ReactNode>,
    encType?: string,
    onSubmit?(e: FormEvent): void,
    submitting?: boolean
};

function manageThemeColor(colors: Colors){
    if(colors !== undefined){
        if(colors.main !== undefined){
            setCSSVariableProperty('--main-color', colors.main);
        }
        if(colors.background !== undefined){
            setCSSVariableProperty('--main-light-color', colors.background);
        }
        if(colors.progress !== undefined){
            setCSSVariableProperty('--main-progress-color', colors.progress);
        }
    }
}

function setCSSVariableProperty(property: string, value: string){
    document.documentElement.style.setProperty(property, value);
}

export default function BreadcrumTrail(props: Props){
    const {onSubmit, content, encType, action, colors, submitting} = props;
    const [highestTab, setHighestTab] = useState(0);
    const [currentTab, setCurrentTab] = useState(0);
    const form = useRef<HTMLFormElement | null>(null);

    function handleTabLinkClick(e: React.MouseEvent<HTMLDivElement>, newIndex: number){
        const animatedElements = document.getElementsByClassName('link-temp-grey-circle');
        for(let i = 0; i < animatedElements.length; i++){
            animatedElements[i].remove();
        }
        let newAnimatedElement = document.createElement("div");
        newAnimatedElement.className = 'link-temp-grey-circle';
        e.currentTarget!.appendChild(newAnimatedElement);

        switchTab(newIndex);
    }

    function switchTab(newIndex: number){
        if(form.current && form.current.reportValidity()){
            let newHighestTab = highestTab;
            if(newIndex >= newHighestTab){
                newHighestTab = newIndex;
            }
            setHighestTab(newHighestTab);
            setCurrentTab(newIndex);
        }
    }

    function updateProgressBarWidth(){
        const floatWidth = 100 / props.content.length;
        const width = (currentTab * floatWidth) + (floatWidth / 2);
        setCSSVariableProperty('--progress-bar-width',width + '%');
    }

    let onSubmitFunc = onSubmit;
    if(onSubmitFunc === undefined){
        onSubmitFunc = (e: FormEvent)=>{};
    }

    manageThemeColor(colors ? colors : {});

    if(content.length === 0){
        return <div>No data given to form</div>;
    }
    updateProgressBarWidth();
    return (
        <div className='breadcrum-container'>
            <form ref={form} action={action ? action : ''} onSubmit={onSubmitFunc} encType={encType ? encType : ''} >
                <div className="breadcrum-header">
                    <div className="breadcrum-header-progress-bar breadcrum-header-progress-bar-base"/>
                    <div className="breadcrum-header-progress-bar breadcrum-header-progress-bar-active"/>
                    {content.map((tab, index) => {
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
                        prevBtn = <div className="button-previous-container" onClick={(e) => switchTab(index - 1)}>
                                {props.buttons !== undefined && props.buttons.previous !== undefined ? props.buttons.previous : (
                                    <div className="breadcrum-button button-previous">Previous</div>
                                )}
                        </div>;
                    }
                    if(index !== content.length - 1){
                        nextBtn = <div className="button-next-container" onClick={(e) => switchTab(index + 1)}>
                            {props.buttons !== undefined && props.buttons.next !== undefined ? props.buttons.next : (
                                <div className="breadcrum-button button-next">Next</div>
                            )}
                        </div>;
                    }else{
                        nextBtn = <div className="button-next-container">
                            {props.buttons !== undefined && props.buttons.last !== undefined ? props.buttons.last : (
                                <button disabled={submitting ? submitting : false} className={"breadcrum-button breadcrum-submit-button button-next " + (submitting ? 'submit-btn-disabled' : '')}>Confirm</button>
                            )}
                        </div>
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