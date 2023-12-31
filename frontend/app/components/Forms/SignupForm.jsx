'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
// import Loader from '../components/Icons/Loader';
import axios from 'axios';

const SignupForm = () => {
  const [loading, setLoading] = useState('');

  const router = useRouter();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    phonenumber: '',
    wallet_address: '',
  });

  const [error, setError] = useState(null);
  const user = localStorage.getItem('user');

  // useEffect(() => {
  //   if (user) {
  //     router.push('/collector/dashboard');
  //   }
  // }, []);

  const toastOptions = {
    duration: 8000,
    position: 'bottom-right',
    style: {},
    className: '',
    // icon: '👏',
    iconTheme: {
      primary: 'red',
      secondary: '#fff',
    },
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleValidation = () => {
    const { name, email, phonenumber, wallet_address } = inputs;
    if (
      name === '' &&
      email === '' &&
      phonenumber === '' &&
      wallet_address === ''
    ) {
      toast.error('Fill in all required fields', toastOptions);
      return false;
    } else if (name === '') {
      toast.error('Name is required', toastOptions);
      return false;
    } else if (name.length < 3) {
      toast.error('Name must be more than 3 characters', toastOptions);
      return false;
    } else if (email === '') {
      toast.error('Email is required', toastOptions);
      return false;
    } else if (phonenumber === '') {
      toast.error('Phone Number is required', toastOptions);
      return false;
    } else if (wallet_address === '') {
      toast.error('Address is required', toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (handleValidation()) {
      try {
        const { name, email, phonenumber, wallet_address } = inputs;

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/collectors/auth/register`,
          {
            name,
            email,
            phonenumber,
            wallet_address,
          }
        );

        if (res.data.status === false) {
          toast.error(res.data.msg, toastOptions);
          setTimeout(() => {
            setLoading(false);
          }, 4000);
        } else {
          setLoading(false);

          router.push('/login');
        }
      } catch (err) {
        // toast.error(err, toastOptions);
        console.log(err);
      }
    }
  };

  useEffect(() => {
    router.prefetch('/login');
  }, []);
  return (
    <>
      <Toaster />

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="text-gray-700 font-medium mb-3" htmlFor="name">
            Name<span>*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none"
            name="name"
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="text-gray-700 font-medium mb-3" htmlFor="email">
            Email<span>*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none"
            name="email"
            min="3"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>

        <div className="mb-6 w-full">
          <label
            className="text-gray-700 font-medium mb-3"
            htmlFor="phone_number"
          >
            Phone number<span>*</span>
          </label>
          <input
            id="phone_number"
            type="text"
            className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none transition duration-150 ease-in-out"
            name="phonenumber"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>

        <div className="mb-6 w-full">
          <label
            className="text-gray-700 font-medium mb-3"
            htmlFor="wallet_address"
          >
            Wallet Address<span>*</span>
          </label>
          <input
            id="wallet_address"
            type="text"
            className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none transition duration-150 ease-in-out"
            name="wallet_address"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md bg-[#DD7D37] hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full"
          onClick={handleSubmit}
        >
          {/* {loading === true ? <Loader /> : 'Create Account'} */}
          Create Account
        </button>

        <div className="flex items-center justify-center mt-5">
          <span className="">Already have an account?</span>
          <Link href="/auth/login" className=" text-[#DD7D37] ml-2 underline">
            Sign In
          </Link>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
