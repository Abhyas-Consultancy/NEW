// 1.First
// import React, { useState } from 'react';
// import axios from 'axios';

// function TeacherDashboard() {
//   const [recordedClass, setRecordedClass] = useState({ title: '', video_file: null });
//   const [studyMaterial, setStudyMaterial] = useState({ title: '', file: null });
//   const [mockAssignment, setMockAssignment] = useState({ title: '', skill: 'speaking', description: '' });

//   const handleRecordedClassSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', recordedClass.title);
//     formData.append('video_file', recordedClass.video_file);

//     try {
//       await axios.post('http://localhost:8000/api/recorded-classes/', formData);
//       alert('Recorded class uploaded successfully!');
//     } catch (err) {
//       console.error(err);
//       alert('Error uploading recorded class.');
//     }
//   };

//   const handleStudyMaterialSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', studyMaterial.title);
//     formData.append('file', studyMaterial.file);

//     try {
//       await axios.post('http://localhost:8000/api/study-materials/', formData);
//       alert('Study material uploaded successfully!');
//     } catch (err) {
//       console.error(err);
//       alert('Error uploading study material.');
//     }
//   };

//   const handleMockAssignmentSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:8000/api/mock-assignments/', mockAssignment);
//       alert('Mock assignment created successfully!');
//     } catch (err) {
//       console.error(err);
//       alert('Error creating mock assignment.');
//     }
//   };

//   return (
//     <div className="container my-5">
//       {/* Upload Recorded Class */}
//       <h2>Upload Recorded Class</h2>
//       <form onSubmit={handleRecordedClassSubmit} className="mb-5">
//         <div className="mb-3">
//           <label className="form-label">Title</label>
//           <input
//             type="text"
//             className="form-control"
//             value={recordedClass.title}
//             onChange={e => setRecordedClass({ ...recordedClass, title: e.target.value })}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Video File</label>
//           <input
//             type="file"
//             className="form-control"
//             onChange={e => setRecordedClass({ ...recordedClass, video_file: e.target.files[0] })}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-danger">Upload</button>
//       </form>

//       {/* Upload Study Material */}
//       <h2>Upload Study Material</h2>
//       <form onSubmit={handleStudyMaterialSubmit} className="mb-5">
//         <div className="mb-3">
//           <label className="form-label">Title</label>
//           <input
//             type="text"
//             className="form-control"
//             value={studyMaterial.title}
//             onChange={e => setStudyMaterial({ ...studyMaterial, title: e.target.value })}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">File</label>
//           <input
//             type="file"
//             className="form-control"
//             onChange={e => setStudyMaterial({ ...studyMaterial, file: e.target.files[0] })}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-danger">Upload</button>
//       </form>

//       {/* Create Mock Assignment */}
//       <h2>Create Mock Assignment</h2>
//       <form onSubmit={handleMockAssignmentSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Title</label>
//           <input
//             type="text"
//             className="form-control"
//             value={mockAssignment.title}
//             onChange={e => setMockAssignment({ ...mockAssignment, title: e.target.value })}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Skill</label>
//           <select
//             className="form-control"
//             value={mockAssignment.skill}
//             onChange={e => setMockAssignment({ ...mockAssignment, skill: e.target.value })}
//           >
//             <option value="speaking">Speaking</option>
//             <option value="listening">Listening</option>
//             <option value="reading">Reading</option>
//             <option value="writing">Writing</option>
//           </select>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Description</label>
//           <textarea
//             className="form-control"
//             rows="3"
//             value={mockAssignment.description}
//             onChange={e => setMockAssignment({ ...mockAssignment, description: e.target.value })}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-danger">Create</button>
//       </form>
//     </div>
//   );
// }

