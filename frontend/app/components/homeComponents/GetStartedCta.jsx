import Image from 'next/image';
import Link from 'next/link';

export default function GetStartedCta() {
  return (
    <div
      className="px-4 py-10 min-h-[36.32rem] relative flex items-center justify-center h-full"
      // style={{
      //   backgroundImage:
      //     'url(/images/group-happy-african-volunteers-standing.png)',
      //   backgroundAttachment: 'scroll',
      //   backgroundPosition: 'center center',
      //   backgroundSize: 'cover',
      //   backgroundRepeat: 'no-repeat',
      // }}
    >
      <div className="get__started_overlay absolute top-0 left-0 h-full w-full bg-[#000]/50 z-10 pointer-events-none "></div>
      <div className="w-full h-full absolute top-0 right-0">
        <Image
          src={'/images/group-happy-african-volunteers-standing.png'}
          alt={'ecomarket'}
          fill
          // layout="responsive"
          // width={1200}
          // height={500}
          priority
          className={
            ' flex items-center justify-center object-cover object-center w-full h-full '
          }
        />
      </div>

      <div className="flex items-center justify-center h-full">
        <div className=" max-w-5xl px-4 space-y-3 container mx-auto h-full flex items-center justify-center flex-col py-12 gap-2 rounded-lg text-center">
          <h3 className="text-7xl text-white font-medium z-20">
            Help sustain our world
          </h3>
          <div className="text-center z-20">
            <h5 className="text-white text-[22px] ">
              Take your first step into a greener future and earn rewards along
              the way
            </h5>
          </div>
          <div className="mt-3 z-20 w-full md:w-auto">
            <Link
              href="/"
              className="rounded-full px-6 py-3 text-sm bg-[#12B76A] text-white w-full md:w-auto text-center"
            >
              Join the Movement
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
