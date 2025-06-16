"use client";

import { useEffect, useRef, useState } from "react";
import IframeController, {
  IframeControllerHandle,
} from "@/components/IframeController";

type Payload = {
  id: string;
  name: string;
  encoded: string;
  hmEncoded: string;
  exe2e: string;
  transkeyUuid: string;
  frmId: string;
};

const sendEncryptedValuesToServer = async (
  payload: Payload,
  sessionId: string
) => {
  console.log("payload::: ", payload, sessionId);
  const body = {
    transkeyId: payload.id,
    transkeyName: payload.name,
    transkeyFrmId: payload.frmId,
    encoded: payload.encoded,
    hmEncoded: payload.hmEncoded,
    exe2e: payload.exe2e,
    transkeyUuid: payload.transkeyUuid,
    sessionId: sessionId,
  };
  console.log("body:::", body);
  // console.log("Session::: ", document.cookie)
  try {
    const res = await fetch("http://localhost:8070/api/v1/pin/decode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const result = await res.text();
    console.log("✅ 서버 응답:", result);
    alert("복호화된 값: " + result);
  } catch (error) {
    console.error("❌ 서버 요청 실패:", error);
    alert("서버 통신 오류");
  }
};

type Props = {
  sessionId: string | null;
};
export default function KeyPad({ sessionId }: Props) {
  const iframeRef = useRef<IframeControllerHandle>(null);

  // useEffect(() => {
  //   const handleMessage = (event: MessageEvent) => {
  //     console.log("부모가 받은 응답", event.data); // 여기서 로그 찍혀야 함
  //     if (event.data.status === "changeInput" && event.data.value === 6) {
  //       requestValues();
  //       console.log("해당 조건에 다음 페이지로 이동되어야 함");
  //     }

  //     if (event.data.status === "requestValue") {
  //       console.log("이 때 값을 서버에 넘겨야 함");
  //       // 값이 함께 전달되었는지 확인
  //       if (event.data.value && sessionId) {
  //         sendEncryptedValuesToServer(event.data.value, sessionId);
  //       } else {
  //         console.warn("payload 없음");
  //       }
  //     }
  //   };

  //   window.addEventListener("message", handleMessage);
  //   return () => window.removeEventListener("message", handleMessage);
  // }, []);

  const requestValues = () => {
    iframeRef.current?.requestValue();
  };

  useEffect(() => {
    // 키패드 바로 뜨도록
    iframeRef.current?.showKeyboard();
  }, []);

  return (
    <main>
      <div style={{ marginBottom: "16px" }}>
        <button onClick={requestValues}>requestValues</button>
      </div>
      <div style={{ width: "360px" }}>
        <IframeController ref={iframeRef} />
      </div>
    </main>
    // <iframe ref={iframeRef} id="keypad_iframe" src="/keypad/index.html" style={{ height: '100%' }} />
    // <iframe ref={iframeRef} id="keypad_iframe" src="https://web-damoum.danalpay.com/keypad" />
  );
}
