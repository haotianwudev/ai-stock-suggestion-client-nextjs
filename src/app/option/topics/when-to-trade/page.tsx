import { redirect } from 'next/navigation';

export default function WhenToTradePage() {
  // Server-side redirect for backward compatibility
  redirect('/option/topics/option101');
}