import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';
import NotFound from './components/NotFound';

const HomePage = React.lazy(() => import('./views/home'));
const Country = React.lazy(() => import('./views/country'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={HomePage} />
          <Route path="/country/:countryName" Component={Country} />

          {/* unavailable pages will redirect to this */}
          <Route path="*" Component={NotFound} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
