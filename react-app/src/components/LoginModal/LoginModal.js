import React, {useState} from "react";
import Modal from "react-modal";
import LoginModalForm from "./LoginModalForm"
import SignupModalForm from "./SignupModalForm"
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
    const [showLoginForm, setShowLoginForm] = useState(true);

    return (
        <>
            <button onClick={() => setShowModal(true)} >Log In(Modal)</button>
            <Modal style={customStyles} isOpen={showModal}>
            {
                showLoginForm ?
                <>
                    <div className="login-modal-top-row">
                        <h1>Login</h1>
                        <button onClick={() => setShowModal(false)}>
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <LoginModalForm showLoginForm={showLoginForm} setShowLoginForm={setShowLoginForm}  setAuthenticated={setAuthenticated} />   
                </>
                :
                <>
                    <div className="signup-modal-top-row">
                        <h1>Sign Up</h1>
                        <button onClick={() => setShowModal(false)}>
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <SignupModalForm setShowLoginForm={setShowLoginForm} setAuthenticated={setAuthenticated} />
                </>
            }
            </Modal>
        </>
    )
}

export default LoginModal