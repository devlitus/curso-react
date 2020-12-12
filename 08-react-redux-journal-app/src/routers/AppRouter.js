import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { firebase } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { PrivateRouter } from './PrivateRouter';
import { PublicRoute } from './PublicRoute';
import { startLoadingNote } from '../actions/notes';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoading] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoading(true);
        dispatch(startLoadingNote(user.uid));
      } else {
        setIsLoading(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoading]);
  if (checking) {
    return <h1>Wait...</h1>;
  }
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute isAuthenticated={isLoggedIn} path='/auth' component={AuthRouter} />

          <PrivateRouter exact isAuthenticated={isLoggedIn} path='/' component={JournalScreen} />

          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  );
};
