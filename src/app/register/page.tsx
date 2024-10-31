// src/app/register/page.tsx
'use client';

import { SignUp } from '@clerk/nextjs';

export default function RegisterPage() {
  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-2xl mb-4">Register</h2>
        <SignUp path="/register" routing="path" signInUrl="/sign-in" />
      </div>
    </main>
  );
}
