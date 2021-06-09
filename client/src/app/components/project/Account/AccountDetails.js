import { useAuth } from '../../../contexts/firebase/auth.context';
import { useState, } from 'react';
import styles from './Account.module.scss'
import { NotFoundPage } from '../../../pages';
const AccountDetails = () => {
  const {currentUser} = useAuth();
  const [userInfo, setuserInfo] = useState({
    txtName: (!!currentUser !== false ? currentUser.displayName : ''),
    photoURL: (!!currentUser !== false ? currentUser.photoURL : ''),
    email: (!!currentUser !== false ? currentUser.email : ''),
    phone: (!!currentUser !== false ? currentUser.phoneNumber : 0)
  });
  console.log(currentUser)

  const handleSubmit = async (ev) => {
    console.log('handled submit')
  console.log(currentUser)
  
  
  
  // ev.preventDefault();

  currentUser.updateProfile({
    photoURL: userInfo.photoURL,
    displayName: userInfo.txtName,
    phoneNumber: userInfo.phone,
  }).then(function() {
      console.log("Changes Saved!")
    }).catch(function(error) {
      console.log("error updating profile, please try again later")
    });
    currentUser.updateEmail(userInfo.email)
    
      
  };

  const handleInputChange = async (ev) => {
    console.log(ev.target.value)
    setuserInfo({
      ...userInfo,
      [ev.target.name]: ev.target.value
    })
  };

return(
  <div className={styles.account}>
    {!!currentUser === true &&
              <form onSubmit={(ev) => handleSubmit(ev)}>
                <div className={styles.image}>
                <img src={currentUser.photoURL}></img>
                <h2>{currentUser.displayName}</h2>
                </div>
                
                <div  className={styles.input_container} >
                  <label htmlFor="txtName">User name</label>
                  <input type="text" placeholder={"current Name:" + " " + currentUser.displayName} className={styles.input} id="txtName" name="txtName"  aria-describedby="emailHelp"    onChange={handleInputChange} value={userInfo.txtName} />
                </div>

                <div  className={styles.input_container}>
                  <label htmlFor="avatar">Profile avatar</label>
                  <input  className={styles.input} type="text" id="avatar" placeholder="upload new photo by URL" name="photoURL" aria-describedby="emailHelp" onChange={handleInputChange} value={userInfo.photoURL} />
                  </div>

                  <div  className={styles.input_container}>
                  <label htmlFor="email">Profile email</label>
                  <input  className={styles.input} type="text" id="email" placeholder="Change email" name="email" aria-describedby="emailHelp" onChange={handleInputChange} value={userInfo.email} />
                  </div>

                  <div  className={styles.input_container}>
                  <label htmlFor="phoneNumber">phoneNumber</label>
                  <input  className={styles.input} type="number" id="phoneNumber" placeholder="phoneNumber" name="phoneNumber" aria-describedby="emailHelp" onChange={handleInputChange} value={userInfo.phone === null ? '' : userInfo.phone} />
                  </div>
                  
                  <div className={styles.button}>
                <button type="submit">Save Changes!</button>
                    </div>
              </form>
    } {!!currentUser === false &&
      < NotFoundPage/>
    }
  </div>
)
};

export default AccountDetails;