import { useState, useEffect } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import PostsList from './PostsList'

// Configuration for StyledFirebaseAuth
const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/signedIn",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
};

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
  return (
    <div>
      <h1>My App</h1>
      <p>
        Welcome {firebase.auth().currentUser.displayName}! You are now
        signed-in!
      </p>
      <PostsList />
      <button className="button" onClick={() => firebase.auth().signOut()}>Sign-out</button>
    </div>
  );
}

export default App;
