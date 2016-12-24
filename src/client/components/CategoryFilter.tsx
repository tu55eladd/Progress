import * as React from 'react';

import Chip from './Chip';
import StateChanger from './StateChanger';

export default class CategoryFilter extends React.Component<any, any> {

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
      </div>
    )
  }
}
