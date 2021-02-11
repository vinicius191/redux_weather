import { useState, useEffect } from 'react';

const Message = (props) => {

    const [show, setShow] = useState(true);

    // onComponentDidMount set the timer
    useEffect(() => {
        const timeId = setTimeout(() => {
            setShow(false)
        }, props.timeout);

        return () => {
            clearTimeout(timeId);
        }
    }, [])

    let message = null;

    switch (props.type) {
        case "error":
            message = (
                <div className="ui mini negative message message_component">
                    <div className="header">
                        Error
                    </div>
                    <p>{props.message}</p>
                </div>
            )
            break;
        case "success":
            message = (
                <div className="ui mini positive message message_component">
                    <div className="header">
                        Success
                    </div>
                    <p>{props.message}</p>
                </div>
            )
            break;
        default:
            message = (
                <div className="ui mini info message message_component">
                    <div className="header">
                        Info
                    </div>
                    <p>{props.message}</p>
                </div>
            )
            break;
    }

    if(!show) {
        return null;
    }

    console.log('message', message);

    return message;
}

export default Message;