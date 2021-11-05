import {Modal} from '@material-ui/core';
import {ReactChild, ReactChildren} from 'react';
import './modal.css';

export interface ModalProps {
    children: ReactChild | ReactChildren;
    isOpen: boolean;
    onClose: any;
}

const MyModal = ({children, isOpen, onClose}: ModalProps) => {
    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className={"modal"}>
                {children}
            </div>
        </Modal>
    )
}

export default MyModal;