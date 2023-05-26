import apiClient from './client';

export const fetchCountries = () => apiClient.get('/all');

export const searchByCountryName = (name) => apiClient.get(`/name/${name}`);

export const fetchCountriesByRegion = (region) =>
  apiClient.get(`/region/${region}`);

export const fetchCountryData = (countryCode) =>
  apiClient.get(`/alpha/${countryCode}`);
