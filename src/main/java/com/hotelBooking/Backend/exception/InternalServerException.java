package com.hotelBooking.Backend.exception;

public class InternalServerException extends RuntimeException {
	public InternalServerException(String message) {
		super(message);
	}
}
