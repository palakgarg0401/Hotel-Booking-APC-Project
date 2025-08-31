package com.hotelBooking.Backend.repository;

import com.hotelBooking.Backend.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
