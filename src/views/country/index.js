import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { AppContext } from '../../App';
import EmptyState from '../../components/ui/EmptyState';
import Layout from '../../components/layouts/Layout';
import Loader from '../../components/ui/Loader';

import { extractCountryData, isValidHttpUrl } from '../../utils';
import { fetchCountryData } from '../../api/utils';

import './styles.scss';

const Country = () => {
  let { countryCode } = useParams();

  const { storeDataValue, dispatch } = useContext(AppContext);
  const { countries } = storeDataValue;

  const [loading, setLoader] = useState(true);
  const [country, setCountry] = useState(null);

  const getCountries = async (data) => {
    setLoader(true);

    try {
      const res = await fetchCountryData(countryCode);
      const countryObj = res.data[0];

      updateCountry(countryObj);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  const updateCountry = (countryObj) => {
    setCountry(countryObj);
    setLoader(false);

    const c = extractCountryData(countryObj);
    dispatch({ type: 'SET_COUNTRY_NAME', value: c.name });
  };

  useEffect(() => {
    if (countries && countries.length) {
      const countryObj = countries.find(
        (c) => extractCountryData(c).iso2 === countryCode
      );

      updateCountry(countryObj);
      return;
    }

    getCountries();
  }, [countries, countryCode]);

  if (loading) {
    return <Loader />;
  }

  if (!country) {
    return (
      <EmptyState>
        <h1>There is no data available on {countryCode}</h1>
        <p>...maybe this country does not exist or spelt incorrectly</p>

        <Link to="/">
          <button>Back to home</button>
        </Link>
      </EmptyState>
    );
  }

  const formatPropTitle = (prop = '') => {
    if (prop.includes('iso')) return String(prop).toUpperCase();

    return String(prop).split('_').join(' ');
  };

  const extractedCountry = extractCountryData(country);
  const fieldsToHide = ['flag'];
  const countryFields = Object.keys(extractedCountry).filter(
    (key) => !fieldsToHide.includes(key)
  );

  return (
    <Layout>
      <div className="country">
        <div className="country__flag">
          <h1>{extractedCountry.full_name}</h1>

          <div>
            <img src={extractedCountry.flag} alt={`${countryCode} flag`} />
          </div>

          <Link to="/">
            <button>Back to home</button>
          </Link>
        </div>

        <div className="country__details">
          <>
            {countryFields.map((prop) => {
              const value = extractedCountry[prop];
              const isURL = isValidHttpUrl(value);
              const title = formatPropTitle(prop);

              if (isURL) {
                return (
                  <div>
                    <span>Map</span>
                    <p>
                      <a href={value} target="_blank">
                        View {title}
                      </a>
                    </p>
                  </div>
                );
              }

              if (prop === 'borders') {
                return (
                  <div key={prop} data-prop={prop}>
                    <span className="text--capitalize">
                      Bordering Countries
                    </span>
                    <p>
                      {value && value.length
                        ? (value || []).map((iso2) => (
                            <Link
                              className="text--uppercase text--bold"
                              to={`/country/${iso2}`}
                            >
                              {iso2}
                            </Link>
                          ))
                        : 'N/A'}
                    </p>
                  </div>
                );
              }

              return (
                <div key={prop}>
                  <span className="text--capitalize">{title}</span>
                  <p>{value || 'N/A'}</p>
                </div>
              );
            })}
          </>
        </div>
      </div>
    </Layout>
  );
};

export default Country;
