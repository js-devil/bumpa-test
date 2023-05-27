import React from 'react';
import EmptyState from '../components/ui/EmptyState';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <EmptyState>
    <h1>This page is unavailable</h1>
    <p>...maybe the page you're looking for is not found or never existed.</p>

    <Link to="/">
      <button>Back to home</button>
    </Link>
  </EmptyState>
);

export default NotFound;
