import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import BookingRow from "./BookingRow";
import axios from "axios";

const Bookings = () => {
  const { user } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);

  const url = `http://localhost:5000/bookings?email=${user?.email}`;

  useEffect(() => {
    axios.get(url, {withCredentials: true})
    .then(res => {
      setBookings(res.data);
    })
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => setBookings(data));

  }, [url]);

  const handleDelete = id => {
    const proceed = confirm('Are you sure you want to delete this booking?');
    if(proceed) {
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.deletedCount > 0) {
                alert('Deleted booking');
                const remaining = bookings.filter(booking => booking._id !=id);
                setBookings(remaining);
            }
        })
    }
  }

  const handleBookingConfirm = (id) => {
    fetch(`http://localhost:5000/bookings/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({status: 'confirm'})
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.modifiedCount > 0) {
            const remaining = bookings.filter(booking => booking._id !== id)
            const updated = bookings.find(booking=> booking._id===id);
            const newBookings = [updated, ...remaining];
            setBookings(newBookings);
        }
    })
  }


  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>IMAGE</th>
            <th>SERVICE</th>
            <th>DATE</th>
            <th>PRICE</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => <BookingRow key={booking._id} booking={booking} handleDelete={handleDelete} handleBookingConfirm={handleBookingConfirm}></BookingRow>)}
        </tbody>
        
      </table>
    </div>
  );
};

export default Bookings;
