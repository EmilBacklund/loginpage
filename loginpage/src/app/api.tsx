import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useRouter } from 'next/router';

// Define your component
const LoginForm = ({ emailState, passwordState }) => {
  const router = useRouter(); // Use useRouter here within a component

  // Now, this onSubmit function can use router because it's defined inside the component
  const onSubmit = async (e, email, password) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        router.push('/home'); // Use router to navigate
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    // Your JSX here. For example, a form that calls onSubmit
    <form onSubmit={(e) => onSubmit(e, emailState, passwordState)}>{/* Your form fields */}</form>
  );
};

export default LoginForm;
