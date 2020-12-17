import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { LoginScreen } from '../components/auth/LoginScreen';
import { useDispatch } from 'react-redux';
import { startChecking } from '../actions/auth';

export const AppRoute = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/' component={CalendarScreen} />
          <Redirect to ='/' />
        </Switch>
      </div>
    </Router>
  );
};
