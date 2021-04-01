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
      padding: "2.5em",
      backgroundColor: "rgba(254, 58, 158, .7)",
      borderRadius: "5px",
      border: "none",
      width: "400px",
      boxSizing: "border-box",
    },
    overlay : {
        // backgroundColor: "transparent",
        backgroundColor: "rgba(0, 0, 0, .6)",
        zIndex: "100",
    }
};

const AuthModal = ({setAuthenticated, setDisplay}) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(true);

    const showSignUpModal = () => {
        setShowLoginForm(false)
        setIsOpen(true)
        setDisplay(false)
    }

    const showLoginModal = () => {
        setShowLoginForm(true)
        setIsOpen(true)
        setDisplay(false)
    }

    const onClick = () => {
        setIsOpen(false);
        setDisplay(true);
    }


    return (
        <>
            <button className="login-btn" onClick={() => showLoginModal()}><i className="fas fa-user"></i> Login</button>
            <button className="signup-btn" onClick={() => showSignUpModal()}>Sign Up</button>
            <Modal
                style={customStyles}
                isOpen={modalIsOpen}
                onRequestClose={onClick}
                >
            {
                showLoginForm ?
                <>
                    <div className="login-modal-top-row">
                        <h1 className="title">Login</h1>
                        <button className="btn__x" onClick={onClick}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <LoginModalForm showLoginForm={showLoginForm} setShowLoginForm={setShowLoginForm}  setAuthenticated={setAuthenticated} />
                </>
                :
                <>
                    <div className="signup-modal-top-row">
                        <h1 className="title">Sign Up</h1>
                        <button className="btn__x" onClick={onClick}>
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
