import React, { useRef } from "react";
import { v1 as uuid } from "uuid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import '../styles/createMeeting.css'


export default function CreateMeeting(){

    const id = useRef(uuid())
    function create() {
        const win = window.open(`/meeting/${id.current}`,'_blank')
        //history.push(`/meeting/${id.current}`)
        id.current = uuid();
        win.focus()
    }

    return (
        <CopyToClipboard text = {id.current}>
        <button className="w-100 create-meeting-btn" onClick={create}>Create Room</button>
        </CopyToClipboard>
    );
};
