import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import DropdownIcon from './Icons/DropdownIcon';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import {
  WalletActionButton,
  WalletConnectButton,
  WalletDisconnectButton,
  WalletModalProvider,
  WalletSelectButton,
} from '@tronweb3/tronwallet-adapter-react-ui';

const truncateAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const ConectWallet = ({ page }) => {
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
  const router = useRouter();

  const user = localStorage.getItem('user');
  // redirect authenticated user to profile screen
  const [showFormDropdown, setShowFormDropdown] = useState();

  const toggleFormDropdown = () => {
    setShowFormDropdown(!showFormDropdown);
  };

  useEffect(() => {
    // select('TronLink');
  }, []);
  return (
    <div className="w-full">
      {connected && (
        <>
          <div className="mb-6">
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
                  <img src="/images/tronlink.png" className="h-8 w-8" />
                  TronLink (Connected: {truncateAddress(address)})
                </span>
                <span className="pointer-events-none ">
                  <DropdownIcon />
                </span>
              </button>
            </div>
          </div>

          <a
            href={`/${page}/dashboard`}
            className="inline-block px-7 py-3 text-white text-center font-medium text-sm leading-snug uppercase rounded-full shadow-md bg-[#DD7D37] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full"
          >
            Dashboard
          </a>
        </>
      )}

      {!connected && (
        <>
          <div className="mb-10 text-left">
            <h2 className="text-4xl font-semibold text-gray-700 capitalize  mb-3">
              Connect Wallet
            </h2>
            <p className="mt-3 text-gray-500 ">
              Kindly connect wallet in order to place offer on the marketplace
            </p>
          </div>

          {<WalletActionButton />}

          <div className="flex items-left justify-left mt-5">
            <span className="">Don't have TronLink wallet?</span>
            <Link href="https://www.tronlink.org/">
              <a className=" text-[#DD7D37] ml-2 underline">Get a wallet now</a>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ConectWallet;
