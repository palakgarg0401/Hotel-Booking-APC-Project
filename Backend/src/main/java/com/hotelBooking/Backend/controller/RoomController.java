package com.hotelBooking.Backend.controller;

import com.hotelBooking.Backend.response.RoomResponse;
import com.hotelBooking.Backend.service.IRoomService;
import com.hotelBooking.Backend.model.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
public class RoomController {
    private final IRoomService roomService;
    private final BookingService bookingService;
    @PostMapping("/add/new-room")
    public ResponseEntity<RoomResponse> addNewRoom(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice) throws SQLException, IOException {
        Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice);
        RoomResponse response = new RoomResponse(
                savedRoom.getId(),
                savedRoom.getRoomType(),
                savedRoom.getRoomPrice()
        );

        return ResponseEntity.ok(response);
    }
    @GetMapping("/room/types")
    public List<String> getRoomTypes(){
        return roomService.getAllRoomTypes();
    }
    public ResponseEntity<List<RoomResponse>> getAllRooms(){
        List<Room> rooms=roomService.getAllRooms();
        List<RoomResponse> roomResponses=new ArrayList<>();
        for(Room room:rooms){
            byte[] photoBytes=roomService.getRoomPhotoByRoomId(room.getId());
            if(photoBytes!=null && photoBytes.lengthy>0){
                String base64Photo=Base64.encodeBase64String(photoBytes);
                RoomResponse roomResponse=getRoomResponse(room);
                roomResponse.setPhoto(base64Photo);
                roomResponses.add(roomResponse);
            }
        }
        return ResponseEntity.ok(roomResponses);
    }
    private RoomResponse getRoomResponse(Room room){
        List<BookedRoom> bookings=getAllBookingsByRoomId(room.getId());
        List<BookingResponse> bookingInfo=bookings..stream()
        .map(booking -> new BookingResponse(booking.getBookingId(),
        booking.getCheckInDate(),
        booking.getCheckOutDate(),booking.getBookingConfirmationCode())).toList();

    byte[] photoBytes=null;
    Blob photpBlob=room.getPhoto();
    if(photoBlob!=null){
        try{
            photoBytes=photoBlob.getBytes(1,(int)photoBlob.length());
        }catch(SQLException e){
            throw new PhotoRetrievalException("Error retrieving photo");
        }
    }
    return new RoomResponse(room.getId(),
    room.getRoomType(),
    room.getRoomPrice(),
    room;.isBookes(),photoBytes,bookingInfo);
    }

    private List<BookedRoom> getAllBookingsByRoomId(Long roomId){
        return bookingService.getAllBookingsByRoomId(roomId);
    }
}
