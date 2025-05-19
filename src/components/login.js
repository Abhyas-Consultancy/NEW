// 1.First code

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(''); // Ensure setError is defined
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); // Clear any previous error
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/login/', {
//         username,
//         password,
//       });
//       console.log('Login response:', response.data); // Debug the response
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('role', response.data.user.role);
//       console.log('Stored role:', localStorage.getItem('role')); // Debug the stored role
//       const role = response.data.user.role.toLowerCase(); // Normalize the role
//       if (role === 'student') {
//         console.log('Navigating to StudentDashboard');
//         navigate('/student-dashboard');
//       } else if (role === 'teacher') {
//         console.log('Navigating to TeacherDashboard');
//         navigate('/teacher-dashboard');
//       } else if (role === 'admin') {
//         console.log('Navigating to AdminDashboard');
//         navigate('/admin-dashboard');
//       } else {
//         console.log('Unknown role:', role);
//         setError('Unknown user role. Please contact support.'); // Set error for unknown role
//       }
//     } catch (error) {
//       setError(error.response?.data?.error || 'An error occurred during login.'); // Set error on failure
//       console.error('Login failed:', error.response?.data);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Login</h2>
//       {error && (
//         <div className="alert alert-danger" role="alert">
//           {error}
//         </div>
//       )}
//       <form onSubmit={handleSubmit} className="mt-4">
//         <div className="mb-3">
//           <label htmlFor="username" className="form-label">Username:</label>
//           <input
//             type="text"
//             id="username"
//             className="form-control"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password:</label>
//           <input
//             type="password"
//             id="password"
//             className="form-control"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary w-100">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


// // src/components/login.js
// 2.Second

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Form.css';

// const Login = () => {
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:8000/api/login/', formData);
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('role', res.data.user.role);
//       const role = res.data.user.role;

//       if (role === 'student') navigate('/student-dashboard');
//       else if (role === 'teacher') navigate('/teacher-dashboard');
//       else navigate('/admin-dashboard');
//     } catch {
//       setError('Invalid credentials. Try again.');
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Login</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
//         <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// 3.Third
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      console.log('Attempting login with:', formData); // Debug input
      const res = await axios.post('http://localhost:8000/api/login/', formData);
      console.log('Login response:', res.data); // Debug response
      if (!res.data.token || !res.data.user || !res.data.user.role) {
        console.log('Missing token or role in response:', res.data);
        setError('Invalid response from server. Please try again.');
        return;
      }
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      console.log('Stored token:', localStorage.getItem('token')); // Debug storage
      console.log('Stored role:', localStorage.getItem('role')); // Debug storage
      const role = res.data.user.role.toLowerCase(); // Normalize role
      console.log('Normalized role:', role); // Debug role
      if (role === 'student') {
        console.log('Navigating to StudentDashboard');
        navigate('/student-dashboard');
      } else if (role === 'teacher') {
        console.log('Navigating to TeacherDashboard');
        navigate('/teacher-dashboard');
      } else if (role === 'admin') {
        console.log('Navigating to AdminDashboard');
        navigate('/admin-dashboard');
      } else {
        console.log('Unknown role:', role);
        setError('Unknown user role. Please contact support.');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data); // Debug error
      setError(error.response?.data?.error || 'An error occurred during login.');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;