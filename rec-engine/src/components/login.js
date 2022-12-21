import { GoogleLogin } from 'react-google-login';

const client_id = "808665823142-af24qudscmqice38qgpda2mde8qplo20.apps.googleusercontent.com";

function Login() {
  const onSuccess = (res) => {
    console.log("SUCCESS", res);
  }

  const onFailure = (err) => {
    console.log("ERROR", err);
  }

  return (
    <div id="signInButton">
      <GoogleLogin
        client_id={client_id}
        buttonText={"Login"}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  )
}

export default Login;