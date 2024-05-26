import {getNextUrl_action} from '.';
import store from './store';

export const getNextUrl = (response: Response) => {
  const dispatch = store.dispatch;
  const linkHeader = response.headers.get('link');
  if (linkHeader) {
    // regex to find the next URL
    const match = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
    if (match) {
      const nextUrl = match[1];
      dispatch(getNextUrl_action(nextUrl));
    } else {
      console.log('Next URL not found in Link header.');
    }
  } else {
    console.log('No Link header found in response.');
  }
};
