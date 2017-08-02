import React, { PropTypes } from 'react';

// Import Components
import RushingListItem from './RushingListItem/RushingListItem';
import { getRushingPropTypes } from '../RushingPropTypes';
import rushingColumns from '../../../../common/RushingColumn';

// Import Style
import styles from './RushingListItem/RushingListItem.css';

function RushingList(props) {
  return (
    <table>
      <thead>
        <tr className={styles['single-rushing']}>
          {
            rushingColumns.map((col) => {
              let sortCaret = '';
              if (col.isSortable && props.sortBy.col === col.name) {
                if (props.sortBy.order > 0) {
                  sortCaret = ' (asc)';
                } else {
                  sortCaret = ' (desc)';
                }
              }
              return (<td
                        key={col.name} className={col.isSortable ? styles['rushing-header-sortable'] : styles['rushing-header']}
                        onClick={props.onSortColChanged.bind(null, col)}>{col.inputName}{sortCaret}
                      </td>);
            })
          }
        </tr>
      </thead>
      <tbody>
      {
        props.rushings.map(rushing => (
          <RushingListItem
            rushing={rushing}
            key={rushing._id}
          />
        ))
      }
      </tbody>
    </table>
  );
}

RushingList.propTypes = {
  rushings: PropTypes.arrayOf(PropTypes.shape(getRushingPropTypes())).isRequired,
  onSortColChanged: PropTypes.func.isRequired,
  sortBy: PropTypes.object.isRequired,
};

export default RushingList;
