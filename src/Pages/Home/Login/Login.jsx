import { Link, useNavigate } from 'react-router-dom';
import img from '../../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

const Login = () => {

    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();


    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            navigate('/');
        })
        .catch(error => console.log(error))
    }
  return (
    <div className="hero min-h-screen bg-base-200 mb-8">
      <div className="hero-content flex-col lg:flex-row justify-between">
        <div className=" w-1/2 mr-12">
          
          <img src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <h1 className="text-3xl font-bold text-center mt-4">Login now!</h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name='email'
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name='password'
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
          </form>
          <p className='my-5 text-center'>New to Car Doctors? <Link className='text-orange-600 font-bold' to='/signup'>Sign Up</Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
