import { useContext } from "react";
import { MessageContext } from "../store/messageStore";
function Message() {
    // const [Message, setMessage] = useState({});
    const [Message] = useContext(MessageContext);
    return (
        <>
            <div className='toast-container position-fixed' style={{ top: '60px', right: '15px' }} >
                {Message.title && (
                    <div className='toast show' role='alert' aria-live='assertive' aria-atomic='true' data-delay='3000'>
                        <div className={`toast-header text-white bg-${Message.type}`}>
                            <strong className='me-auto'>{Message.title}</strong>
                            <button type='button' className='btn-close' data-bs-dismiss='toast' aria-label='Close' />
                        </div>
                        <div className='toast-body'>{Message.content}</div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Message;