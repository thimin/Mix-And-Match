import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/accounts-management/OAuth';


export default function SignUp() {
  const [formData, setFormData] = useState({});
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  const validateForm = () => {
    const { username, email, password } = formData;

    if (!username || username.trim() === '') {
      return 'Username is required';
    }

    if (!email || email.trim() === '') {
      return 'Email is required';
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format';
    }

    if (!password || password.trim() === '') {
      return 'Password is required';
    }

    // Password strength validation (at least 6 characters)
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    return null; // No errors
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    // Validate the form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }


    try {
      setLoading(true);
      const res = await fetch('http://localhost:8070/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
       console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
        setLoading(false);
       setError(null);
       navigate('/login');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };


  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/login'}>
          <span className='text-blue-700'>Login</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
