package com.hotelBooking.Backend.service;

import com.hotelBooking.Backend.exception.InternalServerException;
import com.hotelBooking.Backend.exception.ResourceNotFoundException;
import com.hotelBooking.Backend.model.Room;
import com.hotelBooking.Backend.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import javax.sql.rowset.serial.SerialBlob;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class RoomService implements IRoomService {
    private final RoomRepository roomRepository;
    @Override
    public Room addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice) throws SQLException, IOException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        if (!file.isEmpty()){
            byte[] photoBytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            room.setPhoto(photoBlob);
        }
        return roomRepository.save(room);
    }

    @Override
    public List<String> getAllRoomTypes(){
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException {
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if(theRoom.isEmpty()) {
            throw new ResourceNotFoundException("Sorry, Romm not found!");
        }
        Blob photoBlob = theRoom.get().getPhoto();
        if(photoBlob != null) {
            return photoBlob.getBytes(1, (int) photoBlob.length());
        }
        return null;
    }

    @Override
    public void deleteRoom(Long roomId) {
        // TODO Auto-generated method stub
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if(theRoom.isPresent()) {
            roomRepository.deleteById(roomId);
        }
    }

    @Override
    public Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, byte[] photoBytes) {
        // TODO Auto-generated method stub
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        if(roomType != null) {
            room.setRoomType(roomType);
        }
        if(roomPrice != null) {
            room.setRoomPrice(roomPrice);
        }
        if(photoBytes != null && photoBytes.length > 0) {
            try {
                room.setPhoto(new SerialBlob(photoBytes));
            }
            catch(SQLException ex) {
                throw new InternalServerException("Error in updating room");
            }
        }
        return roomRepository.save(room);
    }

    @Override
    public Optional<Room> getRoomById(Long roomId) {
        return Optional.of(roomRepository.findById(roomId).get());
    }


}