"use client"

import { useEffect, useRef, useState } from "react"

interface Props {
	keypadInitialized: (value: boolean) => void;
	changeLength: (value: number) => void;
	requestValues: (value: unknown) => void;
	bioAuthentication: () => void;
}


export default function KeyPad() {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [loadedData, setLoadedData] = useState(false);

	const keypadEvent = (event: MessageEvent) => {
		event.preventDefault();

		const status = event.data.status as string;
		const value = event.data.value;

	}

	const sendCommand = (command: string, params: object | undefined = undefined) => {
		const iframe = iframeRef.current;

		if (!iframe) {
			return;
		}

		if (!iframe.contentWindow?.postMessage) {
			return;
		}

		iframe.contentWindow.postMessage(
			{
				command,
				params: JSON.stringify(params)
			},
			'*'
		);
  };

	const loadedContent = () => {
		sendCommand('showKeyboard', {
			useBioAuthentication: true
		});
	};

    useEffect(() => {
        if(iframeRef.current) {
					const iframe = iframeRef.current;
        console.log("==========", iframe?.contentWindow?.location)

					// iframe.contentWindow?.location.replace("http://localhost:3000/keypad")
					// iframe.contentWindow?.location.replace("https://web-damoum.danalpay.com/keypad")
					// iframe.contentWindow?.postMessage({command: "showKeyboard"}, '*')
        }
    }, [])

    return (
         
        <iframe ref={iframeRef} id="keypad_iframe" src="/keypad/index.html" onLoad={loadedContent} style={{height: '500px'}}/>
        // <iframe ref={iframeRef} id="keypad_iframe" src="https://web-damoum.danalpay.com/keypad" />
    )
}