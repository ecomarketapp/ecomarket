import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../components/Icons/Loader';
import CompanyLayout from '../../components/CompanyLayout/Layout';
import {
  findProfile,
  getCategories,
  getCollectionCenter,
  getPage,
} from '../../utils/utils';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import Waiting from '../../components/Waiting';
import Head from 'next/head';

const profile = () => {
  const [loading, setLoading] = useState('');
  const [user, setUser] = useState();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [centers, setCenters] = useState([]);

  const router = useRouter();
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    expires_at: '',
    unit: 'kg',
    quantity_required: 0,
    amount_per_unit: 0,
    collection_center: '',
    company: '',
  });

  const [error, setError] = useState(null);

  const toastOptions = {
    duration: 8000,
    position: 'top-right',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/requests`,
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
        toast.success('Offer created successfully!', toastOptions);
        setInputs({});

        router.push(`/${getPage()}/dashboard`);
      }
    } catch (error) {
      console.log(error);
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
    const profile = await findProfile(address, 'companies');

    setUser(profile.data);

    setInputs({ ...inputs, company: profile.data.id });
  };

  const getCenters = async () => {
    if (user?.id) {
      const centers = await getCollectionCenter(user.id);

      setCenters(centers.collection_centers);
    }
  };

  const getCategory = async () => {
    const categories = await getCategories();

    setCategories(categories.data);
  };

  useEffect(() => {
    if (address) {
      getUser();
      // setUser(user.data);
    }
  }, [address]);

  useEffect(() => {
    getCenters(address);
    getCategory();
  }, [user]);

  return (
    <div>
      <Head>
        <title>Ecomarket | Company Create Offer</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Ecomarket Company Create Offer" />
      </Head>
      <Toaster />

      <CompanyLayout>
        {user ? (
          <section className="">
            <div className="  h-full">
              <div className="flex justify-between items-center h-full g-6 text-gray-800">
                <div className=" w-full  bg-white  px-4 md:px-[60px] lg:px-[80px] pt-[50px] pb-7 scrollbar">
                  <div className="max-w-[600px] mx-auto py-12 shadow px-12">
                    <div className="mb-10 text-left">
                      <h3 className="text-2xl font-semibold text-gray-700 capitalize  mb-3">
                        Create offer
                      </h3>
                      <p className="mt-3 text-gray-500 ">
                        List plastic offers for collectors to fufill
                      </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-6">
                        <label
                          className="text-gray-700 font-medium mb-3"
                          htmlFor="title"
                        >
                          Title<span>*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="e.g 1000kg of plastic"
                          onChange={(e) => {
                            setInputs({
                              ...inputs,
                              title: e.target.value,
                            });
                          }}
                          className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none"
                          required
                        />
                      </div>

                      <div className="mb-6">
                        <label
                          className="text-gray-700 font-medium mb-3"
                          htmlFor="description"
                        >
                          Description<span>*</span>
                        </label>
                        <textarea
                          id="description"
                          rows="20"
                          placeholder="we are in need of non flammable plastics and quality grade"
                          onChange={(e) => {
                            setInputs({
                              ...inputs,
                              description: e.target.value,
                            });
                          }}
                          className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none"
                          required
                        ></textarea>
                      </div>

                      <div className="mb-6">
                        <label
                          className="text-gray-700 font-medium mb-3"
                          htmlFor="category"
                        >
                          Category<span>*</span>
                        </label>
                        <select
                          id="category"
                          className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none"
                          onChange={(e) => {
                            setInputs({
                              ...inputs,
                              category: e.target.value,
                            });

                            const cat = categories.find(
                              (category) => category.id === e.target.value
                            );

                            console.log(cat);
                            setSubcategories(cat.children);
                          }}
                          required
                        >
                          <option key={'001'}>---Choose Category--</option>
                          {categories.map((category, index) => (
                            <option key={index} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-6">
                        <label
                          className="text-gray-700 font-medium mb-3"
                          htmlFor="subcategory"
                        >
                          Subcategory<span>*</span>
                        </label>
                        <select
                          id="subcategory"
                          className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none"
                          onChange={(e) => {
                            setInputs({
                              ...inputs,
                              subcategory: e.target.value,
                            });
                          }}
                          required
                        >
                          <option key={'002'}>---Choose Subcategory--</option>
                          {subcategories.map((subcategory, index) => (
                            <option key={index} value={subcategory._id}>
                              {subcategory.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-6 w-full">
                        <label
                          className="text-gray-700 font-medium mb-3"
                          htmlFor="expires_at"
                        >
                          Offer Expiry<span>*</span>
                        </label>
                        <input
                          id="expires_at"
                          type="datetime-local"
                          className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none transition duration-150 ease-in-out"
                          required
                          onChange={(e) => {
                            setInputs({
                              ...inputs,
                              expires_at: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div className="flex justify-between">
                        <div className="mb-6 w-50">
                          <label
                            className="text-gray-700 font-medium mb-3"
                            htmlFor="quantity_required"
                          >
                            Quantity Required(kg)<span>*</span>
                          </label>
                          <input
                            id="quantity_required"
                            type="number"
                            className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none transition duration-150 ease-in-out"
                            name="quantity_required"
                            onChange={(e) => {
                              setInputs({
                                ...inputs,
                                quantity_required: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div className="mb-6 w-50">
                          <label
                            className="text-gray-700 font-medium mb-3"
                            htmlFor="amount_per_unit"
                          >
                            Amount/Unit (TRX)<span>*</span>
                          </label>
                          <input
                            id="amount_per_unit"
                            type="text"
                            className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none transition duration-150 ease-in-out"
                            name="amount_per_unit"
                            onChange={(e) => {
                              setInputs({
                                ...inputs,
                                amount_per_unit: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label
                          className="text-gray-700 font-medium mb-3"
                          htmlFor="collection_center"
                        >
                          Collection center<span>*</span>
                        </label>
                        <select
                          id="collection_center"
                          className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none"
                          onChange={(e) => {
                            setInputs({
                              ...inputs,
                              collection_center: e.target.value,
                            });
                          }}
                          required
                        >
                          <option>---Choose Closest Center--</option>
                          {centers.map((center) => (
                            <option key={center.id} value={center.id}>
                              {center.title} : {center.address}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md bg-[#DD7D37] hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full"
                      >
                        {loading === true ? <Loader /> : 'Create Offer'}
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
      </CompanyLayout>
    </div>
  );
};

export default profile;
