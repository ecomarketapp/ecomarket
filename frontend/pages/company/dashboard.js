import Link from 'next/link';
import React, { useState, useEffect, useMemo } from 'react';
import CompanyLayout from '../../components/CompanyLayout/Layout';
import DropdownIcon from '../../components/Icons/DropdownIcon';
import ExpandMoreVertical from '../../components/Icons/ExpandMoreVertical';
import UpwardIcon from '../../components/Icons/UpwardIcon';
// import CategoryCall from '../../components/apiCalls/CategoryCall'
import axios from 'axios';
import { CreateOffer } from '../../components/modals/CreateOffer';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { useRouter } from 'next/router';
import backend from '../../components/services/backend';
import ProfileRedirectModal from '../../components/modals/ProfileRedirectModal';

// export const getStaticProps = async () => {
//     try{
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/categories`)
//       if(res){
//         console.log(res.data);
//         const data = await res.json();

//         return {
//           props: {categories: data.data}
//         }
//       }
//       else{
//         console.log("no data")
//       }
//     }catch(err){

//     }

//   }

const Dashboard = () => {
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
  // console.log(CategoryCall, "category call")
  const [categories, setCategories] = useState();
  const [centers, setCenters] = useState();

  const [createOffer, setCreateOffer] = useState();
  const [catDropdown, setCatDropdown] = useState();
  const [typeDropdown, setypeDropdown] = useState();
  const [centerDropdown, setCenterDropdown] = useState();
  const [alertModal, setAlertModal] = useState();
  const [approveOfferModal, setApproveOfferModal] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [selectedCenter, setSelectedCenter] = useState();
  const [company, setCompany] = useState({});
  const [empty, setEmpty] = useState(false);
  const [open, setOpen] = useState(false);

  // const [offer, setOffer] = useState({
  //   title: '',
  //   description: '',
  //   quantity_required: '',
  //   amount_per_unit: '',
  //   request_expires_at: '',
  //   company: '',
  //   location: '',
  //   escrow_payment: '',
  //   deliveries: '',
  // });

  // const handleChange = (e) => {
  //   setInputs((prev) => {
  //     return { ...prev, [e.target.name]: e.target.value };
  //   });
  // };

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const getCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/categories`,
          {
            cancelToken: source.token,
          }
        );
        setCategories(res.data.data);
        // console.log(res)
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled');
        } else {
          throw err;
        }
      }
    };
    getCategories();
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const getCenters = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/collectioncenters`,
          { cancelToken: source.token }
        );
        console.log(res, 'res');

        setCenters(res.data.collection_centers);
        console.log(centers, 'centerss');
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled');
        } else {
          throw err;
        }
      }
    };
    getCenters();
    return () => {
      source.cancel();
    };
  }, []);

  const router = useRouter();

  useEffect(() => {
    console.log(router);
    // console.log(connected ? 'connected' : 'disconnected');
    // const back = `${window.location.origin}/connect-wallet/${
    //   router.pathname.split('/')[1]
    // }`;
    // console.log(router, back);
    // if (!connected) {
    //   router.replace(back);
    // }
  }, []);

  const handleCreateOffer = () => {
    setCreateOffer(!createOffer);
  };
  const verifyOffer = () => {
    setAlertModal(!alertModal);
  };
  const submitOffer = () => {
    setCreateOffer(false);

    setAlertModal(false);
    setApproveOfferModal(!approveOfferModal);
  };
  const handlSubmit = () => {
    const {
      title,
      description,
      quantity_required,
      amount_per_unit,
      request_expires_at,
      company,
      location,
      escrow_payment,
      deliveries,
    } = inputs;

    setCreateOffer(false);

    setAlertModal(false);
    setApproveOfferModal(!approveOfferModal);
  };

  // const SelectCategory = (item, index) => {
  //   setSelectedCategory(item.item);
  //   setSubCategory(item.item.children);
  // };
  // const SelectCenter = (item, index) => {
  //   setSelectedCenter(item.item);
  // };
  // const SelectSubCategory = (item, index) => {
  //   setSelectedSubCategory(item.item);
  // };

  useEffect(() => {
    console.log(address);
    console.log(wallet);
    if (address) {
      // let address = 'testaddress';
      // console.log(wallet.adapter.name.toLowerCase());
      backend
        .authCompany(address)
        .then((company) => {
          if (company.status == true) {
            console.log(company, 'company');

            setCompany(company.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
      // setInputs((inputs) => ({ ...inputs, collector }));
      console.log(company, 'company');
    }

    // checkStatus();
  }, [address]);

  const checkStatus = () => {
    setTimeout(function () {
      if (company) {
        if (
          company?.name ||
          company?.contact_person ||
          company?.contact_email ||
          company?.contact_phone
        ) {
          console.log('enteredd');
          setOpen(false);
          setEmpty(false);
        } else {
          setOpen(true);
          setEmpty(true);
        }
      }
    }, 3000);
  };

  useEffect(checkStatus, [address, company]);
  return (
    <>
      {connected ? (
        <CompanyLayout>
          <section>
            <div className="container mx-auto px-6">
              <div className="h-full pb-24 px-4 md:px-12 py-12">
                <div className="grow py-4 flex items-center justify-between mb-3 ">
                  <h1 className="text-3xl font-bold text-gray-800 ">
                    Dashboard
                  </h1>
                  <div>
                    <button
                      className="px-8 py-3 rounded-full shadow-md bg-[#DD7D37] hover:shadow-lg text-white transition duration-150 ease-in-out border-0"
                      onClick={handleCreateOffer}
                    >
                      Create Offer
                    </button>
                  </div>
                </div>

                <div className="w-full mb-6 py-6 h-full">
                  <div className="grid grids-cols-1 md:grid-cols-3 gap-5">
                    <div className="shadow w-full bg-white relative  py-6 rounded flex flex-col justify-between">
                      <div className="flex items-center justify-between flex-row w-full px-6">
                        <h5 className="text-gray-600 text-lg">Your Offers</h5>
                        <button className="text-gray-400 text-xs rounded-full hover:bg-gray-200 p-2 transition duration-200 ease">
                          <ExpandMoreVertical />
                        </button>
                      </div>
                      <div className="py-2 px-6">
                        <div className="flex items-center py-1 mb-1 text-sm w-full border-gray-200">
                          <div className="flex items-start gap-3 w-full">
                            <div className="w-full">
                              <div className="flex gap-1 items-center flex-row justify-between w-full">
                                <p className="text-lg text-[#5B5B5B] font-semibold">
                                  120kg of PET Bottles
                                </p>

                                <p className="text-xs font-normal">
                                  Expires: 20/10/22
                                </p>
                              </div>
                              <div className="flex gap-1 flex-row justify-between items-center w-full">
                                <p className="text-sm text-[#5B5B5B] font-normal">
                                  $500
                                </p>
                                <p className="text-sm text-[#12B76A]">
                                  25% Provided
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center py-1 mb-1 text-sm w-full border-gray-200">
                          <div className="flex items-start gap-3 w-full">
                            <div className="w-full">
                              <div className="flex gap-1 items-center flex-row justify-between w-full">
                                <p className="text-lg text-[#5B5B5B] font-semibold">
                                  120kg of PET Bottles
                                </p>

                                <p className="text-xs font-normal">
                                  Expires: 20/10/22
                                </p>
                              </div>
                              <div className="flex gap-1 flex-row justify-between items-center w-full">
                                <p className="text-sm text-[#5B5B5B] font-normal">
                                  $500
                                </p>
                                <p className="text-sm text-[#12B76A]">
                                  25% Provided
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-end w-full">
                        <Link href="/company/offers">
                          <a className="text-[#DD7D37] text-base px-6">
                            view offers
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className="shadow w-full bg-white relative  py-6 rounded flex flex-col justify-between">
                      <div className="flex items-center justify-between flex-row w-full px-6">
                        <h5 className="text-gray-600 text-lg">
                          Today's Deliveries
                        </h5>
                        <button className="text-gray-400 text-xs rounded-full hover:bg-gray-200 p-2 transition duration-200 ease">
                          <ExpandMoreVertical />
                        </button>
                      </div>
                      <div className="py-4 px-6 flex items-center justify-between">
                        <div>
                          <h4>14</h4>
                          <div className="inline-flex items-center gap-1 py-4 ">
                            <span className="text-[#45CD85] inline-flex items-center gap-1">
                              <UpwardIcon /> 10%
                            </span>{' '}
                            yesterday
                          </div>
                        </div>

                        <div>
                          <img src="/images/_Chart.svg" />
                        </div>
                      </div>
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-end w-full">
                        <Link href="/company/offers">
                          <a className="text-[#DD7D37] text-base px-6">
                            view offers
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className="shadow w-full bg-white relative py-6 rounded flex flex-col justify-between">
                      <div className="px-6">
                        <div className="flex items-center justify-between flex-row w-full">
                          <h5 className="text-gray-600">Wallet Balance</h5>
                          <button className="text-gray-400 text-xs rounded-full hover:bg-gray-200 p-2 transition duration-200 ease">
                            <ExpandMoreVertical />
                          </button>
                        </div>
                        <div className="py-4">
                          <h3 className="text-neutral800 text-4xl	">
                            $ 2,000.00
                          </h3>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-end w-full">
                        <Link href="/company/wallet">
                          <a className="text-[#DD7D37] text-base px-6">
                            view wallet
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between flex-row w-full ">
                    <div>
                      <h5 className="text-gray-700">Recent activity</h5>
                    </div>
                    <div className="inline-flex gap-4 items-center">
                      <button className="text-gray-500 border-gray-400 border text-sm px-5 py-3 bg-white rounded-full">
                        Download
                      </button>
                      <Link href="/company/offers">
                        <a className="text-white text-sm  px-5 py-3 bg-[#DD7D37] border border-[#DD7D37] rounded-full">
                          View All
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className=" mt-5 w-full bg-white  border-t border-gray-200 relative overflow-hidden">
                    <div className=" py-6 w-full relative">
                      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-x-12 gap-y-4">
                        <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
                          <div className="flex items-start gap-4 w-full">
                            <div className="h-12 w-12 ">
                              <img
                                src="/images/Avatar.png"
                                className="w-full object-cover rounded-full  "
                              />
                            </div>

                            <div className="w-full grow">
                              <div className="flex gap-1 items-center flex-row justify-between w-full">
                                <p className="text-lg text-[#5B5B5B] font-semibold">
                                  Demi Wikinson{' '}
                                  <span className="font-thin text-graay-400 text-xs">
                                    2 mins ago
                                  </span>
                                </p>
                              </div>
                              <div className="flex gap-1 flex-row justify-between items-center w-full">
                                <p className="text-sm  text-[#5B2D0B] font-normal">
                                  <span className="font-thin text-[#5B5B5B] text-xs">
                                    Deposited
                                  </span>{' '}
                                  10kg 0f PET Bottles
                                </p>
                              </div>
                              <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                                <div className="p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center">
                                  <img src="/images/Icon.png" alt="" />
                                </div>
                                <div className="flex gap-1 flex-col items-start w-full">
                                  <p className="text-base  text-[#344054] font-normal">
                                    {' '}
                                    10kg 0f PET Bottles
                                  </p>
                                  <p className="text-sm  text-[#667085] font-normal">
                                    720KB
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
                          <div className="flex items-start gap-4 w-full">
                            <div className="h-12 w-12 ">
                              <img
                                src="/images/Avatar.png"
                                className="w-full object-cover rounded-full  "
                              />
                            </div>

                            <div className="w-full grow">
                              <div className="flex gap-1 items-center flex-row justify-between w-full">
                                <p className="text-lg text-[#5B5B5B] font-semibold">
                                  Demi Wikinson{' '}
                                  <span className="font-thin text-graay-400 text-xs">
                                    2 mins ago
                                  </span>
                                </p>
                              </div>
                              <div className="flex gap-1 flex-row justify-between items-center w-full">
                                <p className="text-sm  text-[#5B2D0B] font-normal">
                                  <span className="font-thin text-[#5B5B5B] text-xs">
                                    Deposited
                                  </span>{' '}
                                  10kg 0f PET Bottles
                                </p>
                              </div>
                              <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                                <div className="p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center">
                                  <img src="/images/Icon.png" alt="" />
                                </div>
                                <div className="flex gap-1 flex-col items-start w-full">
                                  <p className="text-base  text-[#344054] font-normal">
                                    {' '}
                                    10kg 0f PET Bottles
                                  </p>
                                  <p className="text-sm  text-[#667085] font-normal">
                                    720KB
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
                          <div className="flex items-start gap-4 w-full">
                            <div className="h-12 w-12 ">
                              <img
                                src="/images/Avatar.png"
                                className="w-full object-cover rounded-full  "
                              />
                            </div>

                            <div className="w-full grow">
                              <div className="flex gap-1 items-center flex-row justify-between w-full">
                                <p className="text-lg text-[#5B5B5B] font-semibold">
                                  Demi Wikinson{' '}
                                  <span className="font-thin text-graay-400 text-xs">
                                    2 mins ago
                                  </span>
                                </p>
                              </div>
                              <div className="flex gap-1 flex-row justify-between items-center w-full">
                                <p className="text-sm  text-[#5B2D0B] font-normal">
                                  <span className="font-thin text-[#5B5B5B] text-xs">
                                    Deposited
                                  </span>{' '}
                                  10kg 0f PET Bottles
                                </p>
                              </div>
                              <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                                <div className="p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center">
                                  <img src="/images/Icon.png" alt="" />
                                </div>
                                <div className="flex gap-1 flex-col items-start w-full">
                                  <p className="text-base  text-[#344054] font-normal">
                                    {' '}
                                    10kg 0f PET Bottles
                                  </p>
                                  <p className="text-sm  text-[#667085] font-normal">
                                    720KB
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
                          <div className="flex items-start gap-4 w-full">
                            <div className="h-12 w-12 ">
                              <img
                                src="/images/Avatar.png"
                                className="w-full object-cover rounded-full  "
                              />
                            </div>

                            <div className="w-full grow">
                              <div className="flex gap-1 items-center flex-row justify-between w-full">
                                <p className="text-lg text-[#5B5B5B] font-semibold">
                                  Demi Wikinson{' '}
                                  <span className="font-thin text-graay-400 text-xs">
                                    2 mins ago
                                  </span>
                                </p>
                              </div>
                              <div className="flex gap-1 flex-row justify-between items-center w-full">
                                <p className="text-sm  text-[#5B2D0B] font-normal">
                                  <span className="font-thin text-[#5B5B5B] text-xs">
                                    Deposited
                                  </span>{' '}
                                  10kg 0f PET Bottles
                                </p>
                              </div>
                              <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                                <div className="p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center">
                                  <img src="/images/Icon.png" alt="" />
                                </div>
                                <div className="flex gap-1 flex-col items-start w-full">
                                  <p className="text-base  text-[#344054] font-normal">
                                    {' '}
                                    10kg 0f PET Bottles
                                  </p>
                                  <p className="text-sm  text-[#667085] font-normal">
                                    720KB
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
                          <div className="flex items-start gap-4 w-full">
                            <div className="h-12 w-12 ">
                              <img
                                src="/images/Avatar.png"
                                className="w-full object-cover rounded-full  "
                              />
                            </div>

                            <div className="w-full grow">
                              <div className="flex gap-1 items-center flex-row justify-between w-full">
                                <p className="text-lg text-[#5B5B5B] font-semibold">
                                  Demi Wikinson{' '}
                                  <span className="font-thin text-graay-400 text-xs">
                                    2 mins ago
                                  </span>
                                </p>
                              </div>
                              <div className="flex gap-1 flex-row justify-between items-center w-full">
                                <p className="text-sm  text-[#5B2D0B] font-normal">
                                  <span className="font-thin text-[#5B5B5B] text-xs">
                                    Deposited
                                  </span>{' '}
                                  10kg 0f PET Bottles
                                </p>
                              </div>
                              <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                                <div className="p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center">
                                  <img src="/images/Icon.png" alt="" />
                                </div>
                                <div className="flex gap-1 flex-col items-start w-full">
                                  <p className="text-base  text-[#344054] font-normal">
                                    {' '}
                                    10kg 0f PET Bottles
                                  </p>
                                  <p className="text-sm  text-[#667085] font-normal">
                                    720KB
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
                          <div className="flex items-start gap-4 w-full">
                            <div className="h-12 w-12 ">
                              <img
                                src="/images/Avatar.png"
                                className="w-full object-cover rounded-full  "
                              />
                            </div>

                            <div className="w-full grow">
                              <div className="flex gap-1 items-center flex-row justify-between w-full">
                                <p className="text-lg text-[#5B5B5B] font-semibold">
                                  Demi Wikinson{' '}
                                  <span className="font-thin text-graay-400 text-xs">
                                    2 mins ago
                                  </span>
                                </p>
                              </div>
                              <div className="flex gap-1 flex-row justify-between items-center w-full">
                                <p className="text-sm  text-[#5B2D0B] font-normal">
                                  <span className="font-thin text-[#5B5B5B] text-xs">
                                    Deposited
                                  </span>{' '}
                                  10kg 0f PET Bottles
                                </p>
                              </div>
                              <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                                <div className="p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center">
                                  <img src="/images/Icon.png" alt="" />
                                </div>
                                <div className="flex gap-1 flex-col items-start w-full">
                                  <p className="text-base  text-[#344054] font-normal">
                                    {' '}
                                    10kg 0f PET Bottles
                                  </p>
                                  <p className="text-sm  text-[#667085] font-normal">
                                    720KB
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <CreateOffer
            createOffer={createOffer}
            setCreateOffer={setCreateOffer}
          />

          <div className={`modal__box ${approveOfferModal ? 'show' : ''}`}>
            <div className="modal__box-wrapper shadow-lg rounded-2xl relative">
              <button
                className=" flex items-center rounded-full border-2 border-gray-700 absolute top-3 right-2  "
                onClick={() => setApproveOfferModal(false)}
              >
                <span className="pointer-events-none flex items-center p-1">
                  <svg
                    className="h-3 w-3 "
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 5L5 15M5 5L15 15"
                      stroke="currentColor"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </span>
              </button>

              <div className="px-2 py-6   ">
                <div className="flex items-center justify-around py-4">
                  <div className="h-16">
                    <img
                      src="/images/metamask2.svg"
                      className="h-full object-cover"
                    />
                  </div>
                  <div className="h-12">
                    <img
                      src="/images/wood.svg"
                      className="h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center text-center mb-6 w-full">
                  <div className="grow w-full">
                    <h1 className="text-2xl font-semibold mb-2">
                      Approve transfer to escrow wallet{' '}
                    </h1>

                    <p className="text-sm text-[#878A90] font-normal">
                      This is to enable EcoMarket deduct the exact amount you're
                      being charged
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center flex-col gap-2 text-center my-6 py-4 w-full">
                  <p className="text-sm text-gray-700">
                    You're about to approve this amount to EcoMarket escrow
                    wallet
                  </p>
                  <h1 className="text-3xl font-semibold mb-2">cUSD7,500</h1>
                </div>

                <div className="flex items-center justify-center gap-4 mt-5 mx-auto w-full">
                  <button
                    className="px-9 w-1/2 py-2 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full"
                    onClick={submitOffer}
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
          {empty ? (
            <ProfileRedirectModal
              show={open}
              setShow={setOpen}
              page="company"
            />
          ) : (
            ''
          )}
        </CompanyLayout>
      ) : (
        <CompanyLayout>
          <section>
            <div className="container mx-auto px-6">
              <div className="h-full pb-24 px-4 md:px-12 py-12"></div>
            </div>
          </section>
        </CompanyLayout>
      )}
    </>
  );
};

export default Dashboard;
