import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { BaseLayout } from '../layouts';
import { useAuth } from '../contexts/firebase/auth.context';
import { SignInPopUp } from "../components/layout";

const SignInPage = ({children}) => {
  const history = useHistory();
  const [signInForm, setSignInForm] = useState({
    txtEmail: '',
    txtPassword: ''
  });
  const {currentUser,signInWithEmailAndPassword,signOut} = useAuth();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const result = await signInWithEmailAndPassword(signInForm.txtEmail, signInForm.txtPassword);
    if (result) {
      history.goBack();
    }    
  }

  const handleInputChange = async (ev) => {
    setSignInForm({
      ...signInForm,
      [ev.target.name]: ev.target.value
    })
  };

  return (
    <BaseLayout>
      {!!currentUser === false &&
        <SignInPopUp 
        handleSubmit={handleSubmit} 
        handleInputChange={handleInputChange} 
        signInForm={[signInForm.txtEmail, signInForm.txtPassword]}
        />
      }
        {!!currentUser === true && 
          <div>
            <img src={currentUser.photoURL} alt={currentUser.email} />
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        }
  </BaseLayout>
  );
};

export default SignInPage;