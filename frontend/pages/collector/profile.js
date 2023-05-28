import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../components/Icons/Loader';

import {
  findProfile,
  newProfile,
  getCollectionLocations,
} from '../../utils/utils';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import Waiting from '../../components/Waiting';
import UserLayout from '../../components/UserLayout/Layout';
import Head from 'next/head';

const profile = () => {
  const [loading, setLoading] = useState('');
  const [user, setUser] = useState();

  const currentYear = new Date().getFullYear();

  const router = useRouter();
  const [inputs, setInputs] = useState({
    phone: '',
    name: '',
    email: '',
    wallet_address: '',
    location: '',
  });

  const [locations, setLocations] = useState([]);

  const toastOptions = {
    duration: 8000,
    position: 'top-right',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/collectors/${address}/save`,
      {
        method: 'POST',
        body: JSON.stringify(inputs),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (res.ok) {
      toast.success('Profile Updated', toastOptions);
    }

    setLoading(false);
  };

  const {
    wallet,
    address,
    connected,
    select,
    connect,
    disconnect,
    signMessage,
    signTransaction,
  } = useWallet();

  const getUser = async () => {
    const profile = await findProfile(address, 'collectors');

    if (profile.status) {
      setUser(profile.data);
      setInputs({ ...inputs, ...profile.data });
    } else {
      const profile = await newProfile(address, 'collectors');

      setUser(profile.data);
      setInputs({ ...inputs, ...profile.data });
    }
  };

  const getLocations = async () => {
    const locations = await getCollectionLocations();

    setLocations(locations.data);
    // setCenters(centers.collection_centers);
  };

  useEffect(() => {
    if (address) {
      getUser();
    }

    getLocations();
  }, [address]);

  return (
    <div>
      <Head>
        <title>Ecomarket | Collector Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Ecomarket Collector Profile" />
      </Head>

      <Toaster />

      <UserLayout>
        {user ? (
          <section className="">
            <div className="  h-full">
              <div className="flex justify-between items-center h-full g-6 text-gray-800">
                <div className=" w-full  bg-white  px-4 md:px-[60px] lg:px-[80px] pt-[50px] pb-7 scrollbar">
                  <div className="max-w-[600px] mx-auto py-12 shadow px-12">
                    <div className="mb-10 text-left">
                      <h3 className="text-2xl font-semibold text-gray-700 capitalize  mb-3">
                        Fill your Profile
                      </h3>
                      <p className="mt-3 text-gray-500 ">
                        Earn TRX by help cleaning the ecosystem of plastics
                      </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-6">
                        <label
                          className="text-gray-700 font-medium mb-3"
                          htmlFor="name"
                        >
                          Name<span>*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          defaultValue={user.name}
                          onChange={(e) => {
                            setInputs({
                              ...inputs,
                              name: e.target.value,
                            });
                          }}
                          className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none"
                          required
                        />
                      </div>

                      <div className="mb-6">
                        <label
                          className="text-gray-700 font-medium mb-3"
                          htmlFor="email"
                        >
                          Email<span>*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none"
                          defaultValue={user.email}
                          onChange={(e) => {
                            setInputs({
                              ...inputs,
                              email: e.target.value,
                            });
                          }}
                          required
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
                          placeholder="Enter your phone number"
                          className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none transition duration-150 ease-in-out"
                          required
                          defaultValue={user.contact_phone}
                          onChange={(e) => {
                            setInputs({
                              ...inputs,
                              contact_phone: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div className="mb-6 w-full">
                        <label
                          className="text-gray-700 font-medium mb-3"
                          htmlFor="wallet_address"
                        >
                          Location<span>*</span>
                        </label>
                        <select
                          id="category"
                          className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none"
                          onChange={(e) => {
                            setInputs({
                              ...inputs,
                              location: e.target.value,
                            });
                          }}
                          required
                        >
                          <option key={'001'}>
                            -- Preferred Delivery Location --
                          </option>
                          {locations.map((location, index) => (
                            <option key={index} value={location.id}>
                              {location.name} : {location.state}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md bg-[#DD7D37] hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full"
                      >
                        {loading === true ? <Loader /> : 'Save Profile'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="justify-center flex items-center h-full g-6 text-gray-800">
            <Waiting />
          </div>
        )}
      </UserLayout>
    </div>
  );
};

export default profile;
