'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AlgoTradingPage() {
  const router = useRouter();

  // Redirect to systematic-strategies subtopic by default
  useEffect(() => {
    router.replace('/quant/algotrading/systematic-strategies');
  }, [router]);

  return null;
}