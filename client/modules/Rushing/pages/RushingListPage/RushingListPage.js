import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import RushingList from '../../components/RushingList';
import { getRushingPropTypes } from '../../RushingPropTypes';
import rushingColumns from '../../../../../common/RushingColumn';

// Import Actions
import { fetchRushings } from '../../RushingActions';

// Import Selectors
import { getRushings } from '../../RushingReducer';

const FileSaver = require('file-saver');

class RushingListPage extends Component {
  constructor(props) {
    super(props);
    this.playerFilter = '';
    this.sortBy = {
      col: 'yds',
      order: -1
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchRushings(this.playerFilter, this.sortBy));
  }

  getAsCsv(rushings) {
    let csvStr = '';
    for (let j = 0; j < rushingColumns.length; ++j) {
      csvStr += rushingColumns[j].inputName + ', ';
    }
    csvStr += '\n';

    for (let i = 0; i < rushings.length; ++i) {
      for (let j = 0; j < rushingColumns.length; ++j) {
        const colName = rushingColumns[j].name;
        csvStr += rushingColumns[j].displayValue(rushings[i][colName]) + ', ';
      }
      csvStr += '\n';
    }
    return csvStr;
  }

  onSortColChanged(col) {
    if (!col.isSortable) {
      return;
    }

    let isSameCol = false;
    if (this.sortBy.col === col.name) {
      isSameCol = true;
    }
    this.sortBy.col = col.name;

    if (isSameCol) {
      if (this.sortBy.order > 0) {
         this.sortBy.order = -1;
      } else {
         this.sortBy.order = 1;
      }
    }

    this.props.dispatch(fetchRushings(this.playerFilter, this.sortBy));
  }  

  onTextChanged(event) {
    this.playerFilter = event.target.value;
    this.props.dispatch(fetchRushings(this.playerFilter, this.sortBy));
  }

  onButtonClicked() {
    const blob = new Blob([this.getAsCsv(this.props.rushings)], {type: 'text/plain;charset=utf-8'});
    FileSaver.saveAs(blob, 'rushings.csv');
  }

  render() {
    return (
      <div>
        {'Filter by player '}
        <input type='text' id='playerInput' onChange={this.onTextChanged.bind(this)} placeholder='Player name'></input>
        <br>
        </br>
        <button id='downloadCsv' onClick={this.onButtonClicked.bind(this)} value='Download table as CSV'>Download table as CSV</button>
        <RushingList rushings={this.props.rushings} onSortColChanged={this.onSortColChanged.bind(this)} sortBy={this.sortBy}/>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
RushingListPage.need = [() => { return fetchRushings(null, null); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    rushings: getRushings(state),
  };
}

RushingListPage.propTypes = {
  rushings: PropTypes.arrayOf(PropTypes.shape(getRushingPropTypes())).isRequired,
  dispatch: PropTypes.func.isRequired,
};

RushingListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(RushingListPage);
