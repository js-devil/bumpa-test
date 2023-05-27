import React from 'react';
import './styles.scss';

function EmptyState({ children }) {
  return (
    <div className="notFound">
      <div className="notFound__image">
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>

      <div className="notFound__content">{children}</div>
    </div>
  );
}

export default EmptyState;
