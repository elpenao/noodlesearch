import * as ActionTypes from '../constants/constants';

const initialState = { crawling: false, results: [] };

const Reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionTypes.ADD_RESULTS :
      return {
        results: action.results
      };

    case ActionTypes.TOGGLE_CRAWL:
      return {
        results: state.results,
        crawling: !state.crawling
      };

    default:
      return state;
  }
};

export default Reducer;
