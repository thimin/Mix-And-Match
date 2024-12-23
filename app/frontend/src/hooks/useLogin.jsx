// import { useState } from 'react';
// import { useAuthContext } from './useAuthContext';

// export const useLogin = () => {
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const { dispatch } = useAuthContext();

//   const login = async (email, password) => {
//     setIsLoading(true);
//     setError(null);

//     const response = await fetch('http://localhost:8070/api/user/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password })
//     });

//     const json = await response.json();

//     if (!response.ok) {
//       setIsLoading(false);
//       setError(json.error);
//       return false; // Return false if login fails
//     }

//     if (response.ok) {
//       // Save the user to local storage
//       localStorage.setItem('user', JSON.stringify(json));

//       // Update the auth context
//       dispatch({ type: 'LOGIN', payload: json });

//       setIsLoading(false);
//       return true; // Return true if login succeeds
//     }
//   };

//   return { login, isLoading, error };
// };
