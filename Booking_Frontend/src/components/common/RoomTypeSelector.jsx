// import React, { useState, useEffect } from "react"
// import { getRoomTypes } from "../utils/ApiFunctions"

// const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
// 	const [roomTypes, setRoomTypes] = useState([""])
// 	const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
// 	const [newRoomType, setNewRoomType] = useState("")

// 	useEffect(() => {
// 		getRoomTypes().then((data) => {
// 			setRoomTypes(data)
// 		})
// 	}, [])

// 	const handleNewRoomTypeInputChange = (e) => {
// 		setNewRoomType(e.target.value)
// 	}

// 	const handleAddNewRoomType = () => {
// 		if (newRoomType !== "") {
// 			setRoomTypes([...roomTypes, newRoomType])
// 			setNewRoomType("")
// 			setShowNewRoomTypeInput(false)
// 		}
// 	}

// 	return (
// 		<>
// 			{roomTypes.length > 0 && (
// 				<div>
// 					<select
// 						required
// 						className="form-select"
// 						name="roomType"
// 						onChange={(e) => {
// 							if (e.target.value === "Add New") {
// 								setShowNewRoomTypeInput(true)
// 							} else {
// 								handleRoomInputChange(e)
// 							}
// 						}}
// 						value={newRoom.roomType}>
// 						<option value="">Select a room type</option>
// 						<option value={"Add New"}>Add New</option>
// 						{roomTypes.map((type, index) => (
// 							<option key={index} value={type}>
// 								{type}
// 							</option>
// 						))}
// 					</select>
// 					{showNewRoomTypeInput && (
// 						<div className="mt-2">
// 							<div className="input-group">
// 								<input
// 									type="text"
// 									className="form-control"
// 									placeholder="Enter New Room Type"
// 									value={newRoomType}
// 									onChange={handleNewRoomTypeInputChange}
// 								/>
// 								<button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>
// 									Add
// 								</button>
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			)}
// 		</>
// 	)
// }

// export default RoomTypeSelector


import React, { useState, useEffect } from "react"
import { getRoomTypes } from "../utils/ApiFunctions"

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
    // Initial state is an empty array, as we load data from the API
    const [roomTypes, setRoomTypes] = useState([])
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
    const [newRoomType, setNewRoomType] = useState("")
    const [error, setError] = useState(null)

    useEffect(() => {
        getRoomTypes()
            .then((data) => {
                // Assuming data is an array of room type strings
                setRoomTypes(data)
            })
            .catch((e) => {
                console.error("Failed to fetch room types:", e)
                setError("Failed to load room types. Please ensure the server is running.")
            })
    }, [])

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value)
    }

    const handleAddNewRoomType = () => {
        if (newRoomType.trim() !== "") {
            // Optimistically add the new type to the local state
            setRoomTypes([...roomTypes, newRoomType])
            
            // Trigger the parent component's handler to update the form state
            handleRoomInputChange({ 
                target: { name: "roomType", value: newRoomType } 
            })

            setNewRoomType("")
            setShowNewRoomTypeInput(false)
        }
    }

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <select
                required
                className="form-select"
                name="roomType"
                onChange={(e) => {
                    // Reset error state on interaction
                    setError(null); 
                    if (e.target.value === "Add New") {
                        setShowNewRoomTypeInput(true)
                    } else {
                        setShowNewRoomTypeInput(false) // Hide input if they select an existing type
                        handleRoomInputChange(e)
                    }
                }}
                value={newRoom.roomType}>
                
                <option value="">Select a room type</option>
                <option value={"Add New"}>Add New</option>
                
                {/* Map existing room types */}
                {roomTypes.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            {/* Conditional input for adding a new type */}
            {showNewRoomTypeInput && (
                <div className="mt-2">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter New Room Type"
                            value={newRoomType}
                            onChange={handleNewRoomTypeInputChange}
                        />
                        <button 
                            className="btn btn-hotel" 
                            type="button" 
                            onClick={handleAddNewRoomType}>
                            Add
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default RoomTypeSelector
