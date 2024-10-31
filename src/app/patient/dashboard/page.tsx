// src/app/dashboard/page.tsx
'use client';

import { useUser, RedirectToSignIn } from '@clerk/nextjs';

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) return <RedirectToSignIn />;

  return (
    <main className="p-0 m-0">
      <h1>Welcome, {user?.fullName}</h1>
      <p>Email: {user?.emailAddresses[0]?.emailAddress}</p>
      
    </main>
  );
}
