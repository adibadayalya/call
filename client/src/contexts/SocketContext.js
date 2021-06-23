import React, { useEffect, useState, useRef,useContext } from 'react'
//import { v4 as uuidV4 } from 'uuid'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

//import {useAuth} from './AuthContext'

const SocketContext = React.createContext()
const socket = io('http://localhost:3001')

export function useSocket() {
    return useContext(SocketContext);
}

const ContextProvider=({ children }) =>{
    //const {currentUser} = useAuth()
    const [stream, setStream] = useState(null)
    const [me, setMe] = useState('')
    const [call, setCall] = useState({})
    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState('')

    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    useEffect(() => {
        //startMediaInput()
        socket.on('me', (id) => setMe(id))
        socket.on('calluser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal })
        })
    }, [])

    const startMediaInput=() =>{
        //console.log(currentUser.displayName)
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream)
                myVideo.current.srcObject = currentStream
            })
    }
    const videoOff=()=> {
        stream.getTracks().forEach(function(track) {
            if (track.readyState === 'live' && track.kind === 'video') {
                track.stop();
            }
        });
    }
    const micOff=()=> {
        stream.getTracks().forEach(function(track) {
            if (track.readyState === 'live' && track.kind === 'audio') {
                track.stop();
            }
        });
    }

    const answerCall=()=> {
        setCallAccepted(true)

        const peer = new Peer({ initiator: false, trickle: false, stream })

        peer.on('signal', (data) => {
            socket.emit('answercall', { signal: data, to: call.from })
        })

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream
        })

        peer.signal(call.signal)

        connectionRef.current = peer

    }

    const callUser=(id)=> {
        const peer = new Peer({ initiator: true, trickle: false, stream })

        peer.on('signal', (data) => {
            //setName(currentUser.displayName)
            socket.emit('calluser', { userToCall: id, signalData: data, from: me, name})
        })
        socket.on('callaccepted', (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream
        })
        connectionRef.current = peer        
    }

    const leaveCall=()=> {
        setCallEnded(true)
        connectionRef.current.destroy()
        window.location.reload()
    }

    return ( < SocketContext.Provider value = {
            {
                call,
                callAccepted,
                callEnded,
                myVideo,
                userVideo,
                stream,
                name,
                setName,
                leaveCall,
                answerCall,
                me,
                startMediaInput,
                videoOff,
                micOff,
                callUser
            }
        } > { children } </SocketContext.Provider>)
    }

    export {ContextProvider, SocketContext}
    