import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import DropdownIcon from './Icons/DropdownIcon';

const ConectWallet = ({ page }) => {
  const router = useRouter();

  const user = localStorage.getItem('user');
  // redirect authenticated user to profile screen
  const [showFormDropdown, setShowFormDropdown] = useState();

  const toggleFormDropdown = () => {
    setShowFormDropdown(!showFormDropdown);
  };

  console.log(page, 'page');
  return (
    <div className="w-full">
      <div className="mb-10 text-left">
        <h2 className="text-4xl font-semibold text-gray-700 capitalize  mb-3">
          Connect Wallet
        </h2>
        <p className="mt-3 text-gray-500 ">
          Kindly connect wallet in order to place offer on the marketplace
        </p>
      </div>
      <form>
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <label className="text-gray-700 font-medium" htmlFor="token">
              Wallet Type<span>*</span>
            </label>
          </div>
          <div
            className="dropdown relative grow mb-4 w-full"
            data-large-dropdown=""
          >
            <button
              className="w-full bg-white h-12 focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease"
              id="token"
              data-large-dropdown-btn=""
              type="button"
              onClick={toggleFormDropdown}
            >
              <span className="pointer-events-none flex items-center gap-2 text-gray-600">
                <img src="/images/metamask.png" className="h-8 w-8" />
                Metamask
              </span>
              <span className="pointer-events-none ">
                <DropdownIcon />
              </span>
            </button>

            <div
              className={` absolute border bg-white form-submenu ${
                showFormDropdown ? 'show' : ''
              } large-dropdown px-3 py-3 shadow-md rounded-md w-full h-40 max-w-full overflow-y-auto scrollbar-change fade-in`}
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

        <button
          type="submit"
          className="inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md bg-[#DD7D37] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full"
        >
          Create Account
        </button>

        <div className="flex items-center justify-center mt-5">
          <span className="">Don't have any wallet?</span>
          <Link href="/signup">
            <a className=" text-[#DD7D37] ml-2 underline">Find out how</a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ConectWallet;
