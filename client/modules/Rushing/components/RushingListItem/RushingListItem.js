import React, { PropTypes } from 'react';
import { getRushingPropTypes }  from '../../RushingPropTypes';
import rushingColumns from '../../../../../common/RushingColumn';

// Import Style
import styles from './RushingListItem.css';

function RushingListItem(props) {  
  return (
    <tr className={styles['single-rushing']}>
      {
        rushingColumns.map((col) =>          
          <td key={props.rushing['_id'] + col.name} className={styles['single-rushing']}>{col.displayValue(props.rushing[col.name])}</td>
        )
      }    
    </tr>
  );
}

RushingListItem.propTypes = {
  rushing: PropTypes.shape(getRushingPropTypes()).isRequired,
};

export default RushingListItem;
