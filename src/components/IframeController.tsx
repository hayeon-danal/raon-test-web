"use client";

import { forwardRef, useRef, useImperativeHandle, useEffect } from "react";

type TestType = {
  (e: "requestValues", value: any): void;
};

export type IframeEventPayload = {
  type: string;
  value?: any;
};

export type IframeControllerHandle = {
  emit: (event: string, value?: any) => void;
  showKeyboard: () => void;
  requestValue: () => void;
};

type Props = {
  width?: number | string;
  height?: number | string;
  onLoad?: () => void;
  // onReceiveMessage: (data: any) => void;
};

const IframeController = forwardRef<IframeControllerHandle, Props>(
  ({ width = "100%", height = 200, onLoad, onReceiveMessage }, ref) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    useImperativeHandle(ref, () => ({
      emit: (type, value) => {
        iframeRef.current?.contentWindow?.postMessage({ type, value }, "*");
      },
      showKeyboard: () => {
        iframeRef.current?.contentWindow?.postMessage(
          { type: "showKeyboard" },
          "*"
        );
      },
      requestValue: () => {
        iframeRef.current?.contentWindow?.postMessage(
          { type: "requestValue" },
          "*"
        );
      },
    }));

    // useEffect(() => {
    //   const handleMessage = (event: MessageEvent) => {
    //     onReceiveMessage(event.data);
    //     console.log("컴포넌트 내에 event.data", event.data);
    //   };

    //   window.addEventListener("message", handleMessage);
    //   return () => window.removeEventListener("message", handleMessage);
    // }, [onReceiveMessage]);

    return (
      <iframe
        ref={iframeRef}
        src="/keypad/index.html"
        onLoad={onLoad}
        width={width}
        height={height}
        style={{ border: "none" }}
        sandbox="allow-scripts allow-same-origin allow-modals"
      />
    );
  }
);

export default IframeController;
