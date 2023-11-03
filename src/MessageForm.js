import { ValidationError, useForm } from "@formspree/react";

function MessageForm () {
    const [state, handleSubmit] = useForm('xknlklke');

    if (state.succeeded) {
        return <p className="submited-form">Thanks for your message!</p>;
    }

    return(
        
        <form className="send-message" method="POST" onSubmit={handleSubmit}>
            
            <label htmlFor="name">Full Name</label>
            <input className="message-input" id="name" type="text" name="name" placeholder="Your Name..." required />
            <ValidationError prefix="Name" field="name" errors={state.errors} />

            <label htmlFor="email">Email Address</label>
            <input className="message-input" id="email" type="email" name="email" placeholder="Your email..." required />
            <ValidationError prefix="Email" field="email" errors={state.errors} />

            <label htmlFor="message">Message</label>
            <textarea className="message-textarea" id="message" name="message" placeholder="Type your massage..." required></textarea>
            <ValidationError prefix="Message" field="message" errors={state.errors} />

            <div className="center">
            <button className="btm-send-message" type="submit" disabled={state.submitting}>SEND</button>
            <ValidationError errors={state.errors} />
            </div>
            
        </form>
        
    )
}
export default MessageForm;