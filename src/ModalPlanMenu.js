const ModalPlanMenu = ({setSelectedDay, children}) => {
    const closeModal = e => {
        if (e.target.classList.contains('overlay')) {
            setSelectedDay(false);
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
export default ModalPlanMenu;