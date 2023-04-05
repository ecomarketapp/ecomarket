import React, { useEffect, useState } from 'react';
import DropdownIcon from '../Icons/DropdownIcon';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export function CreateOffer({ createOffer, setCreateOffer }) {
  const [alertModal, setAlertModal] = useState();
  const [approveOfferModal, setApproveOfferModal] = useState();

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

  return (
    <>
      <CreateOfferForm
        createOffer={createOffer}
        setCreateOffer={setCreateOffer}
        confirm={verifyOffer}
      />

      <ConfirmVerifyOffer
        show={alertModal}
        setShow={setAlertModal}
        confirm={submitOffer}
      />
    </>
  );
}

function CreateOfferForm({ createOffer, setCreateOffer, confirm }) {
  const [categories, setCategories] = useState();
  const [centers, setCenters] = useState();

  const [catDropdown, setCatDropdown] = useState();
  const [typeDropdown, setypeDropdown] = useState();
  const [centerDropdown, setCenterDropdown] = useState();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [hasSubCategory, setHasSubCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedCenter, setSelectedCenter] = useState('');

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

  // const handleValidation = () => {
  //   if(title === ''){
  //   }
  // }


  const formInitialState = {
    agency: null,
    name: null,
    email: null,
    description: null,
    amount: null,
    interest: 0,
    url: null,
  };
  const [form, setForm] = useState({
    title: null,
    description: null,
    category: null,
    subcategory: null,
    center: null,
    quantity_required: null,
    amount_per_unit: null,
    request_expires_at: null,
    company: 0,
    location: null,
    escrow_payment: null,
    deliveries: null,
  });

  useEffect(() => {
    if (selectedCategory)
      setForm((form) => ({ ...form, category: selectedCategory }));
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubCategory)
      setForm((form) => ({ ...form, subcategory: selectedSubCategory }));
  }, [selectedSubCategory]);

  useEffect(() => {
    if (selectedCenter)
      setForm((form) => ({ ...form, center: selectedCenter }));
  }, [selectedCenter]);


  const [offer, setOffer] = useState({
    title: '',
    description: '',
    quantity_required: '',
    amount_per_unit: '',
    request_expires_at: '',
    company: '',
    location: '',
    escrow_payment: '',
    deliveries: '',
  });
  // const [age, setAge] = React.useState('');

  const handleCategory = (event) => {
    let cat = categories.find((x) => x.id == event.target.value);
    setSelectedCategory(event.target.value);
    if(cat.children.length > 0){
      setHasSubCategory(cat.children);
    }else{
        return
    }
  };

  const SelectSubCategory = (event) => {
    setSelectedSubCategory(event.target.value);
  };

  const handleCollectionCenter = (e) => {
    setSelectedCenter(e.target.value)
  };

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
        const res = await axios.get('http://127.0.0.1:8080/api/categories', {
          cancelToken: source.token,
        });
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
          'http://127.0.0.1:8080/api/collectioncenters',
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

  const handleCat = () => {
    setCatDropdown(!catDropdown);
  };
  const handleType = () => {
    setypeDropdown(!typeDropdown);
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    console.log("enterss");
    try {
      console.log(form);
      // const invoice = await backend.storeInvoice(form);
      setForm(formInitialState);
      dismiss();
      // router.push({ path: "/a", query: { id: invoice.id } });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={`modal__box ${createOffer ? 'show' : ''}`}>
      <div
        className="modal__box-wrapper shadow-lg rounded-2xl"
        style={{ overflow: 'auto' }}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="grow">
            <h1 className="text-2xl font-semibold mb-3">Create an Offer</h1>

            <p className="text-base text-gray-500">
              Kindly create an offer to place on the marketplace
            </p>
          </div>

          <button
            className=" flex items-center rounded-full border-2 border-gray-700  "
            onClick={() => setCreateOffer(false)}
          >
            <span className="pointer-events-none flex items-center p-1">
              <svg
                className="h-4 w-4 "
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
        </div>
        <form className="" onSubmit={submitForm}>
          <div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium">Title</label>
              </div>
              <div className=" relative grow  rounded-lg  items-center flex w-full h-12 ">
                <input
                  type="text"
                  className=" border border-gray-300 py-3 px-4  block w-full pl-4 pr-20 rounded-lg h-full focus:outline-none focus:border-gray-400 transition duration-300 ease"
                  placeholder="What's the title?"
                  name="title"
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <label className="text-gray-700 font-medium">
                  Category of Scrap
                </label>
              </div>
              <div className="dropdown relative grow w-full">
                <FormControl
                  fullWidth
                  className=" bg-white h-10 focus:outline-none active:outline-none  border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease"
                >
                  <Select
                    value={selectedCategory.length ? selectedCategory : ''}
                    onChange={handleCategory}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }} 
                    defaultValue="" required 
                    name="category"
                  >
                    <MenuItem value="" disabled>
                      <em>None</em>
                    </MenuItem>
                    {categories &&
                      categories.map((item, index) => {
                        return <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>;
                      })}
                  </Select>
                </FormControl>
                {/* <button
                  className="w-full bg-white h-12 focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease"
                  type="button"
                  onClick={handleCat}
                >
                  {selectedCategory ? (
                    <span className="pointer-events-none flex items-center gap-2 text-gray-600">
                      {selectedCategory.name}
                    </span>
                  ) : (
                    <span className="pointer-events-none flex items-center gap-2 text-gray-400">
                      Select the Scrap category
                    </span>
                  )}

                  <span className="pointer-events-none ">
                    <DropdownIcon />
                  </span>
                </button> */}

                {/* <div
                  className={` absolute border bg-white cat-menu ${
                    catDropdown ? 'show' : ''
                  } large-dropdown px-3 shadow-md rounded-md w-full h-40 max-w-full overflow-y-auto scrollbar-change fade-in z-10`}
                >
                  <div className=" py-4 divide-y">
                    {categories &&
                      categories.map((item, index) => (
                        <button
                          className={`flex items-center py-3 px-2 hover:bg-gray-100 text-sm justify-between  border-0 rounded-lg w-full ${
                            selectedCategory && selectedCategory.id === item.id
                              ? 'bg-gray-100'
                              : 'bg-white'
                          } `}
                          type="button"
                          key={index}
                          onClick={() => SelectCategory({ item, index })}
                        >
                          <div className="flex items-center justify-center gap-2 pr-2">
                            <img src={`${item.icon}`} className="h-8 w-8" />
                          </div>
                          <div className="flex grow flex-col justify-center items-start text-left">
                            <p className="text-gray-700 font-normal text-base">
                              {item.name}
                            </p>
                          </div>
                        </button>
                      ))}
                    
                  </div>
                </div> */}
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <label className="text-gray-700 font-medium">
                  Subcategory of Scrap
                </label>
              </div>
              <div className="dropdown relative grow w-full">
                <FormControl
                  fullWidth
                  className=" bg-white h-10 focus:outline-none active:outline-none  border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease"
                >
                  <Select
                    value={selectedSubCategory}
                    onChange={SelectSubCategory}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }} 
                    defaultValue="" 
                    required 
                    name="subcategory"
                  >
                    {
                      // selectedCategory ? (
                        hasSubCategory.length < 1 && (
                        // <div className="text-center h-full flex items-center justify-center flex-col">
                        //   <div className="h-24 w-24">
                        //     <img
                        //       src="/images/file-not-found.svg"
                        //       className="h-full w-full"
                        //     />
                        //   </div>
                        //   <div>No SubCategory</div>
                        // </div>
                        <MenuItem disabled value="">No SubCategory</MenuItem>
                      )
                    }
                    {/* <MenuItem value="">
                      <em>None</em>
                    </MenuItem> */}
                    {hasSubCategory.length > 0 &&
                      hasSubCategory.map((item, index) => {
                        return <MenuItem value={item._id}  key={item._id}>{item.name}</MenuItem>;
                      })}
                    {/* // </> 
                     
                    // ) : (
                    //   <div className="text-center h-full flex items-center justify-center flex-col">
                    //     <div className="h-24 w-24">
                    //       <img
                    //         src="/images/file-not-found.svg"
                    //         className="h-full w-full"
                    //       />
                    //     </div>
                    //     <div>Please Choose a Category</div>
                    //   </div>
                    // )
                    */}
                  </Select>
                </FormControl>

                {/* <button
                  className="w-full bg-white h-12 focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease"
                  type="button"
                  onClick={handleType}
                >
                  {selectedSubCategory ? (
                    <span className="pointer-events-none flex items-center gap-2 text-gray-600">
                      {selectedSubCategory.name}
                    </span>
                  ) : (
                    <span className="pointer-events-none flex items-center gap-2 text-gray-400">
                      Select the Scrap subcategory
                    </span>
                  )}

                  <span className="pointer-events-none ">
                    <DropdownIcon />
                  </span>
                </button>

                <div
                  className={` absolute border bg-white type-menu  ${
                    typeDropdown ? 'show' : ''
                  } large-dropdown px-3 shadow-md rounded-md w-full h-40 max-w-full overflow-y-auto scrollbar-change fade-in z-10`}
                >
                  <div className=" py-4 h-full">
                    {selectedCategory ? (
                      subCategory.length < 1 ? (
                        <div className="text-center h-full flex items-center justify-center flex-col">
                          <div className="h-24 w-24">
                            <img
                              src="/images/file-not-found.svg"
                              className="h-full w-full"
                            />
                          </div>
                          <div>No SubCategory</div>
                        </div>
                      ) : (
                        subCategory.map((item, index) => (
                          <button
                            className={`flex items-center py-3 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full ${
                              selectedSubCategory &&
                              selectedSubCategory._id === item._id
                                ? 'bg-gray-100'
                                : 'bg-white'
                            } `}
                            type="button"
                            key={index}
                            onClick={() => SelectSubCategory({ item, index })}
                          >
                            <p className="text-gray-700 font-normal text-base px-2">
                              {item.name}
                            </p>
                          </button>
                        ))
                      )
                    ) : (
                      <div className="text-center h-full flex items-center justify-center flex-col">
                        <div className="h-24 w-24">
                          <img
                            src="/images/file-not-found.svg"
                            className="h-full w-full"
                          />
                        </div>
                        <div>Please Choose a Category</div>
                      </div>
                    )}
                  </div>
                </div> */}
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <label className="text-gray-700 font-medium">Description</label>
              </div>
              <div className=" relative grow w-full h-full">
                <textarea
                  className="w-full bg-white focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease"
                  rows="3"
                  placeholder="Description of the scrap"
                  name="description"
                  onChange={handleInput}
                ></textarea>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium">
                  Quantity Required
                </label>
              </div>
              <div
                className="dropdown relative grow w-full"
                data-large-dropdown=""
              >
                <div className=" relative rounded-lg  items-center flex w-full h-12 ">
                  <button
                    className=" absolute inset-y-0 right-0 px-1 flex items-center h-full border-l border-gray-300"
                    type="button"
                  >
                    <span className=" text-gray-500 px-3 flex items-center bg-white ">
                      kg
                      <DropdownIcon />
                    </span>
                  </button>
                  <input
                    type="text"
                    className=" border border-gray-300 py-3 px-4  block w-full pl-4 pr-20 rounded-lg h-full focus:outline-none focus:border-gray-400 transition duration-300 ease"
                    placeholder="What's the quantity you need"
                    name="quantity_required"
                    onChange={handleInput}
                  />
                </div>

                <div
                  className={` absolute border bg-white form-submenu large-dropdown px-3 py-3 shadow-md rounded-md w-full h-40 max-w-full overflow-y-auto scrollbar-change fade-in`}
                >
                  <div className=" py-4">
                    <button
                      className="flex items-center py-2 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full "
                      type="button"
                    >
                      <div className="flex items-center justify-center gap-2 pr-2">
                        <img src="/images/metamask.png" className="h-8 w-8" />
                      </div>
                      <div className="flex grow flex-col justify-center items-start text-left">
                        <p className="text-neutral700 font-normal text-base">
                          MetaMask
                        </p>
                      </div>
                    </button>
                    <button
                      className="flex items-center py-2 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full "
                      type="button"
                    >
                      <div className="flex items-center justify-center gap-2 pr-2">
                        <img src="/images/metamask.png" className="h-8 w-8" />
                      </div>
                      <div className="flex grow flex-col justify-center items-start text-left">
                        <p className="text-neutral700 font-normal text-base">
                          MetaMask
                        </p>
                      </div>
                    </button>
                    <button
                      className="flex items-center py-2 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full "
                      type="button"
                    >
                      <div className="flex items-center justify-center gap-2 pr-2">
                        <img src="/images/metamask.png" className="h-8 w-8" />
                      </div>
                      <div className="flex grow flex-col justify-center items-start text-left">
                        <p className="text-neutral700 font-normal text-base">
                          MetaMask
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-medium">Set amount</label>
              </div>
              <div
                className="dropdown relative grow  w-full"
                data-large-dropdown=""
              >
                <div className=" relative rounded-lg  items-center flex w-full h-12 ">
                  <button
                    className=" absolute inset-y-0 right-0 px-1 flex items-center h-full border-l border-gray-300"
                    type="button"
                  >
                    <span className=" text-gray-500 px-3 flex items-center bg-white ">
                      kg
                      <DropdownIcon />
                    </span>
                  </button>
                  <input
                    type="text"
                    className=" border border-gray-300 py-3 px-4  block w-full pl-4 pr-20 rounded-lg h-full focus:outline-none focus:border-gray-400 transition duration-300 ease"
                    placeholder="How much are you willing to pay for this?"
                    name="amount_per_unit"
                    onChange={handleInput}
                  />
                </div>

                <div
                  className={` absolute border bg-white form-submenu large-dropdown px-3 py-3 shadow-md rounded-md w-full h-40 max-w-full overflow-y-auto scrollbar-change fade-in`}
                >
                  <div className=" py-4">
                    <button
                      className="flex items-center py-2 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full "
                      type="button"
                    >
                      <div className="flex items-center justify-center gap-2 pr-2">
                        <img src="/images/metamask.png" className="h-8 w-8" />
                      </div>
                      <div className="flex grow flex-col justify-center items-start text-left">
                        <p className="text-neutral700 font-normal text-base">
                          MetaMask
                        </p>
                      </div>
                    </button>
                    <button
                      className="flex items-center py-2 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full "
                      type="button"
                    >
                      <div className="flex items-center justify-center gap-2 pr-2">
                        <img src="/images/metamask.png" className="h-8 w-8" />
                      </div>
                      <div className="flex grow flex-col justify-center items-start text-left">
                        <p className="text-neutral700 font-normal text-base">
                          MetaMask
                        </p>
                      </div>
                    </button>
                    <button
                      className="flex items-center py-2 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full "
                      type="button"
                    >
                      <div className="flex items-center justify-center gap-2 pr-2">
                        <img src="/images/metamask.png" className="h-8 w-8" />
                      </div>
                      <div className="flex grow flex-col justify-center items-start text-left">
                        <p className="text-neutral700 font-normal text-base">
                          MetaMask
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">1kg = $50</p>
                <p className="text-gray-700">
                  <span className="font-thin text-xs text-gray-400">
                    suggested amount
                  </span>{' '}
                  150kg = $7,500
                </p>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">
                  Collection Center
                </span>
                <button className="text-[#DD7D37] text-sm">
                  + Add Collection Center
                </button>
              </div>
              <div
                className="dropdown relative grow mb-4 w-full"
                data-large-dropdown=""
              >
                <FormControl
                  fullWidth
                  className=" bg-white h-10 focus:outline-none active:outline-none  border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease"
                >
                  <Select
                    value={selectedCenter}
                    onChange={handleCollectionCenter}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }} 
                    defaultValue="" required 
                    name="center"
                    
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {centers &&
                      centers.map((item, index) => {
                        return <MenuItem value={item.id} key={item.id}>{item.title}</MenuItem>;
                      })}
                  </Select>
                </FormControl>

                {/* <button
                  className="w-full bg-white h-12 focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease"
                  data-large-dropdown-btn=""
                  type="button"
                  onClick={handleCollectionCenter}
                >
                  {selectedCenter ? (
                    <span className="pointer-events-none flex items-center gap-2 text-gray-600">
                      {selectedCenter.title}
                    </span>
                  ) : (
                    <span className="pointer-events-none flex items-center gap-2 text-gray-400">
                      Select where your collection center would be
                    </span>
                  )}

                  <span className="pointer-events-none ">
                    <DropdownIcon />
                  </span>
                </button> */}

                {/* <div
                  className={`absolute border bg-white type-menu  ${
                    centerDropdown ? 'show' : ''
                  } large-dropdown large-dropdown px-3 py-3 shadow-md rounded-md w-full h-28 max-w-full overflow-y-auto scrollbar-change fade-in`}
                >
                  <div className=" py-4">
                    {centers &&
                      centers.map((item, index) => (
                        <button
                          className={`flex items-center py-3 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full ${
                            selectedCenter && selectedCenter.id === item.id
                              ? 'bg-gray-100'
                              : 'bg-white'
                          } `}
                          type="button"
                          key={index}
                          onClick={() => SelectCenter({ item, index })}
                        >
                          <p className="text-gray-700 font-normal text-base px-2">
                            {item.title}
                          </p>
                        </button>
                      ))}
                  </div>
                </div> */}
              </div>
            </div>

            {/* // border-l border-[#E6E3E3] border-r */}
          </div>

          <div className="flex justify-center items-center mx-auto w-1/2">
            <button
              className="px-8 py-3 rounded-full shadow-md bg-[#DD7D37] hover:shadow-lg text-white transition duration-150 ease-in-out border-0 w-full"
              type="submit"
              onSubmit={(e)=>submitForm(e)}
            >
              Create Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ConfirmVerifyOffer({ show, setShow }) {
  return (
    <div>
      <div className={`modal__box ${show ? 'show' : ''}`}>
        <div className="modal__box-wrapper alert--bx shadow-lg rounded-2xl">
          <div className="flex items-start justify-between mb-6">
            <div className="grow">
              <h1 className="text-2xl font-semibold mb-3">
                Are you sure of this offer?
              </h1>

              <p className="text-base text-gray-500">
                Please note that this offer cannot be edited once it has been
                created and placed on the market
              </p>
            </div>

            <button
              className=" flex items-center rounded-full border-2 border-gray-700 absolute top-3 right-2  "
              onClick={() => setShow(false)}
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
          </div>

          <div className="flex items-center justify-center gap-4 mt-5 mx-auto">
            <button
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-full"
              type="button"
              onClick={() => setShow(false)}
            >
              Go back to offer
            </button>
            <button
              className="px-4 py-2 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full"
              onClick={confirm}
            >
              Yes, I'm sure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
