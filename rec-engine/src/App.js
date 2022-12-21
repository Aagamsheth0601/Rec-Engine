import './App.css';
import LoginButton from './components/login';
import LogoutButton from './components/logout';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const client_id = "808665823142-af24qudscmqice38qgpda2mde8qplo20.apps.googleusercontent.com";
const scope = "https://www.googleapis.com/auth/drive";

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        client_id: client_id,
        scope: scope
      })
    }
    gapi.load('client:auth2', start);
  })


  return (
    <div className="App">
      <LoginButton />
      <LogoutButton />
    </div>
  );
}

export default App;
