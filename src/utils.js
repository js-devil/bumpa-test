export const regions = ['africa', 'america', 'asia', 'europe', 'oceania'];

const getCurrency = ({ currencies }) => {
  if (!currencies) return '';

  const keys = Object.keys(currencies);
  if (keys && keys.length) {
    const { name } = currencies[keys[0]];
    return name;
  }

  return '';
};

export function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

const formatAmount = (amt) => parseFloat(amt).toLocaleString('en');

export const extractCountryData = (country) => {
  const {
    population,
    region,
    capital,
    name,
    flags,
    continents,
    coatOfArms,
    subregion,
    cca2: iso2,
    cca3: iso3,
    timezones,
    borders,
  } = country;
  const flag = flags.svg;

  const nameOfCountry = name.common;
  const full_name = name.official;

  const currency = getCurrency(country);
  const mapLink = country.maps.googleMaps;
  const continent = (continents || []).join(', ');
  const timezone = (timezones || []).join(', ');

  const coatOfArm = (coatOfArms || {}).svg;
  const capitalOfCountry = (capital || []).join(',');

  return {
    population: formatAmount(population || 0),
    region,
    name: nameOfCountry,
    full_name,
    flag,
    currency,
    map: mapLink,
    continent,
    coat_of_arms: coatOfArm,
    capital: capitalOfCountry,
    iso2,
    iso3,
    subregion,
    timezone,
    borders,
  };
};
