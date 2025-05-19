// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;
// 1.First
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
// import Home from './components/Home';
// import StudentDashboard from './components/StudentDashboard';
// import TeacherDashboard from './components/TeacherDashboard';
// import AdminDashboard from './components/AdminDashboard';

// function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route path="/student-dashboard" component={StudentDashboard} />
//         <Route path="/teacher-dashboard" component={TeacherDashboard} />
//         <Route path="/admin-dashboard" component={AdminDashboard} />
//       </Switch>
//     </Router>
//   );
// }

// export default App;

// 2.Second

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/login';
// import Home from './components/ome';
// import StudentDashboard from './components/StudentDashboard';
// import TeacherDashboard from './components/TeacherDashboard';
// import AdminDashboard from './components/AdminDashboard';

// function App() {
//   const token = localStorage.getItem('token');
//   const role = localStorage.getItem('role');

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/home" element={<Home />} />
//           <Route
//             path="/student-dashboard"
//             element={
//               token && role === 'student' ? <StudentDashboard /> : <Navigate to="/login" replace />
//             }
//           />
//           <Route
//             path="/teacher-dashboard"
//             element={
//               token && role === 'teacher' ? <TeacherDashboard /> : <Navigate to="/login" replace />
//             }
//           />
//           <Route
//             path="/admin-dashboard"
//             element={
//               token && role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" replace />
//             }
//           />
//           <Route path="/" element={<Navigate to="/home" replace />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// 3.Third Working
// src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './components/home';
// import Register from './components/Register';
// import Login from './components/login';
// import StudentDashboard from './components/StudentDashboard';
// import TeacherDashboard from './components/TeacherDashboard';
// import AdminDashboard from './components/AdminDashboard';

// function App() {
//   const token = localStorage.getItem('token');
//   const role = localStorage.getItem('role');

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />

//           <Route
//             path="/student-dashboard"
//             element={
//               token && role === 'student' ? <StudentDashboard /> : <Navigate to="/login" replace />
//             }
//           />
//           <Route
//             path="/teacher-dashboard"
//             element={
//               token && role === 'teacher' ? <TeacherDashboard /> : <Navigate to="/login" replace />
//             }
//           />
//           <Route
//             path="/admin-dashboard"
//             element={
//               token && role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" replace />
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


// 4.Fourth

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import Register from './components/Register';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;