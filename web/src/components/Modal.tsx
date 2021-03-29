import React from 'react';
import { FiX } from 'react-icons/fi';

import '../styles/components/modal.css';

interface ModalProps {
    title: string;
    toogleModal: () => void | null;
    closeModal: (event: any) => void | null;
    onClickOk: () => void | null;
}

const Modal: React.FC<ModalProps> = ({ title, toogleModal, closeModal, onClickOk, children }) => {

    return (
        <aside id="modal" onClick={closeModal}>
            <header>
                <h2>{title}</h2>
                <FiX className="modal-x-icon" onClick={toogleModal} />
            </header>
            <main>
                {children}
            </main>
            <footer>
                <button className="danger" onClick={onClickOk}>OK</button>
                {/* <button className="primary" onClick={toogleModal}>Cancelar</button> */}
            </footer>
        </aside>
    );
}

export default Modal;