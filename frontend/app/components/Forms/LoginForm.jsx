'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// import { useDispatch, useSelector } from 'react-redux';
// import Loader from '../components/Icons/Loader';
// import { login } from '../state/apiCalls/userCalls';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginForm = () => {
  const user = localStorage.getItem('user');
  // const state = {
  //     email: '',
  //     username: '',
  //     password: '',

  //     errors: {},
  //   };
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState('');
  // redirect authenticated user to profile screen

  const toastOptions = {
    duration: 8000,
    position: 'top-center',
    // Styling
    style: {},
    className: '',
    // Custom Icon
    icon: '👏',
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: 'red',
      secondary: '#fff',
    },
    // Aria
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  };

  // const {isFetching, error } = useSelector((state) => state.user);

  // const { loading, currentUser, error } = useSelector((state) => state.user)
//   const dispatch = useDispatch();
  useEffect(() => {
    router.prefetch('/collector/dashboard');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/collectors/auth/login`,
        {
          email,
        }
      );
      if (res.data.status === true) {
        toast.success(res.data.msg, toastOptions);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setLoading(false);
        setEmail('');

        setTimeout(() => {
          router.push('/collector/dashboard');
        }, 3000);
      } else {
        toast.error(res.data.msg, toastOptions);
        setError(true);

        setTimeout(() => {
          setLoading(false);
        }, 4000);
      }
    } catch (err) {
      console.log(err);
    }
  };
//   useEffect(() => {
//     if (user) {
//       router.push('/collector/dashboard');
//     }
//   }, []);
  return (
    <>
      <Toaster />

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="text-gray-700 font-medium mb-3" htmlFor="email">
            Email<span>*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className={`block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border ${
              error
                ? 'border-red-700 focus:border-red-700'
                : 'border-gray-200 focus:border-gray-300'
            }   rounded-md focus:outline-none`}
            name="email"
            min="3"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md bg-[#DD7D37] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full h-12"
          onClick={handleSubmit}
        >
          {/* {loading === true ? <Loader /> : 'Log In'} */}
          Log In
        </button>

        <div className="flex items-center justify-center mt-5">
          <span className="">Don't have an account?</span>
          <Link href="/auth/signup" className=" text-[#DD7D37] ml-2 underline">
            Sign Up
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
