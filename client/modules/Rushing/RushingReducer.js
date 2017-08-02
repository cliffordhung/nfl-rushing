import { ADD_RUSHING, ADD_RUSHINGS } from './RushingActions';

// Initial State
const initialState = { data: [] };

const RushingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RUSHING :
      return {
        data: [action.rushing, ...state.data],
      };

    case ADD_RUSHINGS :
      return {
        data: action.rushings,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all rushings
export const getRushings = state => state.rushings.data;

// Get rushing by cuid
export const getRushing = (state, cuid) => state.rushings.data.filter(rushing => rushing.cuid === cuid)[0];

// Export Reducer
export default RushingReducer;
