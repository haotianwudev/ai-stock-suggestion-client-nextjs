'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OptionsTopicsPage() {
  const router = useRouter();

  // Redirect to when-to-trade subtopic by default
  useEffect(() => {
    router.replace('/option/topics/when-to-trade');
  }, [router]);

  return null;
}