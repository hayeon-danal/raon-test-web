'use client';

import { forwardRef, useRef, useImperativeHandle } from 'react';

export type IframeEventPayload = {
    type: string;
    payload?: any;
};

export type IframeControllerHandle = {
    emit: (event: string, payload?: any) => void;
};

type Props = {
    src: string;
    width?: number | string;
    height?: number | string;
    onLoad?: () => void;
};

const IframeController = forwardRef<IframeControllerHandle, Props>(
    ({ src, width = '100%', height = 500, onLoad }, ref) => {
        const iframeRef = useRef<HTMLIFrameElement>(null);
        useImperativeHandle(ref, () => ({
            emit: (type, payload) => {
                iframeRef.current?.contentWindow?.postMessage({ type, payload }, '*');
            },
        }));

        return (
            <iframe
                ref={iframeRef}
                src={src}
                width={width}
                height={height}
                onLoad={onLoad}
                frameBorder="0"

                sandbox="allow-scripts allow-same-origin"
            />
        );
    }
);

IframeController.displayName = 'IframeController';

export default IframeController;
