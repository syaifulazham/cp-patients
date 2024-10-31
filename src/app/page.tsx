// src/app/page.tsx
import Navbar from '../components/Navbar';
import doctor from '@/lib/images/doctor.png';
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="p-0 m-0 flex flex-col items-center justify-center min-h-screen">
        <Image src={doctor} alt="doctor" width={300} height={300} />
        <h1 className="text-5xl text-center greeting text-gray-600">Selamat Datang di <span className="text-blue-500">Carepod</span><span className="text-red-500">Lab</span>, Portal Telemedis Anda</h1>
      </main>
    </>
  );
}
