package com.hotelBooking.Backend.model;

// provide JPA Annotations that are used to map the class to database table
import jakarta.persistence.*;
// provide Annotations which reduce boilerplate code
import lombok.*;
// Java class to represent time
import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookedRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generates primary key value in database
    private Long bookingId;

    @Column(name = "check_In")
    private LocalDate checkInDate;

    @Column(name = "check_Out")
    private LocalDate checkOutDate;

    @Column(name = "guest_FullName")
    private String guestFullName;

    @Column(name = "guest_Email")
    private String guestEmail;

    @Column(name = "adults")
    private int NumOfAdults;

    @Column(name = "children")
    private int NumOfChildren;

    @Column(name = "total_guest")
    private int totalNumOfGuest;

    @Column(name = "confirmation_Code")
    private String bookingConfirmationCode;

    // one booking are exactly linked to only one room
    // many bookings are linked with one room (diff dates, diff guests)
    @ManyToOne(fetch = FetchType.LAZY) // Room details are fetched from DB only when you actually use them
    @JoinColumn(name = "room_id") // Foreign key column in BookedRoom table pointing to Room
    private Room room;

    public void calculateTotalNumberOfGuest() {
        this.totalNumOfGuest = this.NumOfAdults + this.NumOfChildren;
    }

    public void setNumOfAdults(int numOfAdults) {
        NumOfAdults = numOfAdults;
        calculateTotalNumberOfGuest();
    }

    public void setNumOfChildren(int numOfChildren) {
        NumOfChildren = numOfChildren;
        calculateTotalNumberOfGuest();
    }

    public void setBookingConfirmationCode(String bookingConfirmationCode) {
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}
