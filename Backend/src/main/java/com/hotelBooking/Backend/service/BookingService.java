package com.hotelBooking.Backend.service;

import com.hotelBooking.Backend.exception.InvalidBookingRequestException;
import com.hotelBooking.Backend.model.BookedRoom;
import com.hotelBooking.Backend.model.Room;
import com.hotelBooking.Backend.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService implements IBookingService {
    private final BookingRepository bookingRepository;
    private final IRoomService roomService;

    @Override
    public List<BookedRoom> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingRepository.findByRoomId(roomId);
    }

    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {
        if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw new InvalidBookingRequestException("Check-in date must come before check-out date");
        }
        Room room = roomService.getRoomById(roomId).get();
        List<BookedRoom> existingBookings = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest, existingBookings);
        if(roomIsAvailable){
            room.addBooking(bookingRequest);
            bookingRepository.save(bookingRequest);
        }else {
            throw new InvalidBookingRequestException("Sorry, This room is not available for the selected dates");
        }
        return bookingRequest.getBookingConfirmationCode();
    }

    @Override
    public BookedRoom findByBookingConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode);
    }

    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBooings){
        return existingBooings.stream()
                .noneMatch(existingBookings ->
                        bookingRequest.getCheckInDate().equals(existingBookings.getCheckInDate())
                            || bookingRequest.getCheckOutDate().isBefore(existingBookings.getCheckOutDate())
                            || (bookingRequest.getCheckInDate().isAfter(existingBookings.getCheckInDate())
                            && bookingRequest.getCheckInDate().isBefore(existingBookings.getCheckOutDate()))
                            || (bookingRequest.getCheckInDate().isBefore(existingBookings.getCheckInDate())

                            && bookingRequest.getCheckOutDate().equals(existingBookings.getCheckOutDate()))
                            || (bookingRequest.getCheckInDate().isBefore(existingBookings.getCheckInDate())

                            && bookingRequest.getCheckOutDate().isAfter(existingBookings.getCheckOutDate()))

                            || (bookingRequest.getCheckInDate().equals(existingBookings.getCheckOutDate())
                            && bookingRequest.getCheckOutDate().equals(existingBookings.getCheckInDate()))

                            || (bookingRequest.getCheckInDate().equals(existingBookings.getCheckOutDate())
                            && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                );
    }
}
