import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { handleGoogleSignIn, handleSignOut, initializeLoginFramework,createUserWithEmailAndPassword
  ,signInWithEmailAndPassword } from "./loginManager";
//Module 42 video 8 is not implemented here.

function Login() {
  const [newUser,setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });
  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let {from} = location.state || {from:{pathname: "/"}};

  const googleSignIn = () =>{
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res,true)
    })
  }

  const signOut = () =>{
    handleSignOut()
    .then(res=>{
    handleResponse(res,false);
    })
  }
   
  const handleResponse = (res,redirect,)=>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }

  const handleBlur = (event) => {
    let isFieldValid;
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then(res => {
        handleResponse(res,true);
      })
    }
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email,user.password)
      .then(res =>{
        handleResponse(res,true);
      })
    }

    event.preventDefault();
  };


  return (
    <div style= {{textAlign:'center'}}>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={googleSignIn}>Sign in</button>
      )}
      <br></br>
      <button>Sign in using facebook</button>
      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email : {user.email}</p>
          <img src={user.photo} alt=""></img>
        </div>
      )}
      <h1>Our own authentication system</h1>
      <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Signup</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleBlur}
            required
            placeholder="Your Name"
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="Email Address"
          required
        ></input>
        <br></br>
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="Enter your password"
          required
        ></input>
        <br></br>
        <input type="submit" value="Submit"></input>
        <input type="submit" value={newUser? 'Sign Up' : 'Sign In'}></input>
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && <p style={{ color: "green" }}>User {newUser?'Created':'logged in'}</p>}
    </div>
  );
}

export default Login;
