import React, { useCallback, useContext, useEffect, useState } from 'react';
import './styles.scss';

import { useNavigate } from 'react-router-dom';

import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';

import Layout from '../../components/layouts/Layout';
import {
  fetchCountries,
  fetchCountriesByName,
  fetchCountriesByRegion,
} from '../../api/utils';

import SearchInput from '../../components/ui/forms/SearchInput';
import BaseSelect from '../../components/ui/forms/Select';

import { regions } from '../../utils';
import EmptyState from '../../components/ui/EmptyState';
import { AppContext } from '../../App';

const HomePage = () => {
  const [country, setCountry] = useState({ name: '', region: '' });
  const [countryList, setCountryList] = useState([]);
  const [loading, setLoader] = useState(true);
  const navigate = useNavigate();
  const { storeDataValue, dispatch } = useContext(AppContext);

  const getCountries = async (data) => {
    setLoader(true);

    let property = '';
    let value = '';
    if (data) {
      setCountry((country) => ({ ...country, ...data }));
      property = Object.keys(data)[0];
      value = data[property];
    }

    let func = fetchCountries();
    if (value && value.length) {
      if (property === 'region') {
        func = fetchCountriesByRegion(value);
      } else if (property === 'name') {
        func = fetchCountriesByName(value);
      }
    }

    try {
      const res = await func;
      const countries = res.data;

      // set country list
      setCountryList(countries);
      setLoader(false);

      if (!storeDataValue.countries.length) {
        // set countries in state
        dispatch({ type: 'SET_COUNTRIES', value: countries });
      }
    } catch (error) {
      setCountryList([]);
    } finally {
      setLoader(false);
    }
  };

  const getCountryList = useCallback(getCountries, []);
  useEffect(() => {
    getCountryList();
  }, []);

  if (loading || !countryList) {
    return <Loader />;
  }

  const redirectToCountry = ({ countryName = null, countryCode = null }) => {
    if (!countryName) return;

    dispatch({ type: 'SET_COUNTRY_NAME', value: countryName });

    navigate(`/country/${countryCode}`);
  };

  const clearFilters = () => {
    setCountry(() => ({ name: '', region: '' }));
    getCountryList();
  };

  if (!countryList.length) {
    return (
      <EmptyState>
        {!country.name || !country.region ? (
          <>
            <h1>No match was for this country</h1>
            <p>...maybe this country does not exist or spelt incorrectly</p>

            <button onClick={clearFilters}>Try again</button>
          </>
        ) : (
          <>
            <h1>No data available on countries</h1>
            <p>An error occured while getting the list of countries</p>

            <button onClick={clearFilters}>Refresh</button>
          </>
        )}
      </EmptyState>
    );
  }

  return (
    <Layout>
      <div className="countries">
        <div className="countries__filter">
          <SearchInput
            onSearch={(name) => getCountryList({ name })}
            value={country.name}
            placeholder="Search for a country..."
          />

          <BaseSelect
            options={regions}
            select={(region) => getCountryList({ region })}
            placeholder="Filter by Region"
            value={country.region}
          />
        </div>

        <div className="countries__list">
          {(countryList || []).map((country) => (
            <Card
              country={country}
              key={country.cca3}
              goToCountry={redirectToCountry}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
