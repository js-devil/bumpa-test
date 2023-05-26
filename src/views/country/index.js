import React from 'react';
import './styles.css';
import { useParams } from 'react-router-dom';

const Country = () => {
  let { countryName } = useParams();

  return <div>{countryName}</div>;
};

export default Country;
