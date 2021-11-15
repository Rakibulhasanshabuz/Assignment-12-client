import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Components/Login/Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [authArror, setauthArror] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);

    const auth = getAuth();

    const googleProvider = new GoogleAuthProvider();

    const registerUser = (email, password, name, history) => {
      setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setauthArror(' ');
            const newUser = {email, displayName: name};
            setUser(newUser);
            saveUser(email, name, 'POST');
            updateProfile(auth.currentUser, {
              displayName: name
            }).then(() => {
            }).catch((error) => {
            });
            
            history.replace('/')
          })
          .catch((error) => {
            setauthArror (error.message);
          })
          .finally(() => setIsLoading(false));
    }

    const loginUser = (email, password, location, history) => {
      setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const destination = location?.state?.from || '/';
    history.replace(destination)
    setauthArror(' ')
  })
  .catch((error) => {
    setauthArror (error.message);
  })
  .finally(() => setIsLoading(false));;
    }

    const signInUsingGoogle = (location, history) => {
      setIsLoading(true);
      signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        saveUser(user.email, user.displayName, 'PUT');
        setauthArror(' ')
        const destination = location?.state?.from || '/';
    history.replace(destination)
      })
      .catch((error) => {
        setauthArror(error.message)
      })
     .finally(() => setIsLoading(false));
  }

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user)
            } else {
             setUser({});
            }
            setIsLoading(false);
          });
          return () => unsubscribed;
    }, []);

    useEffect(() => {
      fetch(`https://immense-beach-83799.herokuapp.com/users/${user.email}`)
      .then(res => res.json())
      .then(data => setAdmin(data.admin))
    }, [user.email])

    const logOut =() => {
      setIsLoading(true)
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          })
          .finally(() => setIsLoading(false));
    }

    const saveUser = (email, displayName, method) => {
      const user = {email, displayName};
      fetch('https://immense-beach-83799.herokuapp.com/users', {
        method: method,
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then()
    }

    return {
        user,
        admin,
        isLoading,
        authArror,
        registerUser,
        loginUser,
        signInUsingGoogle,
        logOut
    }
}


export default useFirebase;