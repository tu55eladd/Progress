import * as React from 'react';
import StateChanger from './StateChanger';

export default class Header extends React.Component<any, any> {
    enterHandler:EventListenerOrEventListenerObject;

    getState( name:string ){
        fetch('/user?name=' + name)
            .then((res: Response) => {
                console.log("Resopnse: ", res);
                return res.json();
            })
            .then((res:any) => {
                console.log("Parsed response: ", res);
                const user:User = {
                    name: res.name,
                    email: res.email,
                    _id: res._id
                }
                
                StateChanger.setUser(user);
                StateChanger.setState(res.state);
                this.props.setStateIsLoaded(true);
                StateChanger.reRender(res.state, false);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    
    getEnterHandler(){
        if(this.enterHandler){
            return this.enterHandler;
        }

        this.enterHandler = ( event:any ) => {
            if(event.keyCode == 13){
                this.getState( event.target.value );
                event.stopPropagation();
            }
        }

        return this.enterHandler;
    }


    disableEnter(){
        window.removeEventListener( "keydown" , this.getEnterHandler() );
    }


    enableEnter(){
        window.addEventListener( "keydown", this.getEnterHandler() );
    }


    render(){
        return(
            <header>
                <div className="Header-content">
                    <span className="Header-label">PROGRESS</span>
                    <span>
                        <div className="TextInput-field" >
                        <input type="text" placeholder="name" 
                            onBlur={ this.disableEnter.bind(this) }
                            onFocus={ this.enableEnter.bind(this) }
                        /> 
                        </div>
                    </span>
                </div>
            </header>
        )
    }
}