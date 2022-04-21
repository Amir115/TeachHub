import {useState, useEffect, useRef, useCallback} from 'react';
import { io, Socket } from "socket.io-client";
import omit from 'lodash/omit';
import useAuth from '../../hooks/auth/use-auth';

type UserMediaSource = {userId: string, mediaSource: MediaSource}

const usedMimeType = "video/webm; codecs=\"opus, vp8\""

const useMapRef = <T>() => {
    const mapRef = useRef<Record<string, T | undefined>>({});

    return mapRef.current
}

const useCameraStream = (outgoingStream: MediaStream | null, streamPath: string): [() => () => void, Record<string, UserMediaSource>] => {
    const session = useAuth()
    const socketRef = useRef<Socket | null>(null)
    
    const incomingUserImagesQueues = useMapRef<ArrayBuffer[]>()
    const incomingSourceBuffers = useMapRef<SourceBuffer>()
    
    const [usersMediaSources, setUsersMediaSources] = useState<Record<string, UserMediaSource>>({})
    
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const setupMediaSource = (userSocketId: string) => {
        const mediaSource = new MediaSource()
    
        const onSourceOpen = () => {
            const sourceBuffer = mediaSource.addSourceBuffer(usedMimeType)
            
            const onUpdate = () => {
                const userQueue = incomingUserImagesQueues[userSocketId]
                const nextItem = userQueue?.shift()

                if (nextItem && !sourceBuffer?.updating) {
                    sourceBuffer.appendBuffer(nextItem)
                }
            };
            
            incomingSourceBuffers[userSocketId] = sourceBuffer
            sourceBuffer.addEventListener('update', onUpdate, false);
        };

        const onSourceClose = (event: Event) => {
            console.warn("Media source closed", event)
        }

        mediaSource.addEventListener('sourceopen', onSourceOpen)
        mediaSource.addEventListener('sourceclose', onSourceClose)

        return mediaSource;
    }

    const setupSocket = () => {
        const socket = io(streamPath, {query: {token: session?.token}})
        socket.connect()

        const handleUserImage = (chunk: ArrayBuffer, userSocketId: string) => {
            const userSourceBuffer = incomingSourceBuffers[userSocketId];
            if (!userSourceBuffer) {
                return;
            }

            let userImagesQueue = incomingUserImagesQueues[userSocketId];
            if (!userImagesQueue) {
                userImagesQueue = incomingUserImagesQueues[userSocketId] = []; 
            }

            if (userImagesQueue.length ||  userSourceBuffer.updating) {
                userImagesQueue.push(chunk)
            } else {
                userSourceBuffer.appendBuffer(chunk)
            }
        };

        const handleUserJoin = (userSocketId: string, userId: string) => {
            setUsersMediaSources(existingMediaSources => ({
                ...existingMediaSources,
                [userSocketId]: {userId, mediaSource: setupMediaSource(userSocketId)}
            }));
        }

        const handleUserLeft = (userSocketId: string) => {
            const userMediaSource = usersMediaSources[userSocketId];
            userMediaSource?.mediaSource.endOfStream();
            setUsersMediaSources(existingMediaSources => ({...omit(existingMediaSources, userSocketId)}));
        }

        socket.on('userjoin', handleUserJoin)
        socket.on('userimage', handleUserImage)
        socket.on('userleft', handleUserLeft)

        return socket;
    }

    const setupMediaRecorder = () => {
      if (outgoingStream) {
        const recorder = new MediaRecorder(outgoingStream, {mimeType: usedMimeType});
        
        const onDataAvailable = ({data}: BlobEvent) => {
            if (data.size > 0) {
                data.arrayBuffer().then(buffer => {
                    socketRef.current?.emit('userimage', buffer)
                })
            }
        }
        
        recorder.addEventListener('dataavailable', onDataAvailable);

        return recorder;
      }  

      return null;
    }

    useEffect(() => {
        socketRef.current = setupSocket();

        return () => {
            socketRef.current?.disconnect();
        }
    }, []);
    
    const startCapturing = useCallback(() => {
      const recorder = setupMediaRecorder()

      mediaRecorderRef.current = recorder
      recorder?.start(500);

      return () => recorder?.stop()
    }, [outgoingStream]);

    return [startCapturing, usersMediaSources]
}

export default useCameraStream