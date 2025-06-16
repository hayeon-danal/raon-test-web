// app/page.tsx
import { cookies } from 'next/headers';
import KeyPad from './KeyPad'; // 클라이언트 컴포넌트

export default function Page() {
  const sessionId = cookies().get('JSESSIONID')?.value ?? null;
  console.log('SessionID:::: ', sessionId)
  return <KeyPad sessionId={sessionId} />;
}
