import { GoogleLogout } from 'react-google-login';

const client_id = "808665823142-af24qudscmqice38qgpda2mde8qplo20.apps.googleusercontent.com";

function Logout() {
  return (
    <div id="signOutButton">
      <GoogleLogout
        client_id={client_id}
        buttonText={"Logout"}
        onLogoutSuccess={(response) => { console.log("Logout Success"); }}
        onFailure={(response) => { console.log(response); }}
      />
    </div>
  )
}

export default Logout;