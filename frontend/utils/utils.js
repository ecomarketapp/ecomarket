async function findProfile(address) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/companies/${address}`
  );

  const data = await res.json();

  return data;
}

async function newProfile(address) {
  console.log(address);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/companies`,
    {
      method: 'POST',
      body: JSON.stringify({ wallet: address }),
    }
  );

  const data = await res.json();

  return data;
}

export { findProfile, newProfile };
