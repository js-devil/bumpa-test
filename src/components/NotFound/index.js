import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function NotFound() {
  return (
    <main>
      <div class="gif">
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>

      <div class="content">
        <h1>This page is unavailable</h1>
        <p>
          ...maybe the page you're looking for is not found or never existed.
        </p>

        <Link to="/">
          <button>
            Back to home <i class="far fa-hand-point-right"></i>
          </button>
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
