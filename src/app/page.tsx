'use client'

import dynamic from 'next/dynamic';

const MembersPage = dynamic(() => import('../components/page-components/index'), { ssr: false });

export default function Home() {
  return <MembersPage />;
}
