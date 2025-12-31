'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OptionsTopicsPage() {
  const router = useRouter();

  // Redirect to option101 subtopic by default
  useEffect(() => {
    router.replace('/option/topics/option101');
  }, [router]);

  return null;
}