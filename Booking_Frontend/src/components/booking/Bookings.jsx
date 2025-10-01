import React, { useState, useEffect } from "react"
import { cancelBooking, getAllBookings } from "../utils/ApiFunctions"
import Header from "../common/Header"
import BookingsTable from "./BookingsTable"
import { Navigate } from "react-router-dom"

const Bookings = () => {
  const [bookingInfo, setBookingInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) {
      setError("You must be logged in to view bookings.")
      setIsLoading(false)
      return
    }

    setTimeout(() => {
      getAllBookings()
        .then((data) => {
          setBookingInfo(data)
          setIsLoading(false)
        })
        .catch((error) => {
          setError(error.message)
          setIsLoading(false)
        })
    }, 1000)
  }, [token])

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingId)
      const data = await getAllBookings()
      setBookingInfo(data)
    } catch (error) {
      setError(error.message)
    }
  }

  // Redirect to login if no token
  if (!token) {
    return <Navigate to="/login" replace />
  }

  return (
    <section style={{ backgroundColor: "whitesmoke" }}>
      <Header title={"Existing Bookings"} />
      {error && <div className="text-danger">{error}</div>}
      {isLoading ? (
        <div>Loading existing bookings</div>
      ) : (
        <BookingsTable
          bookingInfo={bookingInfo}
          handleBookingCancellation={handleBookingCancellation}
        />
      )}
    </section>
  )
}

export default Bookings
