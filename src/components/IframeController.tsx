"use client";

import { forwardRef, useRef, useImperativeHandle } from "react";

type TestType = {
  (e: "requestValues", value: any): void;
};

export type IframeEventPayload = {
  type: string;
  value?: any;
};

export type IframeControllerHandle = {
  emit: (event: string, value?: any) => void;
};

type Props = {
  width?: number | string;
  height?: number | string;
  onLoad?: () => void;
};

const IframeController = forwardRef<IframeControllerHandle, Props>(
  ({ width = "100%", height = 200, onLoad }, ref) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    useImperativeHandle(ref, () => ({
      emit: (type, value) => {
        iframeRef.current?.contentWindow?.postMessage({ type, value }, "*");
      },
    }));

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
