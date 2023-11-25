import React from 'react';
import Map from '../components/mapComponents/map';
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="bg-white py-12 md:h-[50vh] lg:h-[50vh]">
          <div className="container mx-auto max-w-7xl px-3 lg:px-6 flex items-center h-full py-12">
            <div className="grid grid-cols-1  items-center gap-x-5 gap-y-12 max-w-3xl justify-center mx-auto">
              <div className="w-full text-center space-y-6">
                <span className="text-[#12B76A] text-sm">About Us</span>
                <div>
                  <h1 className="text-5xl font-extrabold text-[#351F0F]">
                    Our Mission
                  </h1>
                </div>
                <div className="mb-10 ">
                  <p className="text-base text-[#3F3F3F]">
                    Ecomarket enables companies directly reward individuals &
                    recyclers for donating recyclables
                  </p>
                </div>
              </div>
              {/* <div className="">
              <div className="flex justify-center items-center lg:items-start w-full  lg:h-[504px]  relative">
                <Image
                  alt="heroimage"
                  fetchPriority="high"
                  width={300}
                  height={300}
                  // layout='fill'
                  decoding="async"
                  data-nimg="1"
                  className=" w-full h-full object-contain object-center"
                  src={'/images/hands-holding-recyclable-items.png'}
                />
              </div>
            </div> */}
            </div>
          </div>
        </div>
        <Map />
        <section className="py-4 meet__team bg-[#F9FDFB]">
          <div className="container mx-auto px-6">
            <div className="py-14">
              <div className="mb-9">
                <h2 className="h2 text-left md:text-center text-3xl text-[#1A202B]">
                  Meet the team
                </h2>
              </div>

              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 gap-y-6 grid-flow-row-dense ">
                  <div className="">
                    <div className="mb-4 flex items-center justify-center">
                      <div className="square relative w-full md:w-[250px] lg:w-[250px] h-64 lg:h-52 rounded-lg block object-cover overflow-hidden bg-[#E2FFF2]">
                        {/* <Image src="/images/dara.jpeg" fill alt="image" /> */}
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
                      <div className="square relative  w-full md:w-[250px] lg:w-[250px] h-64 lg:h-52 rounded-lg block object-cover overflow-hidden bg-[#E2FFF2]">
                        {/* <Image src="/images/dara.jpeg" fill alt="image" /> */}
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
                      <div className="square relative  w-full md:w-[250px] lg:w-[250px] h-64 lg:h-52 rounded-lg block object-cover overflow-hidden bg-[#E2FFF2]">
                        {/* <Image src="/images/dara.jpeg" fill alt="image" /> */}
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
                      <div className="square relative  w-full md:w-[250px] lg:w-[250px] h-64 lg:h-52 rounded-lg block object-cover overflow-hidden bg-[#E2FFF2]">
                        {/* <Image src="/images/dara.jpeg" fill alt="image" /> */}
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
                      <div className="square relative  w-full md:w-[250px] lg:w-[250px] h-64 lg:h-52 rounded-lg block object-cover overflow-hidden bg-[#E2FFF2]">
                        {/* <Image src="/images/dara.jpeg" fill alt="image" /> */}
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
                      <div className="square relative  w-full md:w-[250px] lg:w-[250px] h-64 lg:h-52 rounded-lg block object-cover overflow-hidden bg-[#E2FFF2]">
                        {/* <Image src="/images/dara.jpeg" fill alt="image" /> */}
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
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
