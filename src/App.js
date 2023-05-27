import React, { Suspense, useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Loader from './components/ui/Loader';
import routes from './routes';
import NotFound from './views/not-found';

// Context API
import reducer from './store/reducer';
import { storeData } from './store';

export const AppContext = React.createContext();

function App() {
  const [storeDataValue, dispatch] = useReducer(reducer, storeData);

  return (
    <Suspense fallback={<Loader />}>
      <AppContext.Provider value={{ storeDataValue, dispatch }}>
        <Router>
          <Routes>
            {routes.map(({ path, name, exact, component: routeComp }) => (
              <Route
                key={path}
                exact={exact || false}
                Component={routeComp}
                path={path}
              />
            ))}

            {/* Handles 404 - Not Found */}
            <Route path="*" Component={NotFound} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </Suspense>
  );
}

export default App;
