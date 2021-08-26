import clsx from 'clsx';
import React, { Suspense } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './core/history';
import routeOptions from './config/routes.config';

import './App.scss';

const routesList = routeOptions.map((option, index)=>{
  return (<Route key={index} path={option.route} component={option.component} />)
});

const App = () => {
  return (
    <Router history={history}>
      <main className={clsx("main-section")} >
        {/*fallback will be replaced with Spinner Component*/}
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routesList}
          </Switch>
        </Suspense>
      </main>
    </Router>
  )
}

export default App;