import React from 'react';
import './styles.scss';
import { extractCountryData } from '../../../utils';

const Card = ({ country = {}, goToCountry }) => {
  const extractedCountry = extractCountryData(country);

  const selectCard = () =>
    goToCountry({
      countryName: extractedCountry.name,
      countryCode: extractedCountry.iso2,
    });

  return (
    <div className="card" onClick={selectCard}>
      <div className="card__image">
        <img
          src={extractedCountry.flag}
          alt={`${extractedCountry.name} flag`}
        />
      </div>

      <div className="card__content">
        <h2 className="card__content--title">{extractedCountry.name}</h2>
        <p>
          <span>Population:</span>
          {extractedCountry.population}
        </p>

        <p>
          <span>Region:</span>
          {extractedCountry.region}
        </p>

        <p>
          <span>Capital:</span>
          {extractedCountry.capital}
        </p>
      </div>
    </div>
  );
};

export default Card;
