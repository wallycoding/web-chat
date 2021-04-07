import { useEffect } from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import './App.css';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';

const Auth = props => {
  return (
    <>
      <SignUp onRedirect={props.onRedirect} />
      <SignIn onRedirect={props.onRedirect} />
    </>
  )
}

function App() {

  const hasUserData = () => {
    const exits = window.localStorage.getItem('user-data');
    const url = `http://${window.location.host}/chat/`;
    if (exits && window.location.pathname !== '/chat/') {
      window.location.href = url;
    }
  }

  useEffect(() => {
    hasUserData();
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact>
            <Auth
              onRedirect={hasUserData}
            />
          </Route>
          <Route path="/chat" >
            <Chat />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