// export default TeacherDashboard;
// 2.Second Working
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const TeacherDashboard = () => {
//   const [recordedClasses, setRecordedClasses] = useState([]);
//   const [studyMaterials, setStudyMaterials] = useState([]);
//   const [submissions, setSubmissions] = useState([]);
//   const [recordedClass, setRecordedClass] = useState({ title: '', description: '', video_file: null });
//   const [studyMaterial, setStudyMaterial] = useState({ title: '', description: '', file: null });
//   const [mockAssignment, setMockAssignment] = useState({ title: '', skill: 'speaking', description: '' });
//   const [uploadError, setUploadError] = useState('');
//   const navigate = useNavigate();

//   // Fetch data on component mount
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

//     // Fetch study materials
//     axios.get('http://127.0.0.1:8000/api/study-materials/', config)
//       .then(response => setStudyMaterials(response.data))
//       .catch(error => console.error('Error fetching study materials:', error));

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

//   const handleFileChange = (e, type) => {
//     const file = e.target.files[0];
//     console.log(`Selected ${type} file:`, file);
//     if (type === 'recordedClass') {
//       setRecordedClass({ ...recordedClass, video_file: file });
//     } else if (type === 'studyMaterial') {
//       setStudyMaterial({ ...studyMaterial, file: file });
//     }
//   };

//   const handleRecordedClassSubmit = async (e) => {
//     e.preventDefault();
//     setUploadError('');

//     if (!recordedClass.video_file) {
//       setUploadError('Please select a video file to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', recordedClass.title);
//     formData.append('description', recordedClass.description);
//     formData.append('video_file', recordedClass.video_file);

//     for (let [key, value] of formData.entries()) {
//       console.log(key, value);
//     }

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setUploadError('You are not authenticated. Please log in again.');
//         return;
//       }

//       const response = await axios.post('http://127.0.0.1:8000/api/recorded-classes/', formData, {
//         headers: {
//           Authorization: `Token ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setRecordedClasses([...recordedClasses, response.data]);
//       setRecordedClass({ title: '', description: '', video_file: null });
//       document.getElementById('recordedClassVideoFile').value = '';
//       alert('Recorded class uploaded successfully!');
//     } catch (error) {
//       setUploadError(error.response?.data?.video_file?.[0] || 'Error uploading recorded class.');
//       console.error('Upload failed:', error.response?.data);
//     }
//   };

//   const handleStudyMaterialSubmit = async (e) => {
//     e.preventDefault();
//     setUploadError('');

//     if (!studyMaterial.file) {
//       setUploadError('Please select a file to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', studyMaterial.title);
//     formData.append('description', studyMaterial.description);
//     formData.append('file', studyMaterial.file);

//     for (let [key, value] of formData.entries()) {
//       console.log(key, value);
//     }

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setUploadError('You are not authenticated. Please log in again.');
//         return;
//       }

//       const response = await axios.post('http://127.0.0.1:8000/api/study-materials/', formData, {
//         headers: {
//           Authorization: `Token ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setStudyMaterials([...studyMaterials, response.data]);
//       setStudyMaterial({ title: '', description: '', file: null });
//       document.getElementById('studyMaterialFile').value = '';
//       alert('Study material uploaded successfully!');
//     } catch (error) {
//       setUploadError(error.response?.data?.file?.[0] || 'Error uploading study material.');
//       console.error('Upload failed:', error.response?.data);
//     }
//   };

//   const handleMockAssignmentSubmit = async (e) => {
//     e.preventDefault();
//     setUploadError('');

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setUploadError('You are not authenticated. Please log in again.');
//         return;
//       }

//       const response = await axios.post('http://127.0.0.1:8000/api/mock-assignments/', mockAssignment, {
//         headers: {
//           Authorization: `Token ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       setMockAssignment({ title: '', skill: 'speaking', description: '' });
//       alert('Mock assignment created successfully!');
//     } catch (error) {
//       setUploadError(error.response?.data?.detail || 'Error creating mock assignment.');
//       console.error('Creation failed:', error.response?.data);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="text-center">Teacher Dashboard</h2>
//         <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
//       </div>

//       {/* Error/Success Message */}
//       {uploadError && (
//         <div className="alert alert-danger" role="alert">
//           {uploadError}
//         </div>
//       )}

//       {/* Upload Recorded Class */}
//       <div className="mt-4">
//         <h3>Upload Recorded Class</h3>
//         <form onSubmit={handleRecordedClassSubmit} className="mb-5">
//           <div className="mb-3">
//             <label htmlFor="recordedClassTitle" className="form-label">Title:</label>
//             <input
//               type="text"
//               id="recordedClassTitle"
//               className="form-control"
//               value={recordedClass.title}
//               onChange={e => setRecordedClass({ ...recordedClass, title: e.target.value })}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="recordedClassDescription" className="form-label">Description:</label>
//             <textarea
//               id="recordedClassDescription"
//               className="form-control"
//               value={recordedClass.description}
//               onChange={e => setRecordedClass({ ...recordedClass, description: e.target.value })}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="recordedClassVideoFile" className="form-label">Video File:</label>
//             <input
//               type="file"
//               id="recordedClassVideoFile"
//               className="form-control"
//               onChange={e => handleFileChange(e, 'recordedClass')}
//               required
//               accept="video/*"
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">Upload</button>
//         </form>
//       </div>

//       {/* Display Recorded Classes */}
//       <div className="mt-4">
//         <h3>My Recorded Classes</h3>
//         {recordedClasses.length === 0 ? (
//           <p>No recorded classes available.</p>
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

//       {/* Upload Study Material */}
//       <div className="mt-4">
//         <h3>Upload Study Material</h3>
//         <form onSubmit={handleStudyMaterialSubmit} className="mb-5">
//           <div className="mb-3">
//             <label htmlFor="studyMaterialTitle" className="form-label">Title:</label>
//             <input
//               type="text"
//               id="studyMaterialTitle"
//               className="form-control"
//               value={studyMaterial.title}
//               onChange={e => setStudyMaterial({ ...studyMaterial, title: e.target.value })}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="studyMaterialDescription" className="form-label">Description:</label>
//             <textarea
//               id="studyMaterialDescription"
//               className="form-control"
//               value={studyMaterial.description}
//               onChange={e => setStudyMaterial({ ...studyMaterial, description: e.target.value })}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="studyMaterialFile" className="form-label">File:</label>
//             <input
//               type="file"
//               id="studyMaterialFile"
//               className="form-control"
//               onChange={e => handleFileChange(e, 'studyMaterial')}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">Upload</button>
//         </form>
//       </div>

//       {/* Display Study Materials */}
//       <div className="mt-4">
//         <h3>My Study Materials</h3>
//         {studyMaterials.length === 0 ? (
//           <p>No study materials available.</p>
//         ) : (
//           <ul className="list-group">
//             {studyMaterials.map(item => (
//               <li key={item.id} className="list-group-item">
//                 {item.title} - Uploaded on {new Date(item.uploaded_at).toLocaleDateString()}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Create Mock Assignment */}
//       <div className="mt-4">
//         <h3>Create Mock Assignment</h3>
//         <form onSubmit={handleMockAssignmentSubmit} className="mb-5">
//           <div className="mb-3">
//             <label htmlFor="mockAssignmentTitle" className="form-label">Title:</label>
//             <input
//               type="text"
//               id="mockAssignmentTitle"
//               className="form-control"
//               value={mockAssignment.title}
//               onChange={e => setMockAssignment({ ...mockAssignment, title: e.target.value })}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="mockAssignmentSkill" className="form-label">Skill:</label>
//             <select
//               id="mockAssignmentSkill"
//               className="form-control"
//               value={mockAssignment.skill}
//               onChange={e => setMockAssignment({ ...mockAssignment, skill: e.target.value })}
//             >
//               <option value="speaking">Speaking</option>
//               <option value="listening">Listening</option>
//               <option value="reading">Reading</option>
//               <option value="writing">Writing</option>
//             </select>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="mockAssignmentDescription" className="form-label">Description:</label>
//             <textarea
//               id="mockAssignmentDescription"
//               className="form-control"
//               rows="3"
//               value={mockAssignment.description}
//               onChange={e => setMockAssignment({ ...mockAssignment, description: e.target.value })}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">Create</button>
//         </form>
//       </div>

//       {/* Display Submissions */}
//       <div className="mt-4">
//         <h3>Student Submissions</h3>
//         {submissions.length === 0 ? (
//           <p>No submissions available.</p>
//         ) : (
//           <ul className="list-group">
//             {submissions.map(item => (
//               <li key={item.id} className="list-group-item">
//                 Assignment: {item.assignment.title} - Submitted by Student {item.student} on {new Date(item.submitted_at).toLocaleDateString()}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;

// 3.Third

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const [recordedClasses, setRecordedClasses] = useState([]);
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [mockAssignments, setMockAssignments] = useState([]);
  const [recordedClass, setRecordedClass] = useState({ title: '', description: '', video_file: null, course: '' });
  const [studyMaterial, setStudyMaterial] = useState({ title: '', description: '', file: null, course: '' });
  const [mockAssignment, setMockAssignment] = useState({ title: '', skill: 'speaking', description: '', course: '' });
  const [courseBundle, setCourseBundle] = useState({ title: '', description: '', recorded_classes: [], study_materials: [], mock_assignments: [] });
  const [uploadError, setUploadError] = useState('');
  const navigate = useNavigate();

  // Fetch data on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const config = {
      headers: { Authorization: `Token ${token}` },
    };

    // Fetch courses
    axios.get('http://127.0.0.1:8000/api/courses/', config)
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));

    // Fetch recorded classes
    axios.get('http://127.0.0.1:8000/api/recorded-classes/', config)
      .then(response => setRecordedClasses(response.data))
      .catch(error => console.error('Error fetching recorded classes:', error));

    // Fetch study materials
    axios.get('http://127.0.0.1:8000/api/study-materials/', config)
      .then(response => setStudyMaterials(response.data))
      .catch(error => console.error('Error fetching study materials:', error));

    // Fetch mock assignments
    axios.get('http://127.0.0.1:8000/api/mock-assignments/', config)
      .then(response => setMockAssignments(response.data))
      .catch(error => console.error('Error fetching mock assignments:', error));

    // Fetch submissions
    axios.get('http://127.0.0.1:8000/api/submissions/', config)
      .then(response => setSubmissions(response.data))
      .catch(error => console.error('Error fetching submissions:', error));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    console.log(`Selected ${type} file:`, file);
    if (type === 'recordedClass') {
      setRecordedClass({ ...recordedClass, video_file: file });
    } else if (type === 'studyMaterial') {
      setStudyMaterial({ ...studyMaterial, file: file });
    }
  };

  const handleCourseBundleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'checkbox') {
      const updatedList = courseBundle[name].includes(value)
        ? courseBundle[name].filter(id => id !== value)
        : [...courseBundle[name], value];
      setCourseBundle({ ...courseBundle, [name]: updatedList });
    } else {
      setCourseBundle({ ...courseBundle, [name]: value });
    }
  };

  const handleRecordedClassSubmit = async (e) => {
    e.preventDefault();
    setUploadError('');

    if (!recordedClass.video_file) {
      setUploadError('Please select a video file to upload.');
      return;
    }

    if (!recordedClass.course) {
      setUploadError('Please select a course.');
      return;
    }

    const formData = new FormData();
    formData.append('title', recordedClass.title);
    formData.append('description', recordedClass.description);
    formData.append('video_file', recordedClass.video_file);
    formData.append('course', recordedClass.course);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUploadError('You are not authenticated. Please log in again.');
        return;
      }

      const response = await axios.post('http://127.0.0.1:8000/api/recorded-classes/', formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setRecordedClasses([...recordedClasses, response.data]);
      setRecordedClass({ title: '', description: '', video_file: null, course: '' });
      document.getElementById('recordedClassVideoFile').value = '';
      alert('Recorded class uploaded successfully!');
    } catch (error) {
      setUploadError(error.response?.data?.video_file?.[0] || 'Error uploading recorded class.');
      console.error('Upload failed:', error.response?.data);
    }
  };

  const handleStudyMaterialSubmit = async (e) => {
    e.preventDefault();
    setUploadError('');

    if (!studyMaterial.file) {
      setUploadError('Please select a file to upload.');
      return;
    }

    if (!studyMaterial.course) {
      setUploadError('Please select a course.');
      return;
    }

    const formData = new FormData();
    formData.append('title', studyMaterial.title);
    formData.append('description', studyMaterial.description);
    formData.append('file', studyMaterial.file);
    formData.append('course', studyMaterial.course);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUploadError('You are not authenticated. Please log in again.');
        return;
      }

      const response = await axios.post('http://127.0.0.1:8000/api/study-materials/', formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setStudyMaterials([...studyMaterials, response.data]);
      setStudyMaterial({ title: '', description: '', file: null, course: '' });
      document.getElementById('studyMaterialFile').value = '';
      alert('Study material uploaded successfully!');
    } catch (error) {
      setUploadError(error.response?.data?.file?.[0] || 'Error uploading study material.');
      console.error('Upload failed:', error.response?.data);
    }
  };

  const handleMockAssignmentSubmit = async (e) => {
    e.preventDefault();
    setUploadError('');

    if (!mockAssignment.course) {
      setUploadError('Please select a course.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUploadError('You are not authenticated. Please log in again.');
        return;
      }

      const response = await axios.post('http://127.0.0.1:8000/api/mock-assignments/', {
        title: mockAssignment.title,
        skill: mockAssignment.skill,
        description: mockAssignment.description,
        course: mockAssignment.course,
      }, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setMockAssignments([...mockAssignments, response.data]);
      setMockAssignment({ title: '', skill: 'speaking', description: '', course: '' });
      alert('Mock assignment created successfully!');
    } catch (error) {
      setUploadError(error.response?.data?.detail || 'Error creating mock assignment.');
      console.error('Creation failed:', error.response?.data);
    }
  };

  const handleCourseBundleSubmit = async (e) => {
    e.preventDefault();
    setUploadError('');

    if (!courseBundle.title) {
      setUploadError('Please provide a title for the course bundle.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUploadError('You are not authenticated. Please log in again.');
        return;
      }

      const response = await axios.post('http://127.0.0.1:8000/api/create-course-bundle/', courseBundle, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setCourses([...courses, response.data]);
      setCourseBundle({ title: '', description: '', recorded_classes: [], study_materials: [], mock_assignments: [] });
      alert('Course bundle created successfully!');
    } catch (error) {
      setUploadError(error.response?.data?.error || 'Error creating course bundle.');
      console.error('Creation failed:', error.response?.data);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center">Teacher Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      {/* Error/Success Message */}
      {uploadError && (
        <div className="alert alert-danger" role="alert">
          {uploadError}
        </div>
      )}

      {/* Upload Recorded Class */}
      <div className="mt-4">
        <h3>Upload Recorded Class</h3>
        <form onSubmit={handleRecordedClassSubmit} className="mb-5">
          <div className="mb-3">
            <label htmlFor="recordedClassTitle" className="form-label">Title:</label>
            <input
              type="text"
              id="recordedClassTitle"
              className="form-control"
              value={recordedClass.title}
              onChange={e => setRecordedClass({ ...recordedClass, title: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="recordedClassDescription" className="form-label">Description:</label>
            <textarea
              id="recordedClassDescription"
              className="form-control"
              value={recordedClass.description}
              onChange={e => setRecordedClass({ ...recordedClass, description: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="recordedClassCourse" className="form-label">Course:</label>
            <select
              id="recordedClassCourse"
              className="form-control"
              value={recordedClass.course}
              onChange={e => setRecordedClass({ ...recordedClass, course: e.target.value })}
              required
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="recordedClassVideoFile" className="form-label">Video File:</label>
            <input
              type="file"
              id="recordedClassVideoFile"
              className="form-control"
              onChange={e => handleFileChange(e, 'recordedClass')}
              required
              accept="video/*"
            />
          </div>
          <button type="submit" className="btn btn-primary">Upload</button>
        </form>
      </div>

      {/* Display Recorded Classes */}
      <div className="mt-4">
        <h3>My Recorded Classes</h3>
        {recordedClasses.length === 0 ? (
          <p>No recorded classes available.</p>
        ) : (
          <ul className="list-group">
            {recordedClasses.map(item => (
              <li key={item.id} className="list-group-item">
                {item.title} (Course: {item.course ? courses.find(c => c.id === item.course)?.title : 'None'}) - Uploaded on {new Date(item.uploaded_at).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Upload Study Material */}
      <div className="mt-4">
        <h3>Upload Study Material</h3>
        <form onSubmit={handleStudyMaterialSubmit} className="mb-5">
          <div className="mb-3">
            <label htmlFor="studyMaterialTitle" className="form-label">Title:</label>
            <input
              type="text"
              id="studyMaterialTitle"
              className="form-control"
              value={studyMaterial.title}
              onChange={e => setStudyMaterial({ ...studyMaterial, title: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="studyMaterialDescription" className="form-label">Description:</label>
            <textarea
              id="studyMaterialDescription"
              className="form-control"
              value={studyMaterial.description}
              onChange={e => setStudyMaterial({ ...studyMaterial, description: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="studyMaterialCourse" className="form-label">Course:</label>
            <select
              id="studyMaterialCourse"
              className="form-control"
              value={studyMaterial.course}
              onChange={e => setStudyMaterial({ ...studyMaterial, course: e.target.value })}
              required
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="studyMaterialFile" className="form-label">File:</label>
            <input
              type="file"
              id="studyMaterialFile"
              className="form-control"
              onChange={e => handleFileChange(e, 'studyMaterial')}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Upload</button>
        </form>
      </div>

      {/* Display Study Materials */}
      <div className="mt-4">
        <h3>My Study Materials</h3>
        {studyMaterials.length === 0 ? (
          <p>No study materials available.</p>
        ) : (
          <ul className="list-group">
            {studyMaterials.map(item => (
              <li key={item.id} className="list-group-item">
                {item.title} (Course: {item.course ? courses.find(c => c.id === item.course)?.title : 'None'}) - Uploaded on {new Date(item.uploaded_at).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Create Mock Assignment */}
      <div className="mt-4">
        <h3>Create Mock Assignment</h3>
        <form onSubmit={handleMockAssignmentSubmit} className="mb-5">
          <div className="mb-3">
            <label htmlFor="mockAssignmentTitle" className="form-label">Title:</label>
            <input
              type="text"
              id="mockAssignmentTitle"
              className="form-control"
              value={mockAssignment.title}
              onChange={e => setMockAssignment({ ...mockAssignment, title: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mockAssignmentSkill" className="form-label">Skill:</label>
            <select
              id="mockAssignmentSkill"
              className="form-control"
              value={mockAssignment.skill}
              onChange={e => setMockAssignment({ ...mockAssignment, skill: e.target.value })}
            >
              <option value="speaking">Speaking</option>
              <option value="listening">Listening</option>
              <option value="reading">Reading</option>
              <option value="writing">Writing</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="mockAssignmentCourse" className="form-label">Course:</label>
            <select
              id="mockAssignmentCourse"
              className="form-control"
              value={mockAssignment.course}
              onChange={e => setMockAssignment({ ...mockAssignment, course: e.target.value })}
              required
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="mockAssignmentDescription" className="form-label">Description:</label>
            <textarea
              id="mockAssignmentDescription"
              className="form-control"
              rows="3"
              value={mockAssignment.description}
              onChange={e => setMockAssignment({ ...mockAssignment, description: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>

      {/* Create Course Bundle */}
      <div className="mt-4">
        <h3>Create Course Bundle</h3>
        <form onSubmit={handleCourseBundleSubmit} className="mb-5">
          <div className="mb-3">
            <label htmlFor="courseBundleTitle" className="form-label">Title:</label>
            <input
              type="text"
              id="courseBundleTitle"
              name="title"
              className="form-control"
              value={courseBundle.title}
              onChange={e => handleCourseBundleChange(e)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="courseBundleDescription" className="form-label">Description:</label>
            <textarea
              id="courseBundleDescription"
              name="description"
              className="form-control"
              value={courseBundle.description}
              onChange={e => handleCourseBundleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Select Recorded Classes:</label>
            {recordedClasses.map(item => (
              <div key={item.id} className="form-check">
                <input
                  type="checkbox"
                  id={`recordedClass-${item.id}`}
                  name="recorded_classes"
                  value={item.id}
                  className="form-check-input"
                  checked={courseBundle.recorded_classes.includes(item.id.toString())}
                  onChange={e => handleCourseBundleChange(e, 'checkbox')}
                />
                <label htmlFor={`recordedClass-${item.id}`} className="form-check-label">
                  {item.title}
                </label>
              </div>
            ))}
          </div>
          <div className="mb-3">
            <label className="form-label">Select Study Materials:</label>
            {studyMaterials.map(item => (
              <div key={item.id} className="form-check">
                <input
                  type="checkbox"
                  id={`studyMaterial-${item.id}`}
                  name="study_materials"
                  value={item.id}
                  className="form-check-input"
                  checked={courseBundle.study_materials.includes(item.id.toString())}
                  onChange={e => handleCourseBundleChange(e, 'checkbox')}
                />
                <label htmlFor={`studyMaterial-${item.id}`} className="form-check-label">
                  {item.title}
                </label>
              </div>
            ))}
          </div>
          <div className="mb-3">
            <label className="form-label">Select Mock Assignments:</label>
            {mockAssignments.map(item => (
              <div key={item.id} className="form-check">
                <input
                  type="checkbox"
                  id={`mockAssignment-${item.id}`}
                  name="mock_assignments"
                  value={item.id}
                  className="form-check-input"
                  checked={courseBundle.mock_assignments.includes(item.id.toString())}
                  onChange={e => handleCourseBundleChange(e, 'checkbox')}
                />
                <label htmlFor={`mockAssignment-${item.id}`} className="form-check-label">
                  {item.title}
                </label>
              </div>
            ))}
          </div>
          <button type="submit" className="btn btn-primary">Create Course Bundle</button>
        </form>
      </div>

      {/* Display Submissions */}
      <div className="mt-4">
        <h3>Student Submissions</h3>
        {submissions.length === 0 ? (
          <p>No submissions available.</p>
        ) : (
          <ul className="list-group">
            {submissions.map(item => (
              <li key={item.id} className="list-group-item">
                Assignment: {item.mock_assignment.title} - Submitted by Student {item.student} on {new Date(item.submitted_at).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;