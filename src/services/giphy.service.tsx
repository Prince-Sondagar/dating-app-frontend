import axios from 'axios';

const API_KEY = 'UCaKWn3Scm4fMlDJ5DGy3ajnYlt2gFQ4'; // Use your own API KEY
const ENDPOINT = 'https://api.giphy.com/v1/gifs';

export default class GiphyService {
  static search(query: string) {
    return axios.get(
      `${ENDPOINT}/search`,
      {
        params: {
          api_key: API_KEY,
          q: query
        }
      }
    );
  }

  static trending()  {
    return axios.get(
      `${ENDPOINT}/trending`,
      {
        params: {
          api_key: API_KEY
        }
      }
    );
  }
}
