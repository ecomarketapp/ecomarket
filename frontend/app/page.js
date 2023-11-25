import Image from 'next/image';
import Link from 'next/link';
import ForIndividuals from './components/homeComponents/ForIndividuals';
import ForBusiness from './components/homeComponents/ForBusiness';
import Map from './components/mapComponents/map';
import TronCTA from './components/homeComponents/TronCTA';
import GetStartedCta from './components/homeComponents/GetStartedCta';
import { impactData } from './lib/constants';
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className="bg-white py-12">
          <div className="container mx-auto max-w-7xl px-4 lg:px-6 flex items-center h-full py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-5 gap-y-12 px--2 ">
              <div className="w-full md:w-5/6">
                <div>
                  <h1 className="text-5xl font-extrabold text-[#351F0F]">
                    Get Rewarded for Recycling
                  </h1>
                </div>
                <div className="mb-10 mt-5">
                  <p className="text-base text-[#3F3F3F]">
                    Ecomarket enables companies directly reward individuals &
                    recyclers for donating recyclables
                  </p>
                </div>

                <div>
                  <Link
                    href="/connect-wallet/collector"
                    className="rounded-full px-5 py-4 text-md bg-[#12B76A] text-white"
                  >
                    Earn rewards
                  </Link>
                </div>
              </div>
              <div className="">
                <div className="flex justify-center items-center lg:items-start w-full  h-auto relative">
                  <Image
                    alt="heroimage"
                    fetchPriority="high"
                    width={500}
                    height={300}
                    // layout='fill'
                    decoding="async"
                    className=" object-cover object-center rounded-lg p-1"
                    src={'/images/picking-trash.png'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ForIndividuals />

        <ForBusiness />

        <section className="bg-[#FFF] py-20 features__section">
          <div className="w-full">
            <div className="py-5 container mx-auto px-6 md:px-12 max-w-7xl">
              <div className="mb-16 text-center max-w-lg mx-auto ">
                <h1 className="text-4xl font-bold mb-[22px] text-[#1A202B]">
                  How we create impact
                </h1>
                <h3 className="text-sm font-normal text-center text[#3F3F3F]">
                  We create impact through 3 products:
                </h3>
              </div>

              <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-6">
                {impactData.map((item, index) => (
                  <div
                    key={index}
                    className=" max-w-full flex flex-col-reverse md:flex-col mx-auto space-y-3 gap-4 w-full"
                  >
                    <div className="group relative block h-[250px] w-full rounded-lg impact_box transition-all duration-200 ease-in-out object-cover overflow-hidden">
                      <Image
                        src={`${item.src}`}
                        alt={`impact_pic${index + 1}`}
                        fill
                        className="object-cover w-full h-full rounded-lg transition-all duration-200 ease-in-out"
                      />
                    </div>

                    <h4 className="flex items-start gap-2">
                      <span>{index + 1}.</span>
                      {item.text}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Map />

        <TronCTA />

        <section className=" py-20">
          <div className="container mx-auto max-w-7xl px-3 lg:px-6">
            <div className="mb-9 text-center max-w-md mx-auto text-[#1A202B]">
              <h2 className=" text-3xl h2 mb-4">
                What you can recycle via EcoMarket
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded-lg bg-[#FDFAF8] flex items-center justify-center gap-1 flex-col max-w-full w-[200px] py-4 px-2 text-center mx-auto what_to_buy_card shadow transition-all duration-200 ease-in-out">
                <div className="w-24 h-24 relative">
                  <Image
                    src="/images/16864 1.png"
                    alt=""
                    fill
                    className={'object-contain w-full h-full'}
                  />
                </div>
                <h6>Glass bottles</h6>
              </div>
              <div className="rounded-lg bg-[#F6FFFB] flex items-center justify-center gap-1 flex-col max-w-full w-[200px] py-4 px-2 text-center mx-auto what_to_buy_card shadow transition-all duration-200 ease-in-out ">
                <div className="w-24 h-24 relative">
                  <Image
                    src="/images/water-bottle 1.png"
                    alt=""
                    fill
                    className={'object-contain w-full h-full'}
                  />
                </div>
                <h6>PET bottles</h6>
              </div>

              <div className="rounded-lg bg-[#FDFAF8] flex items-center justify-center gap-1 flex-col max-w-full w-[200px] py-4 px-2 text-center mx-auto what_to_buy_card shadow transition-all duration-200 ease-in-out">
                <div className="w-24 h-24 relative">
                  <Image
                    src="/images/image 13.png"
                    alt=""
                    fill
                    className={'object-contain w-full h-full'}
                  />
                </div>
                <h6>Aluminium can containers</h6>
              </div>

              <div className="rounded-lg bg-[#F6FFFB] flex items-center justify-center gap-1 flex-col max-w-full w-[200px] py-4 px-2 text-center mx-auto what_to_buy_card shadow transition-all duration-200 ease-in-out">
                <div className="w-24 h-24 relative">
                  <Image
                    src="/images/image 14.png"
                    alt=""
                    fill
                    className={'object-contain w-full h-full'}
                  />
                </div>
                <h6>New/used cartons</h6>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 features__section">
          <div className=" ">
            <div>
              <div className="md:mb-5 px-4 lg:px-6">
                <h2 className="text-left md:text-center text-sm md:text-3xl h2 text-[#12B76A]">
                  Features
                </h2>
              </div>
              <div>
                <div className="container mx-auto px-4 md:px-12">
                  <div className="grid grid-cols-1  py-14 gap-10 md:grid-cols-2 lg:px-6">
                    <div className="order-first md:order-first">
                      <div className="pr-0 lg:pr-16">
                        <h3 className="mb-4 text-[26px] font-semibold text-[#1A202B]">
                          EcoMarket Marketplace
                        </h3>
                        <p className="mb-3">
                          Plastic pollution is a significant issue in Nigeria
                          and other developing nations. People often reuse or
                          discard plastic instead of recycling, and local
                          businesses mainly handle plastic waste collection.
                          This leads to challenging-to-recycle plastic staying
                          in the environment. Large manufacturers can&apos;t
                          source enough waste plastic.
                        </p>
                        <p className="mb-3">
                          EcoMarket addresses this by creating a marketplace.
                          Local collectors earn crypto rewards by fulfilling
                          plastic feedstock requests from big companies. We also
                          incentivize citizens to recycle by rewarding them with
                          tokens for depositing clean plastic waste.
                        </p>

                        <div className="mt-5">
                          <button className="text-white px-12 py-3 text-sm bg-[#12B76A] rounded-[48px] ">
                            Get started
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <div className="features-img flex items-center justify-center relative h-full w-full">
                        <Image
                          src={'/images/recylce_garbage.png'}
                          alt={'ecomarket'}
                          // fill
                          width={500}
                          height={500}
                          className={
                            'flex items-center justify-center object-contain shadow p-1 rounded-lg'
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#FBFFFD]">
                <div className="container mx-auto px-4 md:px-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 py-14 gap-10 lg:px-6">
                    <div className="order-last md:order-first flex items-center justify-start">
                      <div className="features-img flex items-center justify-start relative h-full w-full">
                        <Image
                          src={'/images/group-happy-african-volunteers.png'}
                          alt={'ecomarket'}
                          // fill
                          width={500}
                          height={500}
                          className={
                            'flex items-center justify-center object-contain shadow p-1 rounded-lg'
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <div className="pl-0 md:pl-0 lg:pl-16">
                        <h3 className="mb-4 text-[26px] font-semibold text-[#1A202B]">
                          EcoMarket NFT - EcoCredit
                        </h3>
                        <p className="mb-3">
                          For brands who are looking for ways to make impact and
                          meet their environmental pledges, EcoMarket&apos;s
                          EcoCredit NFT provides a publicly verifiable way to
                          showcase your organization&apos;s commitment to
                          sustainability.
                        </p>
                        <p className="mb-3">
                          Each NFT engages you and your customers through a
                          narrative journey - taking them from the cleanup and
                          deposit operations that makes up the plastic content -
                          to the final destination in their hands.
                        </p>
                        <p className="mb-3">
                          Each of our NFTs is backed by a EcoMarket Guarantee
                          that proves the plastic has been recovered somewhere
                          in the world.
                        </p>
                        <div className="mt-5">
                          <button
                            className="text-[#005AFF] px-12 py-3 text-sm bg-[#E0EBFF] rounded-[48px] opacity-60  cursor-default"
                            aria-disabled
                          >
                            Coming Soon..
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="container mx-auto px-4 md:px-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 py-14 gap-10 lg:px-6">
                    <div className="order-first md:order-first">
                      <div className="pr-0 lg:pr-16">
                        <h3 className="mb-4 text-[26px] font-semibold text-[#1A202B]">
                          EcoMarket Tracking
                        </h3>
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
                          By using the blockchain, the tracking data can&apos;t
                          be modified or deleted, thus ensuring that companies
                          can completely trust and verify the source and
                          validity of the recycled plastics they receive.
                        </p>
                        <div className="mt-5">
                          <button
                            className="text-[#005AFF] px-12 py-3 text-sm bg-[#E0EBFF] rounded-[48px] opacity-60 cursor-default"
                            aria-disabled
                          >
                            Coming Soon..
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <div className="features-img flex items-center justify-center relative h-full w-full ">
                        <Image
                          src={'/images/tracking-van.png'}
                          alt={'ecomarket'}
                          // fill
                          width={500}
                          height={500}
                          className={
                            ' flex items-center justify-center object-contain shadow p-1 rounded-lg'
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <GetStartedCta />
      </main>

      <Footer />
    </>
  );
}
