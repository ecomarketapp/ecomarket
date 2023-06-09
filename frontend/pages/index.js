import React, { useRef, useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useQuery, useInfiniteQuery } from 'react-query';
import LoadingState from '../components/LoadingState';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Link from 'next/link';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { InstagramEmbed } from 'react-social-media-embed';
import axios from 'axios';

// import InstagramEmbed from 'react-instagram-embed';
// import 'react-tabs/style/react-tabs.css';
import Head from 'next/head';
import Image from 'next/image';

const Home = () => {
  const resultRef = useRef(null);
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const fetchInstagramFeed = async () => {
  //     try {
  //       // Make a request to the Instagram Basic Display API
  //       const response = await axios.get(
  //         `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token=33637752489793e1c3c5e0a65676966e`
  //       );
  //       setPosts(response.data.data);
  //     } catch (error) {
  //       console.error('Error fetching Instagram feed:', error);
  //     }
  //   };

  //   fetchInstagramFeed();
  // }, []);

  return (
    <>
      <Head>
        <title>EcoMarket - Open Marketplace for Recycled Materials</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="EcoMarket" />
      </Head>
      <Layout resultRef={resultRef}>
        <section className="bg-white py-14">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center ">
              <div className="w-full md:w-5/6">
                <div>
                  <h1 className="text-5xl font-extrabold text-[#351F0F]">
                    Open Marketplace for Recycled Plastics
                  </h1>
                </div>
                <div className="mb-10 mt-5">
                  <p className="text-base text-[#3F3F3F]">
                    In order to fight plastic pollution, EcoMarket is an open
                    marketplace that connects buyers of used and recycled
                    plastics with individuals and businesses who want to donate
                    or sell them.
                  </p>
                </div>

                <div>
                  <Link href="/connect-wallet/collector">
                    <a className="rounded-full px-5 py-4 text-md bg-[#DD7D37] text-white">
                      Get Started as a Collector
                    </a>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div>
                  <img src="/images/hero_image.svg" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 bg-[#FFF4EE] how__it__works" ref={resultRef}>
          <div className="container mx-auto px-6">
            <div className="py-14">
              <div className="mb-9">
                <h2 className="h2 text-center text-xl">How it Works</h2>
              </div>

              <div>
                <Tabs>
                  <TabList className="flex flex-row items-center justify-center w-full tabs-header rounded-md gap-16 mb-6">
                    <Tab className="p-6 border-b-4 outline-none cursor-pointer tablist__header">
                      Company
                    </Tab>
                    <Tab className="p-6 border-b-4 outline-none cursor-pointer tablist__header">
                      Collector
                    </Tab>
                  </TabList>

                  <div className="tab-content py-10">
                    <TabPanel>
                      <div className="fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-y-8">
                          <div className="px-5">
                            <div className="flex items-center justify-center mb-5">
                              <div className="circle border-4 border-[#E2DFDD] w-24 h-24 rounded-full relative ">
                                <img
                                  className="rounded-full"
                                  src="/images/how-it-works/register-company.png"
                                />
                                <span className="absolute top-0 left-0 text-white rounded-full bg-[#DD7D37] p-3 w-3 h-3 z-10 flex items-center justify-center text-sm">
                                  1
                                </span>
                              </div>
                            </div>
                            <div className="text-center">
                              <h4>Create Account</h4>
                              <p className="text-sm">
                                Create an EcoMarket account with your TronLink
                                wallet and set up your company profile.
                              </p>
                            </div>
                          </div>
                          <div className="px-5">
                            <div className="flex items-center justify-center mb-5">
                              <div className="circle border-4 border-[#E2DFDD] w-24 h-24 rounded-full relative ">
                                <img
                                  className="rounded-full"
                                  src="/images/how-it-works/submit-2.png"
                                />
                                <span className="absolute top-0 left-0 text-white rounded-full bg-[#DD7D37] p-3 w-3 h-3 z-10 flex items-center justify-center text-sm">
                                  2
                                </span>
                              </div>
                            </div>

                            <div className="text-center">
                              <h4>Submit Request</h4>
                              <p className="text-sm">
                                Submit Requests for recycled and scrap plastics,
                                specifying the type, weight and dropoff
                                location.
                              </p>
                            </div>
                          </div>
                          <div className="px-5">
                            <div className="flex items-center justify-center mb-5">
                              <div className="circle border-4 border-[#E2DFDD] w-24 h-24 rounded-full relative ">
                                <img
                                  className="rounded-full"
                                  src="/images/how-it-works/cryptocurrency-tron.png"
                                />
                                <span className="absolute top-0 left-0 text-white rounded-full bg-[#DD7D37] p-3 w-3 h-3 z-10 flex items-center justify-center text-sm">
                                  3
                                </span>
                              </div>
                            </div>
                            <div className="text-center">
                              <h4>Make Payment</h4>
                              <p className="text-sm">
                                EcoMarket places your TRX in escrow, paying out
                                only to collectors who successfully fulfill your
                                requests without disputes.
                              </p>
                            </div>
                          </div>
                          <div className="px-5">
                            <div className="flex items-center justify-center mb-5">
                              <div className="circle border-4 border-[#E2DFDD] w-24 h-24 rounded-full relative ">
                                <img
                                  className="rounded-full"
                                  src="/images/how-it-works/plastic.png"
                                />
                                <span className="absolute top-0 left-0 text-white rounded-full bg-[#DD7D37] p-3 w-3 h-3 z-10 flex items-center justify-center text-sm">
                                  4
                                </span>
                              </div>
                            </div>
                            <div className="text-center">
                              <h4>Collect scrap & earn EcoCredits</h4>
                              <p className="text-sm">
                                Earn the EcoCredit NFT, which verifies your
                                company's commitment to sustainability.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center mt-8 pt-8">
                          <Link href="/connect-wallet/company">
                            <a className="text-white bg-[#DD7D37] px-12 py-3 text-sm border border-[#DD7D37] rounded-full">
                              Get Started as a Company
                            </a>
                          </Link>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className="fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-y-8">
                          <div className="px-5">
                            <div className="flex items-center justify-center mb-5">
                              <div className="circle border-4 border-[#E2DFDD] w-24 h-24 rounded-full relative ">
                                <img
                                  className="rounded-full"
                                  src="/images/how-it-works/register-collector.png"
                                />
                                <span className="absolute top-0 left-0 text-white rounded-full bg-[#DD7D37] p-3 w-3 h-3 z-10 flex items-center justify-center text-sm">
                                  1
                                </span>
                              </div>
                            </div>
                            <div className="text-center">
                              <h4>Join EcoMarket</h4>
                              <p className="text-sm">
                                Sign up on EcoMarket using your TronLink wallet,
                                and set up your profile, including your
                                locality.
                              </p>
                            </div>
                          </div>
                          <div className="px-5">
                            <div className="flex items-center justify-center mb-5">
                              <div className="circle border-4 border-[#E2DFDD] w-24 h-24 rounded-full relative ">
                                <img
                                  className="rounded-full"
                                  src="/images/how-it-works/plastic.png"
                                />
                                <span className="absolute top-0 left-0 text-white rounded-full bg-[#DD7D37] p-3 w-3 h-3 z-10 flex items-center justify-center text-sm">
                                  2
                                </span>
                              </div>
                            </div>

                            <div className="text-center">
                              <h4>Fulfill Requests</h4>
                              <p className="text-sm">
                                Get notified whenever new requests for plastic
                                waste are made in your locality, and indicate
                                interest in fulfilling the requests.
                              </p>
                            </div>
                          </div>
                          <div className="px-5">
                            <div className="flex items-center justify-center mb-5">
                              <div className="circle border-4 border-[#E2DFDD] w-24 h-24 rounded-full relative ">
                                <img
                                  className="rounded-full"
                                  src="/images/how-it-works/delivery-man.png"
                                />
                                <span className="absolute top-0 left-0 text-white rounded-full bg-[#DD7D37] p-3 w-3 h-3 z-10 flex items-center justify-center text-sm">
                                  3
                                </span>
                              </div>
                            </div>
                            <div className="text-center">
                              <h4>Dropoff Plastics</h4>
                              <p className="text-sm">
                                Once approved, gather the plastics, and then
                                drop them off at the collection center. Upload
                                proof of dropoff to EcoMarket.
                              </p>
                            </div>
                          </div>
                          <div className="px-5">
                            <div className="flex items-center justify-center mb-5">
                              <div className="circle border-4 border-[#E2DFDD] w-24 h-24 rounded-full relative ">
                                <img
                                  className="rounded-full"
                                  src="/images/how-it-works/coin.png"
                                />
                                <span className="absolute top-0 left-0 text-white rounded-full bg-[#DD7D37] p-3 w-3 h-3 z-10 flex items-center justify-center text-sm">
                                  4
                                </span>
                              </div>
                            </div>
                            <div className="text-center">
                              <h4>Get Rewards</h4>
                              <p className="text-sm">
                                After the 48-hour cooloff period has elapsed
                                without any disputes, you can claim your payment
                                into your wallet.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center mt-8 pt-8">
                          <Link href="/connect-wallet/collector">
                            <a className="text-white bg-[#DD7D37] px-12 py-3 text-sm border border-[#DD7D37] rounded-full">
                              Get Started as a Collector
                            </a>
                          </Link>
                        </div>
                      </div>
                    </TabPanel>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="py-4 bg-white">
          <div className="container mx-auto px-6">
            <div className="py-14">
              <div className="mb-9">
                <h2 className="text-center text-xl h2">Recent Requests</h2>
              </div>

              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 gap-y-9">
                  <div className="px-5 shadow-sm py-3">
                    <div className="rounded-md">
                      <div className="w-full h-56">
                        <img
                          src="/images/water_bottle.png"
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    </div>
                    <div className=" flex items-start justify-between mt-3">
                      <div>
                        <h4 className="mb-2">PET Bottles</h4>
                        <div className="flex items-start justify-start gap-2">
                          <img src="/images/location.svg" className="" />
                          <div>
                            <p className="text-base text-[#6D747D]">
                              Ikeja, Lagos
                            </p>
                            <p className="text-sm text-[#6D747D]">
                              20 mins away from you
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="radial-progress text-sm text-center text-[#DD7D37]"
                          style={{ '--value': 25, '--size': '4rem' }}
                        >
                          <span className="text-[#6D747D]">
                            <span className="font-semibold text-[#3D4044]">
                              25%
                            </span>{' '}
                            gotten
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 shadow-sm py-3">
                    <div className="rounded-md">
                      <div className="w-full h-56">
                        <img
                          src="/images/water_bottle.png"
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    </div>
                    <div className=" flex items-start justify-between mt-3">
                      <div>
                        <h4 className="mb-2">PET Bottles</h4>
                        <div className="flex items-start justify-start gap-2">
                          <img src="/images/location.svg" />
                          <div>
                            <p className="text-base text-[#6D747D]">
                              Ikeja, Lagos
                            </p>
                            <p className="text-sm text-[#6D747D]">
                              20 mins away from you
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="radial-progress text-sm text-center text-[#DD7D37]"
                          style={{ '--value': 25, '--size': '4rem' }}
                        >
                          <span className="text-[#6D747D]">
                            <span className="font-semibold text-[#3D4044]">
                              25%
                            </span>{' '}
                            gotten
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 shadow-sm py-3">
                    <div className="rounded-md">
                      <div className="w-full h-56">
                        <img
                          src="/images/water_bottle.png"
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    </div>
                    <div className=" flex items-start justify-between mt-3">
                      <div>
                        <h4 className="mb-2">PET Bottles</h4>
                        <div className="flex items-start justify-start gap-2">
                          <img src="/images/location.svg" />
                          <div>
                            <p className="text-base text-[#6D747D]">
                              Ikeja, Lagos
                            </p>
                            <p className="text-sm text-[#6D747D]">
                              20 mins away from you
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="radial-progress text-sm text-center text-[#DD7D37]"
                          style={{ '--value': `${25}`, '--size': '4rem' }}
                        >
                          <span className="text-[#6D747D]">
                            <span className="font-semibold text-[#3D4044]">
                              25%
                            </span>{' '}
                            gotten
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 shadow-sm py-3">
                    <div className="rounded-md">
                      <div className="w-full h-56">
                        <img
                          src="/images/water_bottle.png"
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    </div>
                    <div className=" flex items-start justify-between mt-3">
                      <div>
                        <h4 className="mb-2">PET Bottles</h4>
                        <div className="flex items-start justify-start gap-2">
                          <img src="/images/location.svg" />
                          <div>
                            <p className="text-base text-[#6D747D]">
                              Ikeja, Lagos
                            </p>
                            <p className="text-sm text-[#6D747D]">
                              20 mins away from you
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="radial-progress text-sm text-center text-[#DD7D37]"
                          style={{ '--value': 25, '--size': '4rem' }}
                        >
                          <span className="text-[#6D747D]">
                            <span className="font-semibold text-[#3D4044]">
                              25%
                            </span>{' '}
                            gotten
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 shadow-sm py-3">
                    <div className="rounded-md">
                      <div className="w-full h-56">
                        <img
                          src="/images/water_bottle.png"
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    </div>
                    <div className=" flex items-start justify-between mt-3">
                      <div>
                        <h4 className="mb-2">PET Bottles</h4>
                        <div className="flex items-start justify-start gap-2">
                          <img src="/images/location.svg" />
                          <div>
                            <p className="text-base text-[#6D747D]">
                              Ikeja, Lagos
                            </p>
                            <p className="text-sm text-[#6D747D]">
                              20 mins away from you
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="radial-progress text-sm text-center text-[#DD7D37]"
                          style={{ '--value': 25, '--size': '4rem' }}
                        >
                          <span className="text-[#6D747D]">
                            <span className="font-semibold text-[#3D4044]">
                              25%
                            </span>{' '}
                            gotten
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 shadow-sm py-3">
                    <div className="rounded-md">
                      <div className="w-full h-56">
                        <img
                          src="/images/water_bottle.png"
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    </div>
                    <div className=" flex items-start justify-between mt-3">
                      <div>
                        <h4 className="mb-2">PET Bottles</h4>
                        <div className="flex items-start justify-start gap-2">
                          <img src="/images/location.svg" />
                          <div>
                            <p className="text-base text-[#6D747D]">
                              Ikeja, Lagos
                            </p>
                            <p className="text-sm text-[#6D747D]">
                              20 mins away from you
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="radial-progress text-sm text-center text-[#DD7D37]"
                          style={{ '--value': 25, '--size': '4rem' }}
                        >
                          <span className="text-[#6D747D]">
                            <span className="font-semibold text-[#3D4044]">
                              25%
                            </span>{' '}
                            gotten
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 shadow-sm py-3">
                    <div className="rounded-md">
                      <div className="w-full h-56">
                        <img
                          src="/images/water_bottle.png"
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    </div>
                    <div className=" flex items-start justify-between mt-3">
                      <div>
                        <h4 className="mb-2">PET Bottles</h4>
                        <div className="flex items-start justify-start gap-2">
                          <img src="/images/location.svg" />
                          <div>
                            <p className="text-base text-[#6D747D]">
                              Ikeja, Lagos
                            </p>
                            <p className="text-sm text-[#6D747D]">
                              20 mins away from you
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="radial-progress text-sm text-center text-[#DD7D37]"
                          style={{ '--value': 25, '--size': '4rem' }}
                        >
                          <span className="text-[#6D747D]">
                            <span className="font-semibold text-[#3D4044]">
                              25%
                            </span>{' '}
                            gotten
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 shadow-sm py-3">
                    <div className="rounded-md">
                      <div className="w-full h-56">
                        <img
                          src="/images/water_bottle.png"
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    </div>
                    <div className=" flex items-start justify-between mt-3">
                      <div>
                        <h4 className="mb-2">PET Bottles</h4>
                        <div className="flex items-start justify-start gap-2">
                          <img src="/images/location.svg" />
                          <div>
                            <p className="text-base text-[#6D747D]">
                              Ikeja, Lagos
                            </p>
                            <p className="text-sm text-[#6D747D]">
                              20 mins away from you
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="radial-progress text-sm text-center text-[#DD7D37]"
                          style={{ '--value': 25, '--size': '4rem' }}
                        >
                          <span className="text-[#6D747D]">
                            <span className="font-semibold text-[#3D4044]">
                              25%
                            </span>{' '}
                            gotten
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-8">
                  <Link href="">
                    <a className="text-[#DD7D37] px-12 py-2 text-sm border border-[#DD7D37] rounded-full">
                      View all Requests
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section className="bg-[#F8F7F7] py-20 features__section">
          <div className="container mx-auto px-6">
            <div>
              <div className="mb-9">
                <h2 className="text-center text-xl h2">Features</h2>
              </div>
              <div className="grid grid-cols-1 py-14 gap-10 md:grid-cols-2">
                <div className="order-last md:order-first">
                  <div className="pr-0 lg:pr-16">
                    <h3 className="mb-4 text-[#351F0F]">
                      EcoMarket Marketplace
                    </h3>
                    <p className="mb-3">
                      Plastic pollution has become such a serious problem in
                      Nigeria and other developing countries. Consumers tend to
                      re-use or dump products rather than recycle, and the
                      majority of waste plastic collection is done by small,
                      local enterprises.
                    </p>
                    <p className="mb-3">
                      Because these local collectors only have access to their
                      local market, much of the plastic waste that’s harder to
                      recycle has remained in the environment.
                    </p>
                    <p className="mb-3">
                      At the same time, large manufacturers and processors are
                      unable to meet their demands for waste plastic.
                    </p>
                    <p className="mb-3">
                      EcoMarket bridges this divide by providing an open
                      marketplace where local collectors can earn crypto rewards
                      directly from fulfilling requests for plastic feedstock
                      from large organizations.
                    </p>
                    <p className="mb-3">
                      We are also encouraging active citizen participation in
                      recycling by providing token rewards for collecting and
                      depositing clean plastic waste.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <div className="features-img">
                    <img src="/images/ecomarket-marketplace.jpg" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 py-14 gap-10">
                <div className="flex items-center justify-start">
                  <div className="features-img">
                    <img src="/images/carbon-credit-nft.jpeg" />
                  </div>
                </div>
                <div>
                  <div className="pl-0 md:pl-0 lg:pl-16">
                    <h3 className="mb-4 text-[#351F0F]">
                      EcoMarket NFT - EcoCredit
                    </h3>
                    <p className="mb-3">
                      For brands who are looking for ways to make impact and
                      meet their environmental pledges, EcoMarket's EcoCredit
                      NFT provides a publicly verifiable way to showcase your
                      organization's commitment to sustainability.
                    </p>
                    <p className="mb-3">
                      Each NFT engages you and your customers through a
                      narrative journey - taking them from the cleanup and
                      deposit operations that makes up the plastic content - to
                      the final destination in their hands.
                    </p>
                    <p className="mb-3">
                      Each of our NFTs is backed by a EcoMarket Guarantee that
                      proves the plastic has been recovered somewhere in the
                      world.
                    </p>
                    <div className="mt-5">
                      {/* <Link href="#/">
                        <a
                          className="text-[#DD7D37] px-12 py-2 text-sm border border-[#DD7D37] rounded-full "
                          aria-disabled
                        >
                          Get Started
                        </a>
                      </Link> */}
                      {/* <Link href="#/"> */}
                      <button
                        className="text-[#DD7D37] px-12 py-2 text-sm border border-[#DD7D37] rounded-full opacity-60 "
                        aria-disabled
                      >
                        Coming Soon..
                      </button>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 py-14 gap-10">
                <div className="order-last md:order-first">
                  <div className="pr-0 lg:pr-16">
                    <h3 className="mb-4 text-[#351F0F]">EcoMarket Tracking</h3>
                    <p className="mb-3">
                      EcoMarket provides digital tracking functionality for
                      recyclers and large organizations, from deposit to
                      distribution and processing.
                    </p>
                    <p className="mb-3">
                      The details of every waste plastic deposited in a
                      EcoMarket collection center are uploaded and stored
                      forever on the blockchain.
                    </p>
                    <p className="mb-3">
                      By using the blockchain, the tracking data can't be
                      modified or deleted, thus ensuring that companies can
                      completely trust and verify the source and validity of the
                      recycled plastics they receive.
                    </p>
                    <div className="mt-5">
                      <button
                        className="text-[#DD7D37] px-12 py-2 text-sm border border-[#DD7D37] rounded-full opacity-60 "
                        aria-disabled
                      >
                        Coming Soon..
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <div className="features-img">
                    <img src="/images/ecomarket-tracking.jpg" />
                  </div>
                </div>
              </div>
              {/* <div className="grid grid-cols-1 md:grid-cols-2 py-14 gap-10">
                <div className="flex items-center justify-start">
                  <div className="features-img"></div>
                </div>
                <div>
                  <div className="pl-0 md:pl-0 lg:pl-16">
                    <h3 className="mb-4 text-[#351F0F]">
                      Token-based Governance
                    </h3>
                    <p className="mb-3">
                      While the EcoMarket platform works in a decentralized
                      manner, to resolve disputes, we have temporarily set up a
                      12-person governance committee to vote on disputes. This
                      committe consists of environmental experts, as well as
                      representatives of organizations and consumer bodies.
                    </p>
                    <p className="mb-3">
                      For every dispute being managed, the governance committee
                      publicly publishes the rationale for decisions made on the
                      outcomes of disputes.
                    </p>
                    <p className="mb-3">
                      In the near future, EcoMarket will fully operate as a DAO.
                      We will launch a governance token $GSC, whose owners will
                      have voting and proposal rights on disputes as well as the
                      future roadmap of the EcoMarket platform, using the{' '}
                      <a
                        href="https://limechain.tech/blog/dao-voting-mechanisms-explained-2022-guide/#:~:text=the%20long%2Dterm.-,Multisig%20Voting,-Multisig%20voting%20is"
                        target="_blank"
                      >
                        multi-sig voting mechanism
                      </a>
                      .
                    </p>
                    <div className="mt-5">
                      <Link href="#/">
                        <a
                          className="text-[#DD7D37] px-12 py-2 text-sm border border-[#DD7D37] rounded-full "
                          aria-disabled
                        >
                          Coming Soon..
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        <section className="py-4 meet__team">
          <div className="container mx-auto px-6">
            <div className="py-14">
              <div className="mb-9">
                <h2 className="h2 text-center text-xl">
                  We're making recycling more rewarding!
                </h2>
              </div>

              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-7">
                  {/* <div style={{ display: 'flex', justifyContent: 'center' }}> */}
                  <div className="w-full h-full overflow-x-hidden">
                    <InstagramEmbed
                      url="https://www.instagram.com/p/Cs2xBebo1M7/"
                      width="100%"
                      // height={550}
                    />
                  </div>
                  <div className="w-full h-full overflow-x-hidden">
                    <InstagramEmbed
                      url="https://www.instagram.com/p/Cs2wVA3o8OR/"
                      width="100%"
                      // height={550}
                      // captioned={false}
                    />
                  </div>
                  <div className="w-full h-full overflow-x-hidden">
                    <InstagramEmbed
                      url="https://www.instagram.com/p/Cs8h-ZcI2w8/"
                      width="100%"
                      // height={550}
                    />
                  </div>
                  {/*  <div className='w-44'>
                    <InstagramEmbed
                      url="https://www.instagram.com/p/CUbHfhpswxt/"
                      width="100%" 
                      height={50}
                    />
                  </div>
                  <div className='w-44'>
                    <InstagramEmbed
                      url="https://www.instagram.com/p/CUbHfhpswxt/"
                      width="100%" 
                      height={50}
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div>
          <div className="flex items-center justify-between w-full py-6 px-6 max-w-7xl mx-auto container flex-wrap social_cta gap-x-2 gap-y-5">
            <div className="">
              <h1 className="text-3xl text-[#351F0F]">We're social!</h1>
              <p>Stay up to date on EcoMarket's activities.</p>
            </div>

            <div className="flex items-center gap-4">
              <Link href={'https://twitter.com/ecomarketxyz'}>
                <a className="cursor-pointer w-14 h-14" target="_blank">
                  <TwitterIcon className="social_icons" />
                </a>
              </Link>
              <Link
                href={
                  'https://www.youtube.com/channel/UCMiKRNnZt_vIaiT7cGjBeJw'
                }
              >
                <a className="cursor-pointer w-14 h-14" target="_blank">
                  <YouTubeIcon className="social_icons " />
                </a>
              </Link>
              <Link href={'https://www.instagram.com/ecomarketapp/'}>
                <a className="cursor-pointer w-14 h-14" target="_blank">
                  <InstagramIcon className="social_icons" />
                </a>
              </Link>
            </div>
          </div>
        </div>

        <section className="antialised bg-[#FFFBF9] py-14">
          <div className="container mx-auto px-6">
            <div className="mb-9">
              <h2 className="text-center text-xl h2">Roadmap</h2>
            </div>

            <div className="flex items-center justify-center mx-auto max-w-3xl">
              <div className="flex flex-col md:grid grid-cols-9 mx-auto p-2 text-[#3F3F3F]">
                <div className="flex md:contents">
                  <div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
                    <div className="h-full w-6 flex items-center justify-center">
                      <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                    </div>
                    <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"></div>
                  </div>
                  <div className="bg-white col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md">
                    <p className="leading-tight text-justify">
                      Integrate Web3Auth for easier sign-up for collectors, most
                      of whom may not be crypto-savvy.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row-reverse md:contents">
                  <div className="bg-white col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md">
                    <p className="leading-tight text-justify">
                      NFTs — companies can earn EcoCredit, a digital collectible
                      that showcases the company’s commitment to eco-friendly
                      initiatives.
                    </p>
                  </div>
                  <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
                    <div className="h-full w-6 flex items-center justify-center">
                      <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                    </div>
                    <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"></div>
                  </div>
                </div>

                <div className="flex md:contents">
                  <div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
                    <div className="h-full w-6 flex items-center justify-center">
                      <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                    </div>
                    <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"></div>
                  </div>
                  <div className="bg-white col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md">
                    <p className="leading-tight text-justify">
                      Enable offer creation & deliveries for other scrap types
                      (metals, batteries, etc)
                    </p>
                  </div>
                </div>

                <div className="flex flex-row-reverse md:contents">
                  <div className="bg-white col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md">
                    <p className="leading-tight text-justify">
                      Conversion of TRX to stablecoins for easier off-ramping
                      for customers.
                    </p>
                  </div>
                  <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
                    <div className="h-full w-6 flex items-center justify-center">
                      <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                    </div>
                    <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"></div>
                  </div>
                </div>

                <div className="flex md:contents">
                  <div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
                    <div className="h-full w-6 flex items-center justify-center">
                      <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                    </div>
                    <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"></div>
                  </div>
                  <div className="bg-white col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md">
                    <p className="leading-tight text-justify">
                      Token-based Governance Model & DAO
                    </p>
                  </div>
                </div>

                <div className="flex flex-row-reverse md:contents">
                  <div className="bg-white col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md">
                    <p className="leading-tight text-justify">
                      Decentralized verification for Company & Collector
                    </p>
                  </div>
                  <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
                    <div className="h-full w-6 flex items-center justify-center">
                      <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                    </div>
                    <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"></div>
                  </div>
                </div>

                <div className="flex md:contents">
                  <div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
                    <div className="h-full w-6 flex items-center justify-center">
                      <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                    </div>
                    <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"></div>
                  </div>
                  <div className="bg-white col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md">
                    <p className="leading-tight text-justify">
                      Supply-driven Marketplace (where a user can upload
                      plastics, or other scrap items available for sale)
                    </p>
                  </div>
                </div>

                <div className="flex flex-row-reverse md:contents">
                  <div className="bg-white col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md">
                    <p className="leading-tight text-justify">
                      Recycler-Company Chat
                    </p>
                  </div>
                  <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
                    <div className="h-full w-6 flex items-center justify-center">
                      <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                    </div>
                    <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"></div>
                  </div>
                </div>

                <div className="flex md:contents">
                  <div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
                    <div className="h-full w-6 flex items-center justify-center">
                      <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                    </div>
                    <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"></div>
                  </div>
                  <div className="bg-white col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md">
                    <p className="leading-tight text-justify">
                      One-on-One Matching (match companies with recyclers
                      directly)
                    </p>
                  </div>
                </div>

                <div className="flex flex-row-reverse md:contents">
                  <div className="bg-white col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md">
                    <p className="leading-tight text-justify">
                      Outreach & Education Initiatives (in schools,
                      marketplaces, and universities)
                    </p>
                  </div>
                  <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
                    <div className="h-full w-6 flex items-center justify-center">
                      <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                    </div>
                    <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 meet__team">
          <div className="container mx-auto px-6">
            <div className="py-14">
              <div className="mb-9">
                <h2 className="h2 text-center text-xl">Meet the team</h2>
              </div>

              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 gap-y-6 grid-flow-row-dense ">
                  <div className="">
                    <div className="mb-4 flex items-center justify-center">
                      <div className="square">
                        <Image src="/images/dara.jpeg" layout="fill" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h5>Dara E.</h5>
                      <p>Strategy & Operations</p>
                      {/* <Link href='' targer='_blank'>
                        <LinkedInIcon/>
                      </Link> */}
                    </div>
                  </div>
                  <div className="">
                    <div className="mb-4 flex items-center justify-center">
                      <div className="square">
                        <Image src="/images/paul.jpeg" layout="fill" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h5>Paul O.</h5>
                      <p>Product</p>
                      {/* <Link href="" targer="_blank">
                        <LinkedInIcon />
                      </Link> */}
                    </div>
                  </div>
                  <div className="">
                    <div className="mb-4 flex items-center justify-center">
                      <div className="square">
                        <Image src="/images/femi.jpeg" layout="fill" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h5>Olu A.</h5>
                      <p>Engineering</p>
                      {/* <Link href='' targer='_blank'>
                        <LinkedInIcon/>
                      </Link> */}
                    </div>
                  </div>
                  <div className="">
                    <div className="mb-4 flex items-center justify-center">
                      <div className="square">
                        <Image src="/images/wale.jpg" layout="fill" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h5>Wale A.</h5>
                      <p>Country Manager</p>
                      {/* <Link href='' targer='_blank'>
                        <LinkedInIcon/>
                      </Link> */}
                    </div>
                  </div>
                  <div className="">
                    <div className="mb-4 flex items-center justify-center">
                      <div className="square">
                        <Image src="/images/bose.jpeg" layout="fill" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h5>May B.</h5>
                      <p>UI/UX Designer</p>
                      {/* <Link href='' targer='_blank'>
                        <LinkedInIcon/>
                      </Link>                    */}
                    </div>
                  </div>
                  <div className="">
                    <div className="mb-4 flex items-center justify-center">
                      <div className="square">
                        <Image src="/images/praise.jpg" layout="fill" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h5>Praise U.</h5>
                      <p>Engineering</p>
                      {/* <Link href='' targer='_blank'>
                        <LinkedInIcon/>
                      </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Home;
