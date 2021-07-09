import React, { useRef } from "react";
import { v1 as uuid } from "uuid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import '../styles/createMeeting.css'

/**
 * #uses uuid to create uniquire room ids 
 * #uses CopyToClipboard to automatically copy the room ID to the clipboard everytime a new room is created
 * #returns the create Room Button at the dashboard menu
 */

export default function CreateMeeting(){

    const id = useRef(uuid())
    function create() {
        /**
         * #makes a new room and then open it in a new tab
         */
        const win = window.open(`/meeting/${id.current}`,'_blank')
        id.current = uuid();
        win.focus()
    }

    return (
        <CopyToClipboard text = {id.current}>
        <button className="w-100 create-meeting-btn" onClick={create}>Create Room</button>
        </CopyToClipboard>
    );
};
