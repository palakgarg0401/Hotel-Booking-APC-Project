import React, { useEffect, useState } from 'react'

const RoomTypeSelector = ({handleNewRoomInputChange,newRoom}) => {
    const[RoomTypes,setRoomTypes]=useState([])
    const[showNewRoomTypeInput,setShowNewRoomTypesInput]=useState(false)
    const[newRoomType,setNewRoomType]=useState("")
    useEffect(()=>{
        getRoomTypes().then((data)=>{
            setRoomTypes(data)
        })
    },[])
    const handleNewRoomTypeInputChange=(e)=>{
        setNewRoomType(e.target.value);
    }
    const handleAddNewRoomType=()=>{
      if(newRoomType!==""){
        setRoomTypes([...RoomTypes,newRoomType])
        setNewRoomType("")
        setShowNewRoomTypesInput(false)
      }
    }
  return (
   <>
   {RoomTypes.length>0 && (
    <div>
      <select name='roomType' id='roomType'
      value={newRoom.roomType}
      onChange={(e)=>{
        if(e.target.value==="Add New"){
          setShowNewRoomTypesInput(true)
        }else{
          handleRoomInputChange(e)
        }
      }}>
        <option value={""}>select a room type</option>
        <option value={"Add New"}>Add New</option>
        {RoomTypes.map((type,index)=>(
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      {showNewRoomTypeInput && (
        <div className='input-group'>
          <input type='text'
          className='form-control'
          placeholder='Enter a new room type'
          onChange={handleNewRoomTypeInputChange}/>
          <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>Add</button>
          </div>
      )}
    </div>
   )}
   </>
  )
}

export default RoomTypeSelector
