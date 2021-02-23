import React, {useState} from "react";
import Modal from "react-modal";
import LoginModalForm from "./LoginModalForm"
import "./LoginModal.css"

const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: "3em"
    }
};

const LoginModal = ({setAuthenticated}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)} >Log In(Modal)</button>

            <Modal style={customStyles} isOpen={showModal}>
                <div className="login-modal-top-row">
                    <h1>Login</h1>
                    <button onClick={() => setShowModal(false)}>
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <LoginModalForm setAuthenticated={setAuthenticated} />
            </Modal>
        </>
    )
}

export default LoginModal