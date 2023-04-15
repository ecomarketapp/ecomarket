import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import CompanyLayout from '../../../../../components/CompanyLayout/Layout';

import { Tabs } from 'react-tabs';
import Tab from 'react-tabs/lib/components/Tab';
import TabList from 'react-tabs/lib/components/TabList';
import TabPanel from 'react-tabs/lib/components/TabPanel';

import { useRouter } from 'next/router';
import Waiting from '../../../../../components/Waiting';
import {
  dateConv,
  getRequestById,
  findProfile,
  getRequestDelivery,
} from '../../../../../utils/utils';
import Web3 from 'web3';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';

const DropOffs = () => {
  const [createDispute, setCreateDispute] = useState();
  const [requestSuccessModal, setRequestSuccessModal] = useState();
  const [allowApprovalModal, setAllowApprovalModal] = useState(false);

  const handleDispute = () => {
    setCreateDispute(!createDispute);
  };
  const submitDispute = () => {
    setCreateDispute(false);
    setRequestSuccessModal(!requestSuccessModal);
  };

  const [offerId, setOfferId] = useState();
  const [offer, setOffer] = useState();
  const [requests, setRequests] = useState([]);
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [approveRequest, setApproveRequest] = useState();
  const [collector, setCollector] = useState();

  const router = useRouter();

  useEffect(() => {
    setOfferId(router.query.id);
  });

  const getOffer = async () => {
    const offer = await getRequestById(offerId);

    console.log(offer);
    setOffer(offer.data);
  };

  const getRequests = async () => {
    const requests = await getRequestDelivery(offerId);

    console.log(requests);
    setRequests(requests.data);
    setPending(requests.data.pending_approval);
    setApproved(requests.data.approved);
  };

  const { address, signMessage } = useWallet();

  const web3 = new Web3(Web3.givenProvider);

  const handleApproveRequest = async () => {
    const amount = offer.total_amount;
    const nonce = 10;
    const companyHex = window.tronWeb.address
      .toHex(address)
      .replace('41', '0x');
    const collectorHex = window.tronWeb.address
      .toHex(collector)
      .replace('41', '0x');

    const messageHash = web3.utils.soliditySha3(
      collectorHex,
      amount,
      nonce,
      companyHex
    );

    // const signature
    const signature = await window.tronWeb.trx.sign(messageHash);

    const payload = JSON.stringify({
      approver_signature: signature,
      approver_wallet_address: address,
      requestId: offerId,
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/deliveries/${approveRequest}/approval`,
      {
        method: 'POST',
        body: payload,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await res.json();

    console.log(data);

    window.location.reload();

    console.table({ messageHash, signature: signature });

    // r: '0xea2e552ffc2ee639ddd59d51131079dc5ffaa75c7bbc9f79d536585221b6813c';
    // recoveryParam: 0;
    // s: '0x4f81abae440c9ff4f2db59d9686d9ea65e4c16e92bc892c1913373e42366574c';
    // v: 27;

    //Message
    //0xa642f660baabc56639f67a3bb25a690e9c4ead9ab7d784491f9befa3aba2adfd

    // Signature
    // "0xea2e552ffc2ee639ddd59d51131079dc5ffaa75c7bbc9f79d536585221b6813c4f81abae440c9ff4f2db59d9686d9ea65e4c16e92bc892c1913373e42366574c1b"
  };

  const runam = async () => {
    const ethers = tronWeb.utils.ethersUtils;
    let contract = await tronWeb.contract().at(contract_address);
    let signingKey = new ethers.SigningKey(tronWeb.defaultPrivateKey);

    let message = 'This is some message';
    let messageBytes = ethers.toUtf8Bytes(message);
    let messageDigest = ethers.keccak256(messageBytes);

    let signature = signingKey.signDigest(messageDigest);
    let hexAddress = await contract
      .recoverAddr(messageDigest, signature.v, signature.r, signature.s)
      .call();

    console.log(hexAddress);
  };

  useEffect(() => {
    if (offerId) {
      getOffer();
    }
  }, [offerId]);

  useEffect(() => {
    if (offer) {
      getRequests();
    }
  }, [offer]);

  return (
    <>
      <CompanyLayout>
        <section>
          <div className="container eco__orders mx-auto px-6">
            {offer && (
              <div className="h-full pb-24 md:px-4 py-12">
                <div className="flex items-center py-6 mb-8 flex-col lg:flex-row ">
                  <div className="flex-1 w-full flex-col items-start">
                    <h3 className="h2">{offer.title}</h3>
                    <p>{offer?.collection_center?.title}</p>
                  </div>

                  <div className="mt-1 relative rounded-full flex-1  items-center grow flex w-full ">
                    <div className="rounded-full w-full bg-gray-200 h-2">
                      <div
                        className="bg-[#DD7D37] h-2 rounded-full wrapper relative "
                        style={{ width: '55%' }}
                      ></div>
                    </div>

                    <div className="h-12 w-12">
                      <img
                        src="/images/plastics.svg "
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <Tabs>
                  <div className="flex items-center py-4 mb-3 flex-col lg:flex-row border-b border-gray-200 ">
                    <div className="flex-1 w-full">
                      <h5 className=" text-2xl text-gray-700">Dropoffs</h5>
                    </div>

                    <TabList className="flex flex-row items-center justify-end  tabs-header rounded-md gap-3">
                      <Tab className="">
                        <button className="flex items-center text-sm border-white border-1 px-5 py-2 rounded h-12">
                          Pending Approval
                        </button>
                      </Tab>
                      <Tab className="">
                        <button className="flex items-center text-sm border-white border-1 px-5 py-2 rounded h-12">
                          Approved
                        </button>
                      </Tab>
                    </TabList>
                  </div>

                  <div className=" py-6">
                    <TabPanel>
                      <div className=" w-full bg-white mt-3 md:mt-0  relative overflow-hidden rounded h-full fade-in">
                        <div className=" py-6 w-full relative">
                          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-x-12 gap-y-4">
                            {pending.map((request, index) => (
                              <div className="flex flex-col" key={index}>
                                <div className="flex items-center py-4 px-4 mb-2 text-sm w-full border-b bg-gray-100 border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out">
                                  <div className="flex items-start gap-4 w-full">
                                    <div className="h-12 w-12 ">
                                      <img
                                        src="/images/avatar-1.png"
                                        className="w-full object-cover rounded-full  "
                                      />
                                    </div>

                                    <div className="w-full grow">
                                      <div className="flex gap-1 items-center flex-row justify-between w-full">
                                        <p className="text-lg text-[#5B5B5B] font-semibold">
                                          {request.collector.name}{' '}
                                          <span className="font-thin text-graay-400 text-xs">
                                            {dateConv(request.createdAt)}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="flex gap-1 flex-row justify-between items-center w-full">
                                        <p className="text-sm  text-[#5B2D0B] font-normal">
                                          <span className="font-thin text-[#5B5B5B] text-xs">
                                            Requesting to fulfill your offer
                                          </span>{' '}
                                        </p>
                                      </div>
                                      <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                                        <div className="p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center">
                                          <img src="/images/Icon.png" alt="" />
                                        </div>
                                        <div className="flex gap-1 flex-col items-start w-full">
                                          <p className="text-base  text-[#344054] font-normal">
                                            {' '}
                                            {request.delivery_size}kg out of{' '}
                                            {offer.quantity_remaining}kg
                                            remaining
                                          </p>
                                          <p className="text-sm  text-[#667085] font-normal">
                                            --
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center justify-end">
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setApproveRequest(request.id);
                                            setCollector(
                                              request.collector.wallet_address
                                            );
                                            setAllowApprovalModal(true);
                                          }}
                                          className="text-white text-xs px-4 py-2 bg-[#DD7D37] rounded-md "
                                        >
                                          approve request
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {pending.length === 0 && (
                          <div className=" w-full bg-white mt-3 md:mt-0  relative overflow-hidden rounded h-full fade-in">
                            <div className="flex items-center justify-center flex-col gap-4">
                              <img src="/images/file-not-found.svg" />
                              <p>There no pending transactions to approve.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className=" w-full bg-white mt-3 md:mt-0  relative overflow-hidden rounded h-full fade-in">
                        <div className=" py-6 w-full relative">
                          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-x-12 gap-y-4">
                            {approved.map((request, index) => (
                              <div className="flex flex-col" key={index}>
                                <div className="flex items-center py-4 px-4 mb-2 text-sm w-full border-b bg-gray-100 border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out">
                                  <div className="flex items-start gap-4 w-full">
                                    <div className="h-12 w-12 ">
                                      <img
                                        src="/images/avatar-1.png"
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
                                            Requesting to fulfill your offer
                                          </span>{' '}
                                        </p>
                                      </div>
                                      <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                                        <div className="p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center">
                                          <img src="/images/Icon.png" alt="" />
                                        </div>
                                        <div className="flex gap-1 flex-col items-start w-full">
                                          <p className="text-base  text-[#344054] font-normal">
                                            {' '}
                                            {offer.title}
                                          </p>
                                          <p className="text-sm  text-[#667085] font-normal">
                                            --{' '}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center justify-end">
                                        <Link
                                          href={`/company/offers/1/dropoffs/1`}
                                        >
                                          <a className="text-white text-xs px-4 py-2 bg-[#DD7D37] rounded-md ">
                                            view dropoff
                                          </a>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {approved.length === 0 && (
                          <div className=" w-full bg-white mt-3 md:mt-0  relative overflow-hidden rounded h-full fade-in">
                            <div className="flex items-center justify-center flex-col gap-4 w-full">
                              <img src="/images/file-not-found.svg" />
                              <p>
                                There no approved transactions for dropoffs.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabPanel>
                  </div>
                </Tabs>
              </div>
            )}

            {!offer && <Waiting />}
          </div>
        </section>

        <div className={`modal__box ${createDispute ? 'show' : ''}`}>
          <div className="modal__box-wrapper shadow-lg rounded-2xl">
            <div className="flex items-start justify-between mb-6">
              <div className="grow">
                <h1 className="text-2xl font-semibold mb-3">Dispute</h1>

                <ul className="list-disc px-4">
                  <li className="text-sm text-gray-500">
                    Reasons for dispute would be both visible to both parties.{' '}
                  </li>
                  <li className="text-sm text-gray-500">
                    Baseless disputes would result to banning of account
                  </li>
                </ul>
              </div>

              <button
                className=" flex items-center rounded-full border-2 border-gray-700  "
                onClick={() => setCreateDispute(false)}
              >
                <span className="pointer-events-none flex items-center p-2">
                  <svg
                    className="h-5 w-5 "
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
            <form>
              <div>
                <div className="mb-3">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      Reasons for Dispute (Compulsory)
                    </label>
                  </div>
                  <div className=" relative grow mb-4 w-full">
                    <input className="w-full bg-white h-12 focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease" />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-medium">
                      Description
                    </label>
                  </div>
                  <div className=" relative grow mb-4 w-full h-full">
                    <textarea
                      className="w-full bg-white focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease"
                      placeholder="Kindly provide as much information as possible"
                      rows="5"
                    ></textarea>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="">
                    <label className="text-gray-700 font-medium">
                      Upload Proof (Compulsory)
                    </label>
                    <p className="text-sm text-gray-500">
                      Upload pictures, screenshots less than 3mb
                    </p>
                  </div>
                  <div className="relative grow w-full">
                    <button
                      className=" bg-white focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease text-[#6D747D]"
                      type="button"
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
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mt-5 mx-auto">
                <button
                  className="px-9 py-2 border border-gray-300 bg-white text-gray-700 rounded-full"
                  type="button"
                  onClick={handleDispute}
                >
                  Cancel
                </button>
                <button
                  className="px-9 py-2 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full "
                  type="button"
                  onClick={submitDispute}
                >
                  Send dispute
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className={`modal__box ${requestSuccessModal ? 'show' : ''}`}>
          <div className="modal__box-wrapper shadow-lg rounded-2xl">
            <div className="flex items-start justify-between mb-6">
              <div className="grow">
                <h1 className="text-2xl font-semibold mb-3">
                  Dispute has been sent
                </h1>

                <ul className="list-disc px-4">
                  <li className="text-sm text-gray-500">
                    The Individual would not be able to get his pay unless
                    dispute is resolved.
                  </li>
                </ul>
              </div>

              <button
                className=" flex items-center rounded-full border-2 border-gray-700 absolute top-3 right-2  "
                onClick={() => setRequestSuccessModal(false)}
              >
                <span className="pointer-events-none flex items-center p-2">
                  <svg
                    className="h-5 w-5 "
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
                className="px-9 py-2 border border-gray-300 bg-white text-gray-700 rounded-full"
                type="button"
              >
                Cancel
              </button>
              <Link href="/company/offers">
                <a className="px-9 py-2 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full ">
                  Back to Offers
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className={`modal__box ${allowApprovalModal ? 'show' : ''}`}>
          <div className="modal__box-wrapper shadow-lg rounded-2xl">
            <div className="flex items-start justify-between mb-6">
              <div className="grow">
                <h1 className="text-2xl font-semibold mb-3">
                  Approve this request
                </h1>

                <ul className="list-disc px-4">
                  The collector will be able to fulfill some or all of this
                  offer.
                </ul>
              </div>

              <button
                className=" flex items-center rounded-full border-2 border-gray-700 absolute top-3 right-2  "
                onClick={() => setAllowApprovalModal(false)}
              >
                <span className="pointer-events-none flex items-center p-2">
                  <svg
                    className="h-5 w-5 "
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
              {/* <button
                className="px-9 py-2 border border-gray-300 bg-white text-gray-700 rounded-full"
                type="button"
              >
                Cancel
              </button> */}
              <button
                onClick={handleApproveRequest}
                className="px-9 py-2 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full "
              >
                I understand
              </button>
            </div>
          </div>
        </div>
      </CompanyLayout>
    </>
  );
};

export default DropOffs;
