import axios from 'axios';

const baseURL = "https://service-appsbussiness.herokuapp.com/";

export default {
  
  authorize: async (url, email) => {
    const requestURL = baseURL + url + "?email=" + email;
    try {
      const response = await axios.get(requestURL);
      const data = await response.json();
      return data;
    } catch (error) {
      return {
        errorMessage: error.message
      };
    }
  },

  doFetch: async (url, body) => {
    let reqBody = null;
    if (!body) {
      reqBody = "";
    } else {
      reqBody = body;
    }

    const requestURL = baseURL + url;

    const httpOptions = {
      json: {
        request: reqBody
      },
      timeout: 2000
    };

    try {
      const response = await axios.post(requestURL, httpOptions);
      const data = await response.json();
      return data;
    } catch (error) {
      return {
        errorMessage: error.message
      };
    }
  }
};
