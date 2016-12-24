import * as React from 'react';

/* This component should replace all textunput fields */
export default class TextInput extends React.Component<any, any> {

  enterHandler:EventListenerOrEventListenerObject;

  handleClick( event:any ){
    event.stopPropagation();
    if(event.target.value){
      this.props.clickHandler( event.target.value );
    }
  }

  getEnterHandler(){
    if( this.enterHandler ){
      return this.enterHandler;
    }
    this.enterHandler = ( event:any ) => {
      if( event.keyCode == 13 ){
        this.handleClick( event );
        event.target.value = "";
      }
    }
    return this.enterHandler
  }

  enableEnter(){
    window.addEventListener( "keydown", this.getEnterHandler() );
  }

  disableEnter(){
    window.removeEventListener( "keydown", this.getEnterHandler() );
  }

  addAddButtonIfNeeded(){
    if(this.props.addButton){
      return <div onClick={ this.handleClick.bind(this) } className="progress-add-button" >{ this.props.addText }</div>;
    }
  }

  render(){
    return(
      <div className={ "TextInput " + this.props.classes }>
        <div className="TextInput-field">
          <label>{ this.props.label }</label>
          <input
            onClick={ (e) => { e.stopPropagation() } }
            placeholder={ this.props.placeholder }
            onBlur={ this.disableEnter.bind(this) }
            onFocus={ this.enableEnter.bind(this) } />
        </div>
        { this.addAddButtonIfNeeded() }
      </div>
    )
  }
}
