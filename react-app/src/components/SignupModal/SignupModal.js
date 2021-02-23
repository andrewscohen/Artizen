import React, {useState} from "react";
import Modal from "react-modal";
import SignupModalForm from "./SignupModalForm"
import "./SignupModal.css"

const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: "2em"
    }
};

const SignupModal = ({setAuthenticated}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Sign Up(Modal)</button>

            <Modal style={customStyles} isOpen={showModal}>
                <div className="signup-modal-top-row">
                    <h1>Sign Up</h1>
                    <button onClick={() => setShowModal(false)}>
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <SignupModalForm setAuthenticated={setAuthenticated} />
            </Modal>
        </>
    )
}

export default SignupModal