import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import ExpandMoreHorizontal from '../Icons/ExpandMoreHorizontal';

const truncateAddress = (address) => {
  if (address) return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const Sidebar = ({ show, dismiss }) => {
  const [dropdown, setDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState();

  const router = useRouter();

  const ToggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
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

  return (
    <>
      <div
        className={`w-full bg-slate-500 h-full sidemenu dashboard ${
          show ? 'show' : ''
        }`}
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

            <button onClick={dismiss} className="p-3    ">
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
            {connected && (
              <div className="navbar-menu flex items-start justify-start flex-col gap-2 h-full ">
                <Link href="/company/dashboard">
                  <a
                    className={`block lg:inline-block lg:mt-0 text-[#5B5B5B]  hover:bg-[#FEF0E6] px-3 py-3 w-full rounded-md transition-all duration-200 ease-in-out ${
                      router.asPath === '/company/dashboard' && 'bg-[#FEF0E6]'
                    }`}
                  >
                    Dashboard
                  </a>
                </Link>

                <Link href="#">
                  <a
                    className={`block lg:inline-block lg:mt-0 text-[#5B5B5B]  hover:bg-[#FEF0E6] px-3 py-3 w-full rounded-md transition-all duration-200 ease-in-out ${
                      router.asPath === '/transfer' && 'bg-[#FEF0E6]'
                    }`}
                  >
                    Disputes (coming soon)
                  </a>
                </Link>
                <Link href="/company/wallet">
                  <a
                    className={`block lg:inline-block lg:mt-0 text-[#5B5B5B]  hover:bg-[#FEF0E6] px-3 py-3 w-full rounded-md transition-all duration-200 ease-in-out ${
                      router.asPath === '/wallet' && 'bg-[#FEF0E6]'
                    }`}
                  >
                    Wallet
                  </a>
                </Link>

                <div className="flex-col flex w-full gap-2">
                  <div className="flex items-center justify-center relative gap-4 w-full ">
                    <div className=" relative w-full">
                      <button
                        className="flex items-center justify-center gap-2 bg-gray-100 py-3 px-5 rounded-full w-full"
                        onClick={ToggleUserMenu}
                      >
                        <div className="flex items-start justify-start flex-col">
                          {/* <span className="text-sm">{currentUser && currentUser.user.name}</span> */}
                          <span className="text-xs">
                            {/* {truncateAddress(address)} */}
                          </span>
                        </div>
                        <ExpandMoreHorizontal />
                      </button>

                      <div
                        className={`absolute user-menu ${
                          showUserMenu ? 'show' : ''
                        } dropdown-menu large-dropdown shadow-md rounded-md w-full border-0 fade-in transition duration-300 ease bg-white`}
                      >
                        <div className=" py-2">
                          <Link href="/collector/profile">
                            <a className="flex items-center py-2 px-4 text-sm justify-start bg-white border-0 w-full hover:bg-gray-100 ">
                              Profile
                            </a>
                          </Link>
                          <button
                            className="flex items-center py-2 px-4 text-sm justify-start bg-white border-0 w-full hover:bg-gray-100 "
                            onClick={(e) => {
                              disconnect();
                              router.replace('/');
                            }}
                          >
                            <span className="mr-3">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.89844 7.55999C9.20844 3.95999 11.0584 2.48999 15.1084 2.48999H15.2384C19.7084 2.48999 21.4984 4.27999 21.4984 8.74999V15.27C21.4984 19.74 19.7084 21.53 15.2384 21.53H15.1084C11.0884 21.53 9.23844 20.08 8.90844 16.54"
                                  stroke="#EF4444"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M15.0011 12H3.62109"
                                  stroke="#EF4444"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
                                  stroke="#EF4444"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </span>
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="inline-block text-sm leading-none rounded-full border-[#FDEFE5] border-4 lg:mt-0 w-14 h-14 ">
                    <img
                      src="/images/avatar-1.png"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </span>
                </div>
              </div>
            )}

            {!connected && (
              <div className="navbar-menu flex items-start justify-start flex-col gap-2 h-full ">
                {!connected && (
                  <button className="flex items-center gap-2 bg-gray-100 py-3 px-5 rounded-full">
                    <div className="flex items-start justify-start flex-col">
                      <a
                        href={`${window.location.origin}/connect-wallet/${
                          window.location.pathname.split('/')[1]
                        }`}
                        className="text-xs"
                      >
                        Connect Wallet
                      </a>
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
