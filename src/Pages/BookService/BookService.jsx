import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";


const BookService = () => {

    const service = useLoaderData();
  const { title, _id, price, img } = service;
  const {user} = useContext(AuthContext);

  const handleBookService = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = user?.email;

    const order = {
        customerName: name,
        email,
        name,
        date,
        img,
        service: title,
        service_id: _id,
        price: price,
    }
    console.log(order);

    fetch('http://localhost:5000/bookings', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.insertedId) {
            alert('Inserted Successfully');
            form.reset();
            
        }
    })



  }

    return (
        <div>
        <h2 className="text-center text-3xl">Book Service: {title}</h2>
      
              <form onSubmit={handleBookService} className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="input input-bordered"
                    
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    placeholder=""
                    className="input input-bordered"
                    required
                  />
                  
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="input input-bordered"
                    defaultValue={user?.email}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Due Amount</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Due Amount"
                    name="due"
                    defaultValue={'$'+ price}
                    className="input input-bordered"
                    required
                  />
                  
                </div>
                </div>
                <div className="form-control mt-6">
                  <input className="btn btn-primary btn-block" type="submit" value="Confirm Oreder" />
                </div>
              </form>
            </div>
    );
};

export default BookService;