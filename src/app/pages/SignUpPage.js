import { useState } from 'react';
import { Redirect } from "react-router-dom";
import { BaseLayout } from '../layouts';
import { useAuth } from '../contexts/firebase/auth.context';
import firebase from "firebase/app";
import { SignUpPopUp } from "../components/layout";
import { HomePage } from '../pages';
const SignUpPage = () => {

  const [signInForm, setSignInForm] = useState({
    txtEmail: '',
    txtPassword: ''
  });
  const {currentUser} = useAuth();
  const handleInputChange = async (ev) => {
    setSignInForm({
      ...signInForm,
      [ev.target.name]: ev.target.value
    })
  };
  const createUser = (e) => {
    e.preventDefault()
      firebase.auth().createUserWithEmailAndPassword(signInForm.txtEmail, signInForm.txtPassword).then(function(value) {
      <Redirect to={HomePage} />
    }).catch(function(error) {
      console.log(error);
    });
  }
  return (
    <BaseLayout>
      {!!currentUser === false &&
        <SignUpPopUp 
        handleSubmit={createUser} 
        handleInputChange={handleInputChange} 
        signInForm={[signInForm.txtEmail, signInForm.txtPassword]}
        />
      }
        {!!currentUser === true && 
          <div>
            <Redirect to={HomePage}/>
          </div>
        }
  </BaseLayout>
  );
};

export default SignUpPage;