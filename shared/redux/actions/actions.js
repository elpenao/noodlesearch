import * as ActionTypes from '../constants/constants';
import fetch from 'isomorphic-fetch';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${(process.env.PORT || 8000)}`) : '';

export function search(term) {
  return (dispatch) => {
    return fetch(`${baseURL}/api/search/${term}`).
    then((response) => response.json()).
    then((response) => dispatch(addResults(response.results)));
  };
}

export function addResults(results) {
  return {
    type: ActionTypes.ADD_RESULTS,
    results,
  };
}

export function toggleCrawl(results) {
  return {
    type: ActionTypes.TOGGLE_CRAWL
  };
}

export function crawl(site) {
  return (dispatch) => {
      dispatch(toggleCrawl())
      return fetch(`${baseURL}/api/crawl/`, {
              method: 'post',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  url: site            
              })
            })
            .then((response) => dispatch(toggleCrawl()))
  }
}
