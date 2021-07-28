import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import FirstStep from '../components/steps/FirstStep';
import SecondStep from "../components/steps/SecondStep"

const AppRouter = () => (
  <BrowserRouter>
<div className="container">
<Header />
    <Switch>
      <Route component={FirstStep} path="/" exact={true} />
      <Route component={SecondStep} path="/second" />
    </Switch>
</div>
  </BrowserRouter>
);

export default AppRouter;
