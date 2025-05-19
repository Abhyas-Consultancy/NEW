// 1.First
// import React from 'react';

// function AdminDashboard() {
//   return (
//     <div className="container my-5">
//       <h2>Admin Dashboard</h2>
//       <p>Manage users, recorded classes, study materials, and mock assignments here.</p>
//       {/* Add functionality to manage users, content, etc. */}
//     </div>
//   );
// }

// export default AdminDashboard;

// 2.Second

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assignmentData, setAssignmentData] = useState({ student_id: '', course_id: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const config = {
      headers: { Authorization: `Token ${token}` },
    };

    // Fetch students
    axios.get('http://127.0.0.1:8000/api/users/', config)
      .then(response => setStudents(response.data.filter(user => user.role === 'student')))
      .catch(error => console.error('Error fetching students:', error));

    // Fetch courses
    axios.get('http://127.0.0.1:8000/api/courses/', config)
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleAssignmentChange = e => {
    setAssignmentData({ ...assignmentData, [e.target.name]: e.target.value });
  };

  const handleAssignCourse = async e => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You are not authenticated. Please log in again.');
        return;
      }

      await axios.post('http://127.0.0.1:8000/api/assign-course/', {
        student_id: assignmentData.student_id,
        course_id: assignmentData.course_id,
      }, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      alert('Course assigned to student successfully!');
      setAssignmentData({ student_id: '', course_id: '' });
    } catch (error) {
      setError(error.response?.data?.error || 'Error assigning course to student.');
      console.error('Assignment failed:', error.response?.data);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center">Admin Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="mt-4">
        <h3>Assign Course to Student</h3>
        <form onSubmit={handleAssignCourse} className="mb-5">
          <div className="mb-3">
            <label htmlFor="studentId" className="form-label">Student:</label>
            <select
              id="studentId"
              name="student_id"
              className="form-control"
              value={assignmentData.student_id}
              onChange={handleAssignmentChange}
              required
            >
              <option value="">Select a student</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>{student.username}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="courseId" className="form-label">Course:</label>
            <select
              id="courseId"
              name="course_id"
              className="form-control"
              value={assignmentData.course_id}
              onChange={handleAssignmentChange}
              required
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Assign Course</button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;