import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../components/Icons/Loader';
import axios from 'axios';
import UserLayout from '../../components/UserLayout/Layout';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import backend from '../../components/services/backend';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const profile = () => {
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
  const [loading, setLoading] = useState('');
  const [locations, setLocations] = useState('');
  const [collector, setCollector] = useState();
  const [selectedLocation, setSelectedLocation] = useState('');

  // const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    console.log(address);
    console.log(wallet);
    if (address) {
      // let address = 'abc0987654321';
      // console.log(wallet.adapter.name.toLowerCase());
      backend
        .authCollector(address)
        .then((collector) => {
          if (collector.status == true) {
            console.log(collector, 'collector');

            setCollector(collector.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
      // setInputs((inputs) => ({ ...inputs, collector }));
      console.log(collector, 'collector');
    }

    // checkStatus();
  }, [address]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const getLocations = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/locations`,
          { cancelToken: source.token }
        );
        console.log(res, 'res');

        setLocations(res.data.locations);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled');
        } else {
          throw err;
        }
      }
    };
    getLocations();
    return () => {
      source.cancel();
    };
  }, []);

  // const checkStatus = () =>{
  //   if((collector && collector.name == '') || (collector && collector.phone == '') || (collector && collector.email == '')){
  //     setDisabled(false)
  //   }
  // }

  const currentYear = new Date().getFullYear();

  const router = useRouter();

  // useEffect(() => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  });
  // }, [address]);

  const [error, setError] = useState(null);
  const user = localStorage.getItem('user');

  // useEffect(() => {
  //   if (user) {
  //     router.push('/individual/dashboard');
  //   }
  // }, []);

  const toastOptions = {
    duration: 8000,
    position: 'bottom-right',
    style: {},
    className: '',
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
    const { name, email, phone, wallet_address } = inputs;

    console.log(inputs);
    if (name === '' && email === '' && phone === '' && wallet_address === '') {
      toast.error('Fill in all required fields', toastOptions);
      return false;
    } else if (name === '') {
      toast.error('Name is required', toastOptions);
      return false;
    } else if (email === '') {
      toast.error('Email is required', toastOptions);
      return false;
    } else if (phone === '') {
      toast.error('Phone Number is required', toastOptions);
      return false;
    } else if (!selectedLocation) {
      toast.error('Location is required', toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(function () {
      setLoading(false);
    }, 300);

    if (handleValidation()) {
      try {
        const { name, email, phone, wallet_address, location } = inputs;

        // return console.log(inputs);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/collectors/${address}/save`,
          {
            name,
            email,
            phone,
            wallet_address: address,
            location: selectedLocation,
          }
        );

        if (res.data.status === false) {
          toast.error(res.data.msg, toastOptions);
          setTimeout(() => {
            setLoading(false);
          }, 4000);
        } else {
          setLoading(false);

          // router.push('/login');
        }
      } catch (err) {
        // toast.error(err, toastOptions);
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (location) {
      // if(locations){
      // let location_check = locations.find(
      //   (x) => x.id == collector.location._id
      // );
      // setSelectedLocation(location_check._id);
      // console.log(selectedLocation);

      // }

      setInputs((prev) => ({ ...prev, location: selectedLocation }));
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (collector && collector.name != undefined) {
      setInputs((prev) => ({ ...prev, name: collector.name }));
    }
    if (collector && collector.phone != undefined) {
      setInputs((prev) => ({ ...prev, phone: collector.phone }));
    }
    if (collector && collector.email != undefined) {
      setInputs((prev) => ({ ...prev, email: collector.email }));
    }
  }, [collector]);

  // useEffect(()=>{
  //   if(company.location){
  //     locations.find((x)=>)
  //   }
  // })

  const handleLocation = (e) => {
    setSelectedLocation(e.target.value);
  };

  // useEffect(() => {
  //   router.prefetch('/login');
  // }, []);
  return (
    <div>
      <Toaster />

      <UserLayout>
        <section className="">
          <div className="  h-full">
            <div className="flex justify-between items-center h-full g-6 text-gray-800">
              <div className=" w-full  bg-white  px-4 md:px-[60px] lg:px-[80px] pt-[50px] pb-7 scrollbar">
                {/* <div className="container mx-auto fixed top-0 right-0 left-0 w-full px-6 py-3 bg-white">
                <Link href="/">
                  <a>
                    <img src="/images/ecomarket-logo.svg" />
                  </a>
                </Link>
              </div> */}
                <div className="max-w-[600px] mx-auto py-12 shadow px-12">
                  <div className="mb-10 text-left">
                    <h3 className="text-2xl font-semibold text-gray-700 capitalize  mb-3">
                      Fill your Profile
                    </h3>
                    <p className="mt-3 text-gray-500 ">
                      Get all of the plastics you need at your disposal
                    </p>
                  </div>
                  {/* {} */}
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
                        className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none"
                        name="name"
                        defaultValue={collector?.name ? collector?.name : ''}
                        onChange={handleChange}
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
                        name="email"
                        min="3"
                        autoComplete="off"
                        onChange={handleChange}
                        defaultValue={collector?.email ? collector?.email : ''}
                        required
                      />
                    </div>

                    <div className="mb-6 w-full">
                      <label
                        className="text-gray-700 font-medium mb-3"
                        htmlFor="phone_number"
                      >
                        Contact Phone<span>*</span>
                      </label>
                      <input
                        id="phone"
                        type="text"
                        className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none transition duration-150 ease-in-out"
                        name="phone"
                        autoComplete="off"
                        onChange={handleChange}
                        defaultValue={collector?.phone ? collector?.phone : ''}
                        required
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
                        defaultValue={address}
                        readOnly

                        // onChange={handleChange}
                      />
                    </div>
                    <div className="mb-6 w-full">
                      <label
                        className="text-gray-700 font-medium mb-3"
                        htmlFor="wallet_address"
                      >
                        Location<span>*</span>
                      </label>
                      <div className="mb-4">
                        <FormControl
                          fullWidth
                          className=" bg-white h-10 focus:outline-none active:outline-none  border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease"
                        >
                          <Select
                            value={selectedLocation}
                            onChange={handleLocation}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            defaultValue={
                              collector?.location ? collector?.location : ''
                            }
                            required
                            name="center"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {locations &&
                              locations.map((item, index) => {
                                return (
                                  <MenuItem value={item.id} key={item.id}>
                                    {item.name} {item.state}, {item.country}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md bg-[#DD7D37] hover:shadow-lg mt-5 focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full"
                      onClick={handleSubmit}
                    >
                      {/* disabled={disabled} */}

                      {loading === true ? <Loader /> : 'Save Profile'}
                    </button>

                    {/* <div className="flex items-center justify-center mt-5">
                    <span className="">Already have an account?</span>
                    <Link href="/login">
                      <a className=" text-[#DD7D37] ml-2 underline">Sign In</a>
                    </Link>
                  </div> */}
                  </form>
                </div>

                {/* <div className="container mx-auto w-full px-6  mt-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <p>&copy; EcoMarket {currentYear}</p>
                    </div>

                    <div>
                      <a href="mailto://help@EcoMarket.com">
                        help@EcoMarket.com
                      </a>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </UserLayout>
    </div>
  );
};

export default profile;
