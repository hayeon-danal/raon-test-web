"use client";

import { useEffect, useRef, useState } from "react";
import IframeController, {
  IframeControllerHandle,
} from "@/components/IframeController";

export default function KeyPad() {
  const iframeRef = useRef<IframeControllerHandle>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log("부모가 받은 응답", event.data); // 여기서 로그 찍혀야 함
      if (event.data.status === "changeInput" && event.data.value === 6) {
        requestValues();
        console.log("해당 조건에 다음 페이지로 이동되어야 함");
      }

      if (event.data.status === "requestValue") {
        console.log("이 때 값을 서버에 넘겨야 함");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const requestValues = () => {
    iframeRef.current?.emit("requestValue");
  };

  useEffect(() => {
    // 키패드 바로 뜨도록
    iframeRef.current?.emit("showKeyboard");
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
