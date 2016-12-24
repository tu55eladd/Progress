import * as React from 'react';

import StateChanger from './StateChanger';
import TextInput from './TextInput';

export default class CategoryChooser extends React.Component<any, any> {

  setCategory( event:React.MouseEvent<HTMLLIElement>, taskIndex:number, categoryName:string ){
    event.stopPropagation();
    StateChanger.setCategory( taskIndex, categoryName );
  }

  getCategoryNodes(){
    return StateChanger.getCategories()
      .map( ( categoryName, index ) => {
        return <li onClick={ (event:React.MouseEvent<HTMLLIElement>) => { this.setCategory(event, this.props.index, categoryName) } } key={index} >{categoryName}</li>
      })
  }

  render(){
    const categoryNodes = this.getCategoryNodes();
    return(
      <div className="CategoryChooser" >
        <span>{ this.props.category ? this.props.category : "Set category" }</span>
        <ul className="CategoryChooser-list box" >
          { categoryNodes }
          <li key={-1} >
            <TextInput label="New category:"
              clickHandler={ ( categoryName:string ) => { StateChanger.addCategory( categoryName ) } } />
          </li>
        </ul>
      </div>
    )
  }
}
