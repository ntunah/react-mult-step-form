import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import FirstStep from '../components/steps/FirstStep';
import SecondStep from '../components/steps/SecondStep';
import ThirdStep from '../components/steps/ThirdStep';

const AppRouter = () => {
  const [userData, setUserData] = React.useState({});
  const updateUserData = data => {
    setUserData(prevUser => ({
      ...prevUser,
      ...data
    }));
  };

  const resetUserData = () => {
    setUserData({});
  };

  return (
    <BrowserRouter>
        <Header />
        <div className="container">
        <Switch>
          <Route
            render={props => (
              <FirstStep
                {...props}
                userData={userData}
                updateUserData={updateUserData}
              />
            )}
            path="/"
            exact={true}
          />
          <Route
            render={props => (
              <SecondStep
                {...props}
                userData={userData}
                updateUserData={updateUserData}
              />
            )}
            path="/second"
          />
          <Route
            render={props => (
              <ThirdStep
                {...props}
                userData={userData}
                updateUserData={updateUserData}
              />
            )}
            path="/third"
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
