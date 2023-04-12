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
import backend from './services/backend';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const truncateAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ModToast({ open, handleClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Account Created!
      </Alert>
    </Snackbar>
  );
}

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
  const [open, setOpen] = React.useState(false);

  const user = localStorage.getItem('user');
  // redirect authenticated user to profile screen
  const [showFormDropdown, setShowFormDropdown] = useState();

  const toggleFormDropdown = () => {
    setShowFormDropdown(!showFormDropdown);
  };

  const [company, setCompany] = useState(null);
  const [collector, setCollector] = useState(null);

  const handleClose = (event) => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(address);

    // if(connected && address && (company != null || collector != null)){
    //   backend.save
    // }
    // select('TronLink');
  }, [address]);

  const CreateUser = () => {
    if (page == 'company') {
      // let address = 'testaddress'
      backend
        .createCompany(address)
        .then((company) => {
          if (company.status == true) {
            localStorage.setItem('company', JSON.stringify(company.data));

            setCompany(company.data);
            setOpen(true);
            setTimeout(function () {
              router.push(`/${page}/dashboard`);
            }, 2000);
          } else {
            localStorage.setItem('company', JSON.stringify(company.data));
            setTimeout(function () {
              router.push(`/${page}/dashboard`);
            }, 200);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      // let address = '7889800'
      backend
        .createCollector(address)
        .then((collector) => {
          if (collector.status == true) {
            localStorage.setItem('collector', JSON.stringify(collector.data));
            setCollector(collector.data);
            setOpen(true);
            setTimeout(function () {
              router.push(`/${page}/dashboard`);
            }, 2000);
          } else {
            setTimeout(function () {
              router.push(`/${page}/dashboard`);
            }, 200);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    router.prefetch(`/${page}/dashboard`);
  }, []);

  return (
    <>
      <ModToast open={open} handleClose={handleClose} />

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

            <button
              onClick={CreateUser}
              className="inline-block px-7 py-3 text-white text-center font-medium text-sm leading-snug uppercase rounded-full shadow-md bg-[#DD7D37] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full"
            >
              Continue
            </button>
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
                <a className=" text-[#DD7D37] ml-2 underline">Find out how</a>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ConectWallet;
