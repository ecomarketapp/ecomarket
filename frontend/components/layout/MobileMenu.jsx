import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';

const MobileMenu = ({ show, dismiss, onClickGetStarted, onHowItWorks }) => {
  const [dropdown, setDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState();

  const router = useRouter();

  const user = null;
  const ref = useRef();

  const depthLevel = 0;
  const dropdownClass = depthLevel > 1 ? 'inner-menu' : '';

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(!dropdown);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };
  const ToggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };
  const handleGetStarted = () => {
    dismiss();
    setShowUserMenu(false)
    onClickGetStarted();
  };
  const handleHowItWorks = () => {
    dismiss();
    setShowUserMenu(false)
    onHowItWorks();
  };

  function redirectHowItWorks() {
    router.push('/');
    // setTimeout(function(){
    // onHowItWorks()

    // })
  }

  return (
    <>
      <div
        className={`w-full bg-slate-500 h-full sidemenu ${show ? 'show' : ''}`}
      >
        <nav className="flex items-center flex-col px-4 py-4 h-full">
          <div className="w-full text-center flex items-center justify-between mb-5">
            <Link href="/">
              <a className="text-xl text-gray-800 font-semibold font-heading h-12 w-36 relative block">
                <Image
                  src={'/images/ecomarket-logo.png'}
                  alt={'logo'}
                  layout="fill"
                  priority
                  className=" object-contain"
                />
              </a>
            </Link>

            <button onClick={(e) => {
                              dismiss();
                              setShowUserMenu(false);
                            }}  className="p-3    ">
              <span>
                <svg
                  className="h-7 w-7 "
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
          <div className="w-full h-full">
            <div className="navbar-menu flex items-center justify-center flex-col gap-6 h-full ">
              {/* <Link href="/marketplace">
                <a className="block lg:inline-block lg:mt-0 text-blue-900 hover:text-indigo-600 px-5 text-2xl">
                  MarketPlace
                </a>
              </Link> */}
              <button
                onClick={
                  router.asPath === '/' ? handleHowItWorks : redirectHowItWorks
                }
                className="block lg:inline-block lg:mt-0 text-blue-900 hover:text-indigo-600 px-5 text-2xl"
              >
                How it Works
              </button>

              <div className="flex items-center justify-center relative gap-4 w-full ">
                <div className=" relative w-full">
                  <button
                    className=" text-blue-900 hover:text-indigo-600 px-5 cursor-pointer text-2xl w-full"
                    onClick={ToggleUserMenu}
                  >
                      {/* <span className="text-sm">{currentUser && currentUser.user.name}</span> */}
                      <span>
                      Features
                      </span>
                    <ExpandMoreIcon />
                  </button>

                  <div
                    className={`absolute user-menu ${
                      showUserMenu ? 'show' : ''
                    } dropdown-menu large-dropdown shadow-md rounded-md w-full border-0 fade-in transition duration-300 ease bg-white`}
                  >
                    <div className=" py-2">
                      <Link href="/">
                        <a className="flex items-center py-2 px-4 text-sm justify-start bg-white border-0 w-full hover:bg-gray-100 ">
                          EcoMarket Marketplace
                        </a>
                      </Link>
                      <Link href="/">
                        <a className="flex items-center py-2 px-4 text-sm justify-start bg-white border-0 w-full hover:bg-gray-100 ">
                          EcoMarket NFT - EcoCredit
                        </a>
                      </Link>
                      <Link href="/">
                        <a className="flex items-center py-2 px-4 text-sm justify-start bg-white border-0 w-full hover:bg-gray-100 ">
                          EcoMarket Tracking
                        </a>
                      </Link>
                      <Link href="/">
                        <a className="flex items-center py-2 px-4 text-sm justify-start bg-white border-0 w-full hover:bg-gray-100 ">
                          Token-based Governance
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div
                className="block lg:inline-block relative cursor-pointer"
                ref={ref}
                onMouseLeave={onMouseEnter}
              >
                <a
                  className=" mt-4 lg:mt-0  text-blue-900 hover:text-indigo-600 px-5 cursor-pointer text-2xl"
                  onMouseEnter={onMouseEnter}
                >
                  Features
                  <ExpandMoreIcon />
                </a>

                <div
                  className={`absolute user-menu ${(depthLevel = 3)} ${dropdownClass} ${
                    dropdown ? 'show' : ''
                  } dropdown-menu large-dropdown shadow-md rounded-md w-full border-0 fade-in transition duration-300 min-w-max ease bg-white`}
                >
                  <div className=" py-2">
                    <Link href="/">
                      <a className="flex items-center py-2 px-4 text-sm justify-start bg-white border-0 w-full hover:bg-gray-100 ">
                        EcoMarket Marketplace
                      </a>
                    </Link>
                    <Link href="/">
                      <a className="flex items-center py-2 px-4 text-sm justify-start bg-white border-0 w-full hover:bg-gray-100 ">
                        EcoMarket NFT - EcoCredit
                      </a>
                    </Link>
                    <Link href="/">
                      <a className="flex items-center py-2 px-4 text-sm justify-start bg-white border-0 w-full hover:bg-gray-100 ">
                        EcoMarket Tracking
                      </a>
                    </Link>
                    <Link href="/">
                      <a className="flex items-center py-2 px-4 text-sm justify-start bg-white border-0 w-full hover:bg-gray-100 ">
                        Token-based Governance
                      </a>
                    </Link>
                  </div>
                </div>
              </div> */}

              {user ? (
                <Link href="collector/dashboard">
                  <a className="block lg:inline-block mt-4 lg:mt-0 hover:text-white hover:bg-[#DD7D37] text-[#DD7D37] bg-white hover:border-[#DD7D37] border border-[#DD7D37] rounded-full px-7 py-2 transition duration-300 ease">
                    0x346932...gq382nk
                  </a>
                </Link>
              ) : (
                <button
                  className="block lg:inline-block mt-4 lg:mt-0 text-white hover:text-[#DD7D37] hover:bg-white hover:border-[#DD7D37] border bg-[#DD7D37] rounded-full px-9 py-3 transition duration-300 ease"
                  onClick={handleGetStarted}
                >
                  Get Started
                </button>

                // <WalletConnectButton className='block lg:inline-block mt-4 lg:mt-0 text-white hover:text-[#DD7D37] hover:bg-white hover:border-[#DD7D37] border bg-[#DD7D37] rounded-full px-9 py-3 transition duration-300 ease'/>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
