import Link from 'next/link';

export default function GetStartedCta() {
  return (
    <div className='px-4 py-10 my-4 md:my-10'>
      <div className="bg-[#EAECEB] max-w-4xl px-4 space-y-3 container mx-auto h-full flex items-center justify-center flex-col py-12 gap-2 rounded-lg shadow-lg">
        <h3 className='text-3xl text-[#1A202B] font-medium'>Make the world Eco-friendly</h3>
        <div className='text-center'>
          <h5 className='text-[#3F3F3F] text-lg '>Join us in our movement in recycling and getting rewarded</h5>
        </div>
        <div className='mt-3'>
          <Link
            href="/connect-wallet/collector"
            className="rounded-full px-5 py-2 text-sm bg-[#12B76A] text-white"
          >
            Earn rewards
          </Link>
        </div>
      </div>
    </div>
  );
}
