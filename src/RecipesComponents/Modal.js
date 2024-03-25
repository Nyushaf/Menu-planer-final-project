const Modal = ({setIsOpen, children}) => {
    const closeModal = e => {
        if (e.target.classList.contains('overlay')) {
            setIsOpen(false);
        }
    }
    return(
        <div className='my_modal'>
            <div className='my_overlay' onClick = {closeModal}>
                {children}
            </div>
        </div>
    )
}
export default Modal;