package com.hotelBooking.Backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Blob;
import java.util.*;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked = false;

    @Lob  //Large object
    private Blob photo;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BookedRoom> bookings;

    public Room() {
        this.bookings = new ArrayList<>();
    }

    public void addBooking(BookedRoom booking) {
        if(bookings == null) {
            bookings = new ArrayList<>();
        }
        bookings.add(booking);
        booking.setRoom(this);
        isBooked = true;
        String bookingCode = String.valueOf((long)(Math.random() * 1_000_000_0000L));
        booking.setBookingConfirmationCode(bookingCode);
    }
}
