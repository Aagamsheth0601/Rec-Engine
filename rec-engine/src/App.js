import "./App.css";
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import Interactive from "./components/interactive";
import About from "./components/about";
import PastRecs from "./components/pastRecs";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const client_id =
  "808665823142-af24qudscmqice38qgpda2mde8qplo20.apps.googleusercontent.com";
const scope = "https://www.googleapis.com/auth/drive";

function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        client_id: client_id,
        scope: scope,
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    <Router>
      {/* <LoginButton />
      <LogoutButton /> */}
      <Navbar />
      <Routes>
        <Interactive path="/" component={Interactive} />
        <Route path="/about" component={About} />
        <Route path="/pastRecs" component={PastRecs} />
      </Routes>
    </Router>
  );
}

export default App;
