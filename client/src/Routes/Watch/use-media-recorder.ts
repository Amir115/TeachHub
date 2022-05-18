import { useRef } from 'react';
import { USED_MIME_TYPE } from './codecs';

const useMediaRecorder = (stream: MediaStream | null, handleNewData: (buffer: ArrayBuffer, headersSent: boolean) => void) => {
    const mediaRecorderRef = useRef<MediaRecorder | undefined>()
    const resetIntervalRef = useRef<NodeJS.Timer | undefined>()
    
    const setupMediaRecorder = () => {
        if (!stream) return;

        const recorder = new MediaRecorder(stream, { mimeType: USED_MIME_TYPE });
        let headersSent = false

        const onDataAvailable = ({ data }: BlobEvent) => {
            if (data.size > 0) {
                const headersSentSnapshot = headersSent
                headersSent = true
                
                data.arrayBuffer().then(buffer => {
                    handleNewData(buffer, headersSentSnapshot)
                })
            }
        }

        recorder.addEventListener('dataavailable', onDataAvailable);

        return recorder;
    }

    const record = () => {
        mediaRecorderRef.current?.state !== 'inactive' && mediaRecorderRef.current?.stop()
        mediaRecorderRef.current = setupMediaRecorder()
        mediaRecorderRef.current?.start(500);
    }

    const start = () => {
        resetIntervalRef.current = setInterval(() => {
            record();
        }, 5000);
        
        record();
    }

    const stop = () => {
        resetIntervalRef.current && clearInterval(resetIntervalRef.current);

        if (mediaRecorderRef.current?.state == 'recording') {
            mediaRecorderRef.current?.stop()
        }
    }

    return {start, stop}
}

export default useMediaRecorder;