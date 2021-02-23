import React, {useState} from "react";
import Modal from "react-modal";
import LoginForm from "../auth/LoginForm"

const LoginModal = ({setAuthenticated}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)} >Log In(Modal)</button>

            <Modal isOpen={showModal}>
                <button onClick={() => setShowModal(false)}>
                    <i class="fas fa-times"></i>
                </button>
                <LoginForm setAuthenticated={setAuthenticated} />
            </Modal>
        </>
    )
}

export default LoginModal