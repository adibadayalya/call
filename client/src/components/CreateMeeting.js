import React, { useRef } from "react";
import { v1 as uuid } from "uuid";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Button } from "react-bootstrap";

export default function CreateMeeting(){

    const id = useRef(uuid())
    function create() {
        const win = window.open(`/meeting/${id.current}`,'_blank')
        //history.push(`/meeting/${id.current}`)
        win.focus()
    }

    return (
        <CopyToClipboard text = {id.current}>
        <Button variant="outline-light" className="w-100" onClick={create}><b>Create Room</b></Button>
        </CopyToClipboard>
    );
};
