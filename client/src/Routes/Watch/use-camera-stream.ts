import {useEffect, useRef, useCallback} from 'react';
import { io, Socket } from "socket.io-client";
import useAuth from "../../hooks/auth/use-auth";
import { useState } from 'react';

const useCameraStream = (outgoingStream: MediaStream | null, streamPath: string): [() => () => void, MediaSource | null] => {
    const socketRef = useRef<Socket | null>(null)
    const incomingImageQueueRef = useRef<any[]>([])
    const session = useAuth()
    
    const [incomingMediaSource, setIncomingMediaSource] = useState<MediaSource | null>(null)
    const incomingImageBufferRef = useRef<SourceBuffer | null>(null)

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const type = "video/webm; codecs=\"opus, vp8\""

    useEffect(() => {
        const socket = io(streamPath)
        
        const mediaSource = new MediaSource()
        if (!MediaSource.isTypeSupported(type)) console.error('Not Supported')

        setIncomingMediaSource(mediaSource)
        mediaSource.addEventListener('sourceopen', () => {
            incomingImageBufferRef.current = mediaSource.addSourceBuffer(type)
            
            const onUpdate = () => {
                if (incomingImageQueueRef.current?.length && !incomingImageBufferRef.current?.updating) {
                    incomingImageBufferRef.current?.appendBuffer(incomingImageQueueRef.current.shift())
                }
            };
    
            incomingImageBufferRef.current?.addEventListener('update', onUpdate, false);
        })

        mediaSource.onsourceclose = (...args) => {
            const a = args;
            debugger;
        }

        socket.connect()
        socket.on('userimage', (chunk, _, userId) => {
            if (userId === '1' && mediaSource.readyState === "open" && incomingImageBufferRef.current) {
                if (incomingImageQueueRef.current.length || incomingImageBufferRef.current.updating) {
                    incomingImageQueueRef.current.push(chunk)
                } else {
                    incomingImageBufferRef.current.appendBuffer(chunk)
                }
            }
        })

        socketRef.current = socket

        return () => {
            socket.disconnect();
        }
    }, [])

    const startCapturing = useCallback(() => {
      if (!outgoingStream) {
          return () => {};
      }  

      const recorder = new MediaRecorder(outgoingStream, {mimeType: type});
      
      mediaRecorderRef.current = recorder
      
      recorder.ondataavailable = ({data}) => {
        if (data.size > 0) {
            data.arrayBuffer().then(buffer => {
                socketRef.current?.emit('userimage', buffer, data.type, session?.token)
            })
        }
      }

      recorder.start(500);

      return () => recorder.stop()
    }, [outgoingStream]);

    return [startCapturing, incomingMediaSource]
}

export default useCameraStream