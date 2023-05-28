import Link from 'next/link';
import React, { useState } from 'react';

const GetStartedModal = ({ show, setShow }) => {
  const [getStartedBtn, setGetStartedBtn] = useState(false);

  const handleClickGetStarted = (type) => {
    if (type == 'company') {
      setGetStartedBtn(1);
    } else if (type == 'collector') {
      setGetStartedBtn(2);
    }
  };
  return (
    <div className={`modal__box ${show ? 'show' : ''}`}>
      <div className="modal__box-wrapper get__started__modal shadow-lg rounded-2xl">
        <div className=" mb-6">
          <div className="flex items-center justify-center flex-col gap-3 grow">
            <div>
              <img src="/images/ecomarket-logo.svg" />
            </div>

            <p className="mb-3">Select your role</p>
          </div>

          <button
            className=" flex items-center rounded-full border-2 border-gray-700 absolute top-3 right-2  "
            onClick={() => (setShow(false), setGetStartedBtn(0))}
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

        <div className="flex items-center justify-around py-8 my-6 get-started__btns">
          <button
            className={`flex items-center flex-col gap-4 com__btn px-7 py-4 rounded-lg border  hover:border hover:border-[#DD7D37] transition duration-150 ease-in-out ${
              getStartedBtn == 1 ? 'border-[#DD7D37]' : 'border-white'
            }`}
            onClick={() => handleClickGetStarted('company')}
          >
            <div>
              <img src="/images/company.svg" />
            </div>
            <span>Company</span>
          </button>
          <button
            className={`flex items-center flex-col gap-4 col__btn px-7 py-4 rounded-lg border  hover:border hover:border-[#DD7D37] transition duration-150 ease-in-out ${
              getStartedBtn == 2 ? 'border-[#DD7D37]' : 'border-white'
            }`}
            onClick={() => handleClickGetStarted('collector')}
          >
            <div className="p-4">
              <img src="/images/users.svg" />
            </div>

            <span>Collector</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 mt-5 mx-auto w-full">
          <Link
            href={`${
              getStartedBtn == 1
                ? '/connect-wallet/company'
                : '/connect-wallet/collector'
            }`}
          >
            <a
              className={`px-9 py-2 border border-[#DD7D37] bg-[#DD7D37] text-white hover:shadow-lg rounded-full w-1/2 transition duration-150 ease-in-out flex items-center justify-center get__started__link ${
                getStartedBtn == 0 ? 'disabled' : ''
              }`}
            >
              Continue
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStartedModal;
