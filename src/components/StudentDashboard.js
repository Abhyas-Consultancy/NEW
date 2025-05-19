// 1.First
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function StudentDashboard() {
//   const [mockAssignments, setMockAssignments] = useState([]);
//   const [submission, setSubmission] = useState({ mock_assignment: '', submission_text: '', evaluate_by_teacher: false });

//   useEffect(() => {
//     // Fetch mock assignments
//     axios.get('http://localhost:8000/api/mock-assignments/')
//       .then(res => setMockAssignments(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('mock_assignment', submission.mock_assignment);
//     formData.append('submission_text', submission.submission_text);

//     try {
//       // Submit the assignment
//       const res = await axios.post('http://localhost:8000/api/submissions/', formData);
//       const submissionId = res.data.id;

//       // Evaluate the submission
//       const evalRes = await axios.post('http://localhost:8000/api/evaluate-submission/', {
//         submission_id: submissionId,
//         evaluate_by_teacher: submission.evaluate_by_teacher,
//       });
//       alert(`AI Score: ${evalRes.data.ai_score}\nFeedback: ${evalRes.data.ai_feedback}`);
//     } catch (err) {
//       console.error(err);
//       alert('Error submitting assignment.');
//     }
//   };

//   return (
//     <div className="container my-5">
//       <h2>Mock Assignments</h2>
//       <div className="row">
//         {mockAssignments.map(assignment => (
//           <div className="col-md-4 mb-4" key={assignment.id}>
//             <div className="card">
//               <div className="card-body">
//                 <h5>{assignment.title}</h5>
//                 <p>{assignment.skill.charAt(0).toUpperCase() + assignment.skill.slice(1)}</p>
//                 <form onSubmit={handleSubmit}>
//                   <input
//                     type="hidden"
//                     value={assignment.id}
//                     onChange={e => setSubmission({ ...submission, mock_assignment: e.target.value })}
//                   />
//                   <textarea
//                     className="form-control mb-3"
//                     rows="3"
//                     placeholder="Enter your response..."
//                     onChange={e => setSubmission({ ...submission, submission_text: e.target.value })}
//                   />
//                   <div className="form-check mb-3">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       onChange={e => setSubmission({ ...submission, evaluate_by_teacher: e.target.checked })}
//                     />
//                     <label className="form-check-label">Request Teacher Evaluation</label>
//                   </div>
//                   <button type="submit" className="btn btn-danger">Submit</button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default StudentDashboard;

// 2.Second Working but not able to view video

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const StudentDashboard = () => {
//   const [recordedClasses, setRecordedClasses] = useState([]);
//   const [mockAssignments, setMockAssignments] = useState([]);
//   const [submissions, setSubmissions] = useState([]);
//   const [submissionData, setSubmissionData] = useState({ mock_assignment: '', submission_text: '', submission_file: null });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     const config = {
//       headers: { Authorization: `Token ${token}` },
//     };

//     // Fetch recorded classes
//     axios.get('http://127.0.0.1:8000/api/recorded-classes/', config)
//       .then(response => setRecordedClasses(response.data))
//       .catch(error => console.error('Error fetching recorded classes:', error));

//     // Fetch mock assignments
//     axios.get('http://127.0.0.1:8000/api/student-mock-assignments/', config)
//       .then(response => setMockAssignments(response.data))
//       .catch(error => console.error('Error fetching mock assignments:', error));

//     // Fetch submissions
//     axios.get('http://127.0.0.1:8000/api/submissions/', config)
//       .then(response => setSubmissions(response.data))
//       .catch(error => console.error('Error fetching submissions:', error));
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     navigate('/login');
//   };

//   const handleSubmissionChange = e => {
//     if (e.target.name === 'submission_file') {
//       setSubmissionData({ ...submissionData, submission_file: e.target.files[0] });
//     } else {
//       setSubmissionData({ ...submissionData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmitSubmission = async e => {
//     e.preventDefault();
//     setError('');

//     const formData = new FormData();
//     formData.append('mock_assignment', submissionData.mock_assignment);
//     formData.append('submission_text', submissionData.submission_text);
//     if (submissionData.submission_file) {
//       formData.append('submission_file', submissionData.submission_file);
//     }

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('You are not authenticated. Please log in again.');
//         return;
//       }

//       const response = await axios.post('http://127.0.0.1:8000/api/submissions/', formData, {
//         headers: {
//           Authorization: `Token ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setSubmissions([...submissions, response.data]);
//       setSubmissionData({ mock_assignment: '', submission_text: '', submission_file: null });
//       document.getElementById('submissionFile').value = '';
//       alert('Submission uploaded successfully!');
//     } catch (error) {
//       setError(error.response?.data?.detail || 'Error uploading submission.');
//       console.error('Submission failed:', error.response?.data);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="text-center">Student Dashboard</h2>
//         <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
//       </div>

//       {error && (
//         <div className="alert alert-danger" role="alert">
//           {error}
//         </div>
//       )}

//       {/* Recorded Classes */}
//       <div className="mt-4">
//         <h3>Recorded Classes</h3>
//         {recordedClasses.length === 0 ? (
//           <p>No recorded classes available for your courses.</p>
//         ) : (
//           <ul className="list-group">
//             {recordedClasses.map(item => (
//               <li key={item.id} className="list-group-item">
//                 {item.title} - Uploaded on {new Date(item.uploaded_at).toLocaleDateString()}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Mock Assignments */}
//       <div className="mt-4">
//         <h3>Mock Assignments</h3>
//         {mockAssignments.length === 0 ? (
//           <p>No mock assignments available for your courses.</p>
//         ) : (
//           <ul className="list-group">
//             {mockAssignments.map(item => (
//               <li key={item.id} className="list-group-item">
//                 {item.title} (Skill: {item.skill}) - Created on {new Date(item.created_at).toLocaleDateString()}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Submit Mock Assignment */}
//       <div className="mt-4">
//         <h3>Submit Mock Assignment</h3>
//         <form onSubmit={handleSubmitSubmission} className="mb-5">
//           <div className="mb-3">
//             <label htmlFor="mockAssignment" className="form-label">Assignment:</label>
//             <select
//               id="mockAssignment"
//               name="mock_assignment"
//               className="form-control"
//               value={submissionData.mock_assignment}
//               onChange={handleSubmissionChange}
//               required
//             >
//               <option value="">Select an assignment</option>
//               {mockAssignments.map(assignment => (
//                 <option key={assignment.id} value={assignment.id}>{assignment.title}</option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="submissionText" className="form-label">Submission Text:</label>
//             <textarea
//               id="submissionText"
//               name="submission_text"
//               className="form-control"
//               rows="3"
//               value={submissionData.submission_text}
//               onChange={handleSubmissionChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="submissionFile" className="form-label">Submission File (optional):</label>
//             <input
//               type="file"
//               id="submissionFile"
//               name="submission_file"
//               className="form-control"
//               onChange={handleSubmissionChange}
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">Submit</button>
//         </form>
//       </div>

//       {/* Submissions */}
//       <div className="mt-4">
//         <h3>My Submissions</h3>
//         {submissions.length === 0 ? (
//           <p>No submissions available.</p>
//         ) : (
//           <ul className="list-group">
//             {submissions.map(item => (
//               <li key={item.id} className="list-group-item">
//                 Assignment: {item.mock_assignment.title} - Submitted on {new Date(item.submitted_at).toLocaleDateString()}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

// 3.Third

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [recordedClasses, setRecordedClasses] = useState([]);
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [mockAssignments, setMockAssignments] = useState([]);
  const [submission, setSubmission] = useState({ mock_assignment: '', submission_text: '', submission_file: null });
  const [courses, setCourses] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [fileInputKey, setFileInputKey] = useState(Date.now());
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

    axios.get('http://127.0.0.1:8000/api/recorded-classes/', config)
      .then(response => setRecordedClasses(response.data))
      .catch(error => console.error('Error fetching recorded classes:', error));

    axios.get('http://127.0.0.1:8000/api/study-materials/', config)
      .then(response => setStudyMaterials(response.data))
      .catch(error => console.error('Error fetching study materials:', error));

    axios.get('http://127.0.0.1:8000/api/mock-assignments/', config)
      .then(response => setMockAssignments(response.data))
      .catch(error => console.error('Error fetching mock assignments:', error));

    axios.get('http://127.0.0.1:8000/api/student-courses/', config)
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected submission file:', file.name, file.size, file.type);
      setSubmission(prev => ({ ...prev, submission_file: file }));
    } else {
      console.log('No file selected for submission');
      setSubmission(prev => ({ ...prev, submission_file: null }));
    }
  };

  const handleSubmissionSubmit = async (e) => {
    e.preventDefault();
    setUploadError('');

    if (!submission.mock_assignment) {
      setUploadError('Please select a mock assignment.');
      return;
    }

    const formData = new FormData();
    formData.append('mock_assignment', submission.mock_assignment);
    formData.append('submission_text', submission.submission_text);
    if (submission.submission_file) {
      formData.append('submission_file', submission.submission_file);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUploadError('You are not authenticated. Please log in again.');
        return;
      }

      await axios.post('http://127.0.0.1:8000/api/submissions/', formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSubmission({ mock_assignment: '', submission_text: '', submission_file: null });
      setFileInputKey(Date.now());
      alert('Submission successful!');
    } catch (error) {
      setUploadError(error.response?.data?.detail || 'Error submitting assignment.');
      console.error('Submission failed:', error.response?.data);
    }
  };

  return (
    <div className="student-dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">IELTSPro</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="#courses">Courses</Link></li>
          <li><Link to="#materials">Materials</Link></li>
          <li><Link to="#assignments">Assignments</Link></li>
          <li><button className="nav-button" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-left">
          <h1>Welcome to Your Dashboard</h1>
          <p>Access your courses, watch recorded classes, download study materials, and submit assignments.</p>
        </div>
        <div className="hero-right">
          <h2>IELTS Training</h2>
          <p>Speaking, Listening, Reading, Writing</p>
        </div>
      </header>

      {/* My Courses Section */}
      <section id="courses" className="section">
        <h2>My Courses</h2>
        {courses.length === 0 ? (
          <p>No courses enrolled.</p>
        ) : (
          <div className="course-grid">
            {courses.map(course => (
              <div key={course.id} className="course">
                {course.course.title} - Enrolled on {new Date(course.enrolled_at).toLocaleDateString()}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recorded Classes Section */}
      <section id="materials" className="section red-section">
        <h2>Recorded Classes</h2>
        {recordedClasses.length === 0 ? (
          <p>No recorded classes available.</p>
        ) : (
          <div className="content-grid">
            {recordedClasses.map(item => (
              <div key={item.id} className="content-card">
                <h3>{item.title}</h3>
                <p>Uploaded on {new Date(item.uploaded_at).toLocaleDateString()}</p>
                <video controls className="video-player">
                  <source src={item.video_file} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Study Materials Section */}
      <section className="section">
        <h2>Study Materials</h2>
        {studyMaterials.length === 0 ? (
          <p>No study materials available.</p>
        ) : (
          <div className="content-grid">
            {studyMaterials.map(item => (
              <div key={item.id} className="content-card">
                <h3>{item.title}</h3>
                <p>Uploaded on {new Date(item.uploaded_at).toLocaleDateString()}</p>
                <a href={item.file} target="_blank" rel="noopener noreferrer" className="view-btn">
                  View/Download Material
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Mock Assignments Section */}
      <section id="assignments" className="section red-section">
        <h2>Mock Assignments</h2>
        {mockAssignments.length === 0 ? (
          <p>No mock assignments available.</p>
        ) : (
          <ul className="content-list">
            {mockAssignments.map(item => (
              <li key={item.id} className="content-item">
                {item.title} ({item.skill}) - Created on {new Date(item.created_at).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Submit Assignment Section */}
      <section className="section">
        <h2>Submit Assignment</h2>
        {uploadError && (
          <div className="alert-error">
            {uploadError}
          </div>
        )}
        <form onSubmit={handleSubmissionSubmit} className="submission-form">
          <div className="form-group">
            <label htmlFor="mockAssignment" className="form-label">Mock Assignment:</label>
            <select
              id="mockAssignment"
              className="form-control"
              value={submission.mock_assignment}
              onChange={e => setSubmission({ ...submission, mock_assignment: e.target.value })}
              required
            >
              <option value="">Select an assignment</option>
              {mockAssignments.map(item => (
                <option key={item.id} value={item.id}>{item.title}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="submissionText" className="form-label">Submission Text:</label>
            <textarea
              id="submissionText"
              className="form-control"
              value={submission.submission_text}
              onChange={e => setSubmission({ ...submission, submission_text: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="submissionFile" className="form-label">Submission File (Optional):</label>
            <input
              type="file"
              id="submissionFile"
              key={`submission-${fileInputKey}`}
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div>
          <p>&copy; IELTSPro.com 2025</p>
          <div className="footer-links">
            <a href="#courses">Courses</a>
            <a href="#materials">Materials</a>
            <a href="#assignments">Assignments</a>
            <a href="mailto:info@ieltspro.com">info@ieltspro.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboard;