import React, {useState} from "react";
import Modal from "react-modal";
import LoginModalForm from "./LoginModalForm"
import SignupModalForm from "./SignupModalForm"
import "./LoginModal.css"
import "./SignupModal.css"

const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: "1.5em",
      backgroundColor: "rgba(254, 58, 158, .8)",
      borderRadius: "none",
      border: "none",
      width: "40%",
      boxSizing: "border-box",
    },
    overlay : {
        backgroundColor: "rgba(0, 0, 0, .6)",
    }
};

const AuthModal = ({setAuthenticated}) => {
    const [showModal, setShowModal] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(true);

    const showSignUpModal = () => {
        setShowLoginForm(false)
        setShowModal(true)
    }

    const showLoginModal = () => {
        setShowLoginForm(true)
        setShowModal(true)
    }



    return (
        <>
            <button className="login-btn" onClick={() => showLoginModal()}><i className="fas fa-user"></i>  Login</button>
            <button className="signup-btn" onClick={() => showSignUpModal()}>Sign Up</button>
            <Modal style={customStyles} isOpen={showModal}>
            {
                showLoginForm ?
                <>
                    <div className="login-modal-top-row">
                        <h1 className="title">Login</h1>
                        <button className="btn__x" onClick={() => setShowModal(false)}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <LoginModalForm showLoginForm={showLoginForm} setShowLoginForm={setShowLoginForm}  setAuthenticated={setAuthenticated} />
                </>
                :
                <>
                    <div className="signup-modal-top-row">
                        <h1 className="title">Sign Up</h1>
                        <button className="btn__x" onClick={() => setShowModal(false)}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <SignupModalForm setShowLoginForm={setShowLoginForm} setAuthenticated={setAuthenticated} />
                </>
            }
            </Modal>
        </>
    )
}

export default AuthModal;
