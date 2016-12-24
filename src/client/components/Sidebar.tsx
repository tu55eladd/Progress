import * as React from 'react';
import StateChanger from './StateChanger';

class SidebarComponent extends React.Component <any, any> {
  detailViews:React.ReactNode;
}

export default class Sidebar extends SidebarComponent {

  getDetailViews(){
    this.detailViews = this.props.detailViews
      .map( (view:DetailView, index:number) => {
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
