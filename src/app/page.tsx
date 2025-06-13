"use client"


import { useEffect, useRef } from 'react';
import IframeController, { IframeControllerHandle } from '@/components/IframeController';

export default function KeyPad() {
    const iframeRef = useRef<IframeControllerHandle>(null);

    const handleShowKeyboard = () => {
        iframeRef.current?.emit('showKeyboard');
    };
    const handleIframeLoad = () => {
        const iframe = iframeRef.current;
        console.log("handleIframeLoad")
        if (!iframe) {
            console.warn("iframeRef.current가 null입니다.");
            return;
        }

        console.log("✅ iframe 로드됨, showKeyboard 메시지 전송");
        iframe.emit('showKeyboard');
    };

    const requestValues = () => {
        iframeRef.current?.emit('requestValues');
    }

    // const keypadEvent = (event: MessageEvent) => {
    //     event.preventDefault();
    //     const status = event.data.status as string;
    //     const value = event.data.value;

    //     switch (status) {
    //         case 'init':
    //             emits('keypadInitialized', value as boolean);
    //             break;
    //         case 'changeInput':
    //             emits('changeLength', value as number);
    //             break;
    //         case 'requestValue':
    //             emits('requestValues', value);
    //             break;
    //         case 'bioAuthentication':
    //             emits('bioAuthentication');
    //             break;
    //     }
    // }

    // useEffect(() => {
    //     const iframe = iframeRef.current;
    //     if (!iframe) return;

    //     iframe.onload = () => {
    //         iframe.contentWindow?.postMessage({ type: 'showKeyboard' }, '*');
    //         console.log('✅ 메시지 전송 완료 (showKeyboard)');
    //     };

    // }, [])


    return (
        <main>
            <div style={{ marginBottom: '16px' }}>
                <button onClick={handleShowKeyboard}>showKeyboard</button>
                <button onClick={requestValues}>requestValues</button>
                {/* <button onClick={handleInitForm}>initForm</button>
                <button onClick={handlePrint}>print</button> */}
            </div>

            <IframeController ref={iframeRef} onLoad={handleIframeLoad} src="/keypad/index.html" />
        </main>
        // <iframe ref={iframeRef} id="keypad_iframe" src="/keypad/index.html" style={{ height: '100%' }} />
        // <iframe ref={iframeRef} id="keypad_iframe" src="https://web-damoum.danalpay.com/keypad" />
    )

}