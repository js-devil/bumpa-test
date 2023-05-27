import React, { useEffect, useState } from 'react';
import useDebounce from '../../../../hooks/useDebounce';
import './styles.scss';

const SearchInput = ({ onSearch, value = '', ...attrs }) => {
  const [searchValue, setValue] = useState(value);
  const debouncedValue = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (debouncedValue && value !== debouncedValue) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue]);

  const onInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="input">
      <span>
        <svg
          className="svg-icon search-icon"
          aria-labelledby="title desc"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 19.9 19.7"
        >
          <title id="title">Search Icon</title>
          <desc id="desc">A magnifying glass icon.</desc>
          <g className="search-path" fill="none" stroke="#848F91">
            <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
            <circle cx="8" cy="8" r="7" />
          </g>
        </svg>
      </span>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => onInput(e)}
        {...attrs}
      />
    </div>
  );
};

export default SearchInput;
