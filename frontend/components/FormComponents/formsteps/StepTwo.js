import React, { useState, useEffect } from 'react';
import DropdownIcon from '../../Icons/DropdownIcon';
import FormTimer from '../FormTimer';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';

const StepTwo = ({
  handleClick,
  currentStep,
  steps,
  data,
  quantity,
  delivery,
}) => {
  const [uploadProofBtn, setUploadProofBtn] = useState();
  const [showDetails, setShowDetails] = useState();
  const [proofImg, setProofImg] = useState();
  const [description, setDescription] = useState();
  const [deliveryId, setDeliveryId] = useState();

  const handleShowRequest = () => {
    setShowDetails(!showDetails);
  };

  const handleUploadProofBtn = () => {
    setUploadProofBtn(!uploadProofBtn);
  };

  const upload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dlnrf91ax/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'k7fvlrzw';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.secure_url !== '') {
          console.log(res);
          setProofImg(res.secure_url);
        }
      })
      .catch((err) => {
        console.error(err);
      });
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

  console.log(delivery.id);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log(currentStep);
    const payload = JSON.stringify({
      delivery_size: quantity,
      delivery_proof: proofImg,
      collector_wallet_address: address,
      requestId: data.id,
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/deliveries/${deliveryId}/completion`,
      {
        method: 'POST',
        body: payload,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const delivery = await res.json();

    handleClick('next');
  };

  useEffect(() => {
    if (delivery) {
      setDeliveryId(delivery.id);
    }
  }, [delivery]);

  return (
    <>
      <div className="fade-in">
        <div className="py-4 px-3">
          <p className="text-sm text-[#DD7D37] font-semibold text-left">
            Once you've gathered enough plastics, click on “Complete Request” to
            signal that you're ready to deliver the plastic items in the dropoff
            center. Make sure to deliver before the expiry date!
          </p>
        </div>

        <FormTimer request={data} />

        {/* </div> */}

        <div className="px-6 py-6  border border-gray-300 rounded-lg">
          <div>
            <div className="grid grid-cols-2 gap-4 gap-y-9 py-3">
              <div className="flex-1 w-full col-span-2">
                <span className="text-gray-700 font-base mb-3">Location</span>
                <div className="w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                  Ikeja
                </div>
              </div>
              <div className="flex-1">
                <span className="text-gray-700 font-base mb-3">
                  Category of Scrap
                </span>
                <div className="w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                  {data?.scrap_category.name}
                </div>
              </div>
              <div className="flex-1">
                <span className="text-gray-700 font-base mb-3">
                  Type of Scrap
                </span>
                <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                  {data?.scrap_subcategory?.name}
                </div>
              </div>

              <div className="flex-1">
                <span className="text-gray-700 font-base mb-3">
                  Delivery Size
                </span>
                <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center gap-3 text-sm">
                  {quantity} kg
                </div>
                <small className="text-xs font-thin">
                  This quantity updates as collectors deliver{' '}
                </small>
              </div>
              <div className="flex-1">
                <span className="text-gray-700 font-base mb-3">
                  Amount to be disbursed
                </span>
                <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                  {data.amount_per_unit * quantity} TRX
                </div>
              </div>
              <div className="flex-1 w-full col-span-2">
                <span className="text-gray-700 font-base mb-3">
                  Description
                </span>
                <div className="w-full px-4 py-4 mt-2 text-[#6B7280] bg-gray-100   focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm h-24">
                  {data && data.description}
                </div>
              </div>

              <div className="flex-1 w-full col-span-2">
                <span className="text-gray-700 font-base mb-3">
                  Dropoff Center
                </span>
                <div className="w-full py-2 mt-2 text-[#6B7280] rounded-md  flex items-start text-sm gap-2">
                  <div>
                    <img src="/images/gps.svg" />
                  </div>
                  <span>9.0820° N, 8.6753° E</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center flex-col md:flex-row gap-4 mt-5 mx-auto w-full">
              <button
                className="px-9 py-3  border border-gray-300 bg-white text-gray-700  rounded-full w-full md:w-1/2 "
                onClick={() => handleClick()}
              >
                Cancel Request
              </button>
              <button
                className="px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full w-full md:w-1/2 "
                onClick={() => handleUploadProofBtn('next')}
              >
                Deliver Plastics
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`modal__box ${uploadProofBtn ? 'show' : ''}`}>
        <div
          className="modal__box-wrapper shadow-lg rounded-2xl"
          style={{ overflow: 'auto' }}
        >
          <div className="w-full flex items-center justify-end">
            <button
              className="  rounded-full border-2 border-gray-700   "
              onClick={handleUploadProofBtn}
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

          {/* <div className="px-6 py-6  border border-gray-300 rounded-lg"> */}
          <div>
            <form onSubmit={handleFormSubmit}>
              <div className="py-4">
                <div className="mb-4 pb-3">
                  <h3 className="text-2xl">Delivery Details</h3>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-600 font-medium text-base">
                      How much Kg are you dropping off?
                    </label>
                  </div>
                  <div className=" relative grow mb-4 w-full">
                    <input
                      className="w-full bg-white h-12 focus:outline-none active:outline-none text-sm  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease"
                      defaultValue={`${quantity}`}
                      readOnly
                    />
                    <div className="flex items-center justify-start mt-1 text-sm text-[#878A90] gap-1">
                      <small className="text-sm">
                        You would receive{' '}
                        <span className="font-bold text-gray-700 text-base">
                          {data.amount_per_unit * quantity} TRX{' '}
                        </span>
                      </small>
                      / EcoMarket would collect{' '}
                      <small className="font-bold text-gray-700  text-base">
                        {' '}
                        {data.amount_per_unit * quantity * 0.02} TRX
                      </small>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="">
                    <label
                      className="text-gray-600 text-base  font-medium"
                      htmlFor=""
                    >
                      Upload Proof (Compulsory)
                    </label>
                    <p className="text-sm text-[#878A90]">
                      Upload proof of delivery less than 3mb (see{' '}
                      <a href="#" className="underline">
                        instructions
                      </a>
                      )
                    </p>
                  </div>
                  <div className="flex">
                    <button
                      className=" bg-white focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease text-[#6D747D]"
                      type="button"
                      onClick={() => {
                        document.getElementById('proof_img').click();
                      }}
                    >
                      <span>
                        <svg
                          className="h-12 w-12"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.5 4.16675V15.8334"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M4.66406 10H16.3307"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </span>
                    </button>

                    <input
                      type="file"
                      className="hidden"
                      required
                      onChange={upload}
                      id="proof_img"
                    />
                  </div>
                </div>
                {proofImg && (
                  <div className="ml-2 bg-white focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease text-[#6D747D]">
                    <img src={proofImg} alt="" className="w-full" />
                  </div>
                )}
                {/* <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium text-base">
                      Description
                    </label>
                  </div>
                  <div className=" relative grow mb-4 w-full h-full">
                    <textarea
                      className="w-full bg-white focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease"
                      rows="4"
                      required
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div> */}
              </div>

              <div className="flex items-center justify-center flex-col  gap-4 mt-5 mx-auto w-full">
                {/* <button
                className="px-9 py-3  border border-gray-300 bg-white text-gray-700  rounded-full w-full"
                onClick={() => handleUploadProofBtn()}
              >
                Cancel Request
              </button> */}
                <button
                  className="px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full  w-full "
                  type="submit"
                >
                  Upload Proof of Delivery
                </button>
              </div>
            </form>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default StepTwo;
