import React, { useRef } from "react";
import { v1 as uuid } from "uuid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";

export default function CreateMeeting(){
    const history = useHistory()
    const id = useRef(uuid())
    function create() {
        history.push(`/meeting/${id.current}`)
    }

    return (
        <CopyToClipboard text = {id.current}>
        <Button className="w-100" onClick={create}>Create Meeting</Button>
        </CopyToClipboard>
    );
};
