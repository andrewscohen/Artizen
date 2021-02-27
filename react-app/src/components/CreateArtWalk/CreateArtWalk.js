import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {useDispatch} from "react-redux";
import Gmap from "../Maps/Map.js"
import mapStyle from "../Maps/mapStyle.js"

const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: "1.5em",
      backgroundColor: "rgba(254, 58, 158, .7)",
      borderRadius: "2px",
      border: "none",
      width: "40%",
      boxSizing: "border-box",

    },
    overlay : {
        // backgroundColor: "transparent",
        backgroundColor: "rgba(0, 0, 0, .6)",
        zIndex: "100",
    }
};

const CreateArtWalk = () => {
    const [artWalkName, setArtWalkName] = useState('');
    const [showModal, setShowModal] = useState(true);

useEffect(() => {
    async function locations() {
        await dispatch(getLocations.all());
      }
      comment();
    }, [dispatch, locationId]);

const onClick = () => {
    setShowModal(false)
}

    return (
        <>
            <Modal style={customStyles} isOpen={showModal}>
                <form onSubmit={onClick}>
                    <div>
                        <h2>Create A Name For Your Walk</h2>
                        <input
                        type='text'
                        placeholder='Art Walk Name'
                        value={artWalkName}
                        onChange={(e) => setArtWalkName(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <button type="submit" disabled={artWalkName.length ? false : true}>Enter</button>
                    </div>
                </form>
            </Modal>
            <h1>New Art Walk: {artWalkName}</h1>
            <div>
            {/* <Gmap/> */}
            </div>

        </>
    )
}


export default CreateArtWalk

// name
// use
