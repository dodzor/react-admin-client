import React from 'react'
import { Admin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import ChannelsList from './components/ChannelsList'
import authProvider from './authProvider'
import { fetchUtils } from 'ra-core';

// Base URL of your API
const apiUrl = 'https://iptvapi-devrg8.rcs-rds.ro/api';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }

  // Check if there's an authentication token (e.g., JWT) in local storage
  const token = localStorage.getItem('token');

  // Set the Authorization header with the token
  if (token) {
    options.headers.set('Authorization', `Basic ${token}`);
  }

  const response = fetchUtils.fetchJson(url, options);
  return response;
};

const customRestProvider = restProvider(apiUrl, httpClient);

// Override the getList method to format the response
const customDataProvider = {
  ...customRestProvider,
  getList: (resource, params) => {
    // if (params.pagination) {
    //   const { page, perPage } = params.pagination;
    //   const rangeStart = (page - 1) * perPage;
    //   const rangeEnd = page * perPage - 1;
    //   params.headers = new Headers({
    //       'Range': `items=${rangeStart}-${rangeEnd}`,
    //   });
    // }

      // Forward the request to the original dataProvider
      return customRestProvider.getList(resource, params)
          .then((response) => {
            console.log(response.data.data)
              // Transform the response to match React-admin's expected format
            if (response.data) {
                return {
                    data: response.data.data[0],
                    // total: parseInt(params.headers.get('Content-range').split('/').pop(), 10),
                    // total: response.data.total
                    total: response.data.data[0].length
                };
            } else {
                // Handle the case where data is missing in the response
                return {
                    data: [],
                    total: 0, // Set a default total if data is missing
                };
            }
          });
  },
};

function App() { 
  // return <Admin dataProvider={restProvider(apiUrl)}>
  return <Admin dataProvider={customDataProvider}
                authProvider={authProvider} // Pass the authProvider here
    >
    <Resource name="channels" list={ChannelsList}></Resource>
  </Admin>
}

export default App;
