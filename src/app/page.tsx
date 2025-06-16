// app/page.tsx
import { cookies } from "next/headers";
import KeyPad from "./KeyPad"; // 클라이언트 컴포넌트

export default async function Page() {
  const cookieStore = await cookies();
  console.log("모든 쿠키:", cookieStore.getAll());
  const sessionId = cookieStore.get("JSESSIONID")?.value;
  console.log("Page cookies", sessionId);
  // const sessionId = cookies().get("JSESSIONID")?.value ?? null;
  // console.log("SessionID:::: ", sessionId);
  return <KeyPad sessionId={sessionId} />;
}
