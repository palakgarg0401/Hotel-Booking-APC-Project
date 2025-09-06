import React, { useEffect, useState } from 'react'

const RoomTypeSelector = ({ handleNewRoomInputChange, newRoom }) => {
  const [RoomTypes, setRoomTypes] = useState([])
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
  const [newRoomType, setNewRoomType] = useState("")

  useEffect(() => {
    // Dummy data since getRoomTypes is not defined
    const fetchRoomTypes = async () => {
      // Replace this with API call or your actual function
      const data = ["Single", "Double", "Suite"]
      setRoomTypes(data)
    }
    fetchRoomTypes()
  }, [])

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  }

  const handleAddNewRoomType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...RoomTypes, newRoomType])
      setNewRoomType("")
      setShowNewRoomTypeInput(false)
    }
  }

  return (
    <>
      {RoomTypes.length > 0 && (
        <div>
          <select
            name='roomType'
            id='roomType'
            value={newRoom.roomType}
            onChange={(e) => {
              if (e.target.value === "Add New") {
                setShowNewRoomTypeInput(true)
              } else {
                handleNewRoomInputChange(e) // ✅ fixed function name
              }
            }}
          >
            <option value={""}>Select a room type</option>
            <option value={"Add New"}>Add New</option>
            {RoomTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          {showNewRoomTypeInput && (
            <div className='input-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter a new room type'
                value={newRoomType} // ✅ keep input controlled
                onChange={handleNewRoomTypeInputChange}
              />
              <button
                className='btn btn-hotel'
                type='button'
                onClick={handleAddNewRoomType}
              >
                Add
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default RoomTypeSelector
