'use client';

import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Home() {
  console.log('auth: ', auth);
  const router = useRouter();

  if (!auth.currentUser) {
    return (
      <main className='px-10 grid place-items-center h-screen'>
        <div>
          <h1 className='text-white text-lg mb-4'>
            Du kan tyvärr inte se det här utan att logga in först. 🥲
          </h1>
          <div className='flex justify-between gap-4'>
            <button
              onClick={() => {
                router.push('/?form=login');
              }}
              className='flex-1 px-3 py-1.5 ring-1 ring-white text-white hover:bg-white/10 font-bold tracking-wider text-lg rounded-xl'
            >
              Logga in
            </button>
            <button
              onClick={() => {
                router.push('/?form=register');
              }}
              className='flex-1 px-3 py-1.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-bold tracking-wider text-lg'
            >
              Registrera dig
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <nav className='text-white py-6 flex justify-end px-10 bg-gray-500'>
        <div>
          <p>
            Du är inloggad som:{' '}
            <span className='text-blue-900 font-medium'>{auth.currentUser?.email}</span>
          </p>
          <button
            onClick={() => {
              signOut(auth).then(() => {
                router.push('/');
              });
            }}
            className='text-sm text-blue-900 font-medium float-end'
          >
            Logga ut
          </button>
        </div>
      </nav>
      <section></section>
    </main>
  );
}
