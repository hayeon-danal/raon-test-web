"use client"

import { useEffect, useRef, useImperativeHandle } from "react"

export type IframeEventPayload = {
  type: string;
  payload?: any;
};

export type IframeControllerHandle = {
  emit: (event: string, payload?: any) => void;
};


export default function KeyPad() {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const keypadEvent = (event: MessageEvent) => {
		event.preventDefault();
		const status = event.data.status as string;
		const value = event.data.value;

		switch (status) {
			case 'init':
				emits('keypadInitialized', value as boolean);
				break;
			case 'changeInput':
				emits('changeLength', value as number);
				break;
			case 'requestValue':
				emits('requestValues', value);
				break;
			case 'bioAuthentication':
				emits('bioAuthentication');
				break;
		}
	}
}

useEffect(() => {
	const iframe = iframeRef.current;
	if (!iframe) return;

	iframe.onload = () => {
		iframe.contentWindow?.postMessage({ type: 'showKeyboard' }, '*');
		console.log('✅ 메시지 전송 완료 (showKeyboard)');
	};

}, [])


return (

	<iframe ref={iframeRef} id="keypad_iframe" src="/keypad/index.html" style={{ height: '500px' }} />
	// <iframe ref={iframeRef} id="keypad_iframe" src="https://web-damoum.danalpay.com/keypad" />
)
}