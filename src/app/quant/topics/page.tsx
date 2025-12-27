'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function QuantTopicsPage() {
  const router = useRouter();

  // Redirect to monte-carlo subtopic by default
  useEffect(() => {
    router.replace('/quant/topics/monte-carlo');
  }, [router]);

  return null;
}