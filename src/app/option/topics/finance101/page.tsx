import { redirect } from 'next/navigation';

export default function Finance101Page() {
  // Server-side redirect for backward compatibility
  redirect('/option/topics/option101');
}