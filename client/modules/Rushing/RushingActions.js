import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_RUSHING = 'ADD_RUSHING';
export const ADD_RUSHINGS = 'ADD_RUSHINGS';

// Export Actions
export function addRushing(rushing) {
  return {
    type: ADD_RUSHING,
    rushing,
  };
}

export function addRushings(rushings) {
  return {
    type: ADD_RUSHINGS,
    rushings,
  };
}

// Export Actions
export function fetchRushings(playerFilter, sortBy) {
  let queryStr = '?';
  if (playerFilter) {
    queryStr += 'playerFilter=' + playerFilter;
  }

  if (sortBy && sortBy.hasOwnProperty('col')) {
    if (queryStr.length > 1) {
      queryStr += '&';
    }
    queryStr += 'sortBy[col]=' + sortBy.col;
    if (sortBy.hasOwnProperty('order')) {
      queryStr += '&sortBy[order]=' + sortBy.order;
    }
  }

  //console.log('queryStr: ', queryStr);

  return (dispatch) => {
    return callApi('rushings' + queryStr).then(res => {
      //console.log('res.rushings: ', res.rushings);
      dispatch(addRushings(res.rushings));
    });
  };
}

export function fetchRushing(cuid) {
  return (dispatch) => {
    return callApi(`rushings/${cuid}`).then(res => dispatch(addRushing(res.rushing)));
  };
}