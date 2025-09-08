import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions'

const RoomTypeSelector = ({ handleNewRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([""])
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
  const [newRoomType, setNewRoomType] = useState("")

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data);
    })
  }, [])

  // useEffect(() => {
  //   // Dummy data since getRoomTypes is not defined
  //   const fetchRoomTypes = async () => {
  //     // Replace this with API call or your actual function
  //     const data = ["Single", "Double", "Suite"]
  //     setRoomTypes(data)
  //   }
  //   fetchRoomTypes()
  // }, [])

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  }

  const handleAddNewRoomType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType])
      setNewRoomType("")
       handleNewRoomInputChange({ target: { name: "roomType", value: newRoomType } })
      setShowNewRoomTypeInput(false)
    }
  }

  return (
    <>
      {roomTypes.length > 0 && (
        <div>
          <select
            name='roomType'
            id='roomType'
            value={newRoom.roomType}
            onChange={(e) => {
              if (e.target.value === "Add New") {
                setShowNewRoomTypeInput(true)
              } else {
                handleNewRoomInputChange(e) 
              }
          }}>
            <option value={""}>Select a room type</option>
            <option value={"Add New"}>Add New</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>

          {showNewRoomTypeInput && (
            <div className='input-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter a new room type'
                onChange={handleNewRoomTypeInputChange}
              />
              <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>Add</button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default RoomTypeSelector