// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('student');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://http:/localhost:3000/api/register/', {
//         username,
//         email,
//         password,
//         role,
//       });
//       console.log('Registration successful:', response.data);
//       navigate('/login');
//     } catch (error) {
//       console.error('Registration failed:', error.response.data);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Role:</label>
//           <select value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="student">Student</option>
//             <option value="teacher">Teacher</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;


// // src/components/Register.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import './Form.css'; // Create this CSS file for custom styles
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'student' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:8000/api/register/', formData);
//       localStorage.setItem('token', res.data.token);
//       navigate('/dashboard');
//     } catch (err) {
//       setError('Registration failed. Try again.');
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Register</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input name="username" placeholder="Username" onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <select name="role" onChange={handleChange}>
//           <option value="student">Student</option>
//           <option value="teacher">Teacher</option>
//         </select>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;


// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/register/', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      const role = res.data.user.role;

      if (role === 'student') navigate('/student-dashboard');
      else if (role === 'teacher') navigate('/teacher-dashboard');
      else navigate('/admin-dashboard');
    } catch {
      setError('Registration failed. Please check your details.');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <select name="role" required onChange={handleChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Register;
