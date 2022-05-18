import {useState, useEffect, useRef} from 'react';
import { Socket } from "socket.io-client";
import omit from 'lodash/omit';

import { USED_MIME_TYPE } from './codecs';
import useMediaRecorder from './use-media-recorder';

type UserMediaSource = {userId: string, mediaSource?: MediaSource}

const useMapRef = <T>() => {
    const mapRef = useRef<Partial<Record<string, T>>>({});

    return mapRef.current
}

const useCameraStream = (socket: Socket | null, outgoingStream: MediaStream | null): [() => () => void, Partial<Record<string, UserMediaSource>>] => {
    const usersBufferPendingOperations = useMapRef<((buffer: SourceBuffer) => void | true)[]>()
    const usersSourceBuffers = useMapRef<SourceBuffer>()
    
    const [usersMediaSources, setUsersMediaSources] = useState<Record<string, UserMediaSource>>({})
    const usersMediaSourcesRef = useRef(usersMediaSources)
    
    const mediaRecorder = useMediaRecorder(outgoingStream, (buffer, headersSent) => socket?.emit('userimage', buffer, !headersSent))

    const flushUserSourceBufferQueue = (userSocketId: string) => {
        const userBuffer = usersSourceBuffers[userSocketId]
        if (!userBuffer) return;

        const userOpQueue = usersBufferPendingOperations[userSocketId]
        const nextOperation = userOpQueue?.shift()

        if (nextOperation && !userBuffer.updating) {
            const result = nextOperation(userBuffer);
            if (result) flushUserSourceBufferQueue(userSocketId)
        }
    }
 
    const setupMediaSource = (userSocketId: string, onOpen?: () => void) => {
        const mediaSource = new MediaSource()
    
        const onSourceOpen = () => {
            const sourceBuffer = mediaSource.addSourceBuffer(USED_MIME_TYPE)

            const onUpdate = () => {
                flushUserSourceBufferQueue(userSocketId)
            };
            
            usersSourceBuffers[userSocketId] = sourceBuffer
            sourceBuffer.addEventListener('update', onUpdate, false);
            onOpen?.();
        };

        const onSourceClose = (event: Event) => {
            console.warn("Media source closed", event)
        }

        mediaSource.addEventListener('sourceopen', onSourceOpen)
        mediaSource.addEventListener('sourceclose', onSourceClose)

        return mediaSource;
    }

    const setupSocket = () => {
        if (!socket) return;

        const handleUserImage = (chunk: ArrayBuffer, userSocketId: string, removeOldChunks: boolean = false) => {
            let userOperationsQueue = usersBufferPendingOperations[userSocketId];
            if (!userOperationsQueue) {
                userOperationsQueue = usersBufferPendingOperations[userSocketId] = []; 
            }

            const userMediaSource = usersMediaSourcesRef.current[userSocketId]
            if (removeOldChunks) {
                userMediaSource?.mediaSource?.readyState === 'open' && userMediaSource?.mediaSource?.endOfStream();
                delete usersSourceBuffers[userSocketId]
                userMediaSource.mediaSource = setupMediaSource(userSocketId, () => flushUserSourceBufferQueue(userSocketId))
                setUsersMediaSources({...usersMediaSourcesRef.current})
            }
           
            userOperationsQueue.push(buffer => {
                try {
                    buffer.appendBuffer(chunk)
                } catch(e: any) {
                    console.warn(e);
                    delete usersSourceBuffers[userSocketId];
                }
                
            })
            if (!removeOldChunks) {
                flushUserSourceBufferQueue(userSocketId)
            }
        };

        const handleUserJoin = (userSocketId: string, userId: string) => {
            setUsersMediaSources(existingMediaSources => ({
                ...existingMediaSources,
                [userSocketId]: {userId, mediaSource: undefined}
            }));
        }

        const handleUserLeft = (userSocketId: string) => {
            const userMediaSource = usersMediaSources[userSocketId];
            userMediaSource?.mediaSource?.endOfStream();
            setUsersMediaSources(existingMediaSources => ({...omit(existingMediaSources, userSocketId)}));
        }

        socket?.on('userjoin', handleUserJoin)
        socket?.on('userimage', handleUserImage)
        socket?.on('userleft', handleUserLeft)

        return socket;
    }

    useEffect(() => {
        setupSocket();
    }, [socket]);

    useEffect(() => {
        usersMediaSourcesRef.current = usersMediaSources
    }, [usersMediaSources]);
    
    const startCapturing = () => {
      mediaRecorder.start();  

      return mediaRecorder.stop;
    };

    return [startCapturing, usersMediaSources]
}

export default useCameraStream