'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function QuantTradingPage() {
  const router = useRouter();

  // Redirect to systematic-strategies subtopic by default
  useEffect(() => {
    router.replace('/quant/quanttrading/systematic-strategies');
  }, [router]);

  return null;
}