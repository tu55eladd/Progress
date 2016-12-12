import React from 'react';
import StateChanger from './StateChanger';

export default class Sidebar extends React.Component {

  getDetailViews(){
    this.detailViews = this.props.detailViews
      .map( (view, index) => {
        var classes = "Sidebar-option";
        classes += view.active ? " Sidebar-option-active" : "";
        return <li onClick={()=>{this.props.setView(index)}} key={index} className={classes} >{ view.name }</li>
      });
  }

  render(){
    this.getDetailViews();

    return(
      <ul className="Sidebar box" >
        { this.detailViews }
      </ul>
    )
  }
}
