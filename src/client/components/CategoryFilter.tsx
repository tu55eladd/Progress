import * as React from 'react';

import Chip from './Chip';
import StateChanger from './StateChanger';
import TextInput from './TextInput';

export default class CategoryFilter extends React.Component<any, any> {

  createNewFilter( filterName:string ){
    StateChanger.addCategoryFilter( filterName );
  }

  getFilterChips(){
    return StateChanger.getCategoryFilters()
      .map( (filter, index) => { return <Chip text={ filter } key={ index } index={ index }  /> } )
  }

  addFilter(){
    throw new Error("Not implemented");
  }

  render(){
    return(
      <div className="CategoryFilters" >
        <div>Filter:</div>
        { this.getFilterChips() }
        <TextInput clickHandler={ this.createNewFilter.bind(this) } />
      </div>
    )
  }
}
