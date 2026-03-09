import React, { useState, useEffect } from "react";
import "./App.css";
import StudentTable from "./components/StudentTable";
import studentsData from "./data/students.json";
import * as XLSX from "xlsx";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);

  // Simulated Loading
  useEffect(() => {
    setTimeout(() => {
      setStudents(studentsData);
      setLoading(false);
    }, 1000);
  }, []);

  // Add / Update Student
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !age) {
      alert("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      alert("Enter a valid email");
      return;
    }

    if (editId) {
      const updatedStudents = students.map((student) =>
        student.id === editId
          ? { ...student, name, email, age }
          : student
      );

      setStudents(updatedStudents);
      setEditId(null);
    } else {
      const newStudent = {
        id: Date.now(),
        name,
        email,
        age,
      };

      setStudents([...students, newStudent]);
    }

    setName("");
    setEmail("");
    setAge("");
  };

  // Delete Student
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const updatedStudents = students.filter(
        (student) => student.id !== id
      );
      setStudents(updatedStudents);
    }
  };

  // Edit Student
  const handleEdit = (student) => {
    setName(student.name);
    setEmail(student.email);
    setAge(student.age);
    setEditId(student.id);
  };

  // Excel Download
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
  };

  if (loading) {
    return <h2>Loading Students...</h2>;
  }

  return (
    <div className="App">
      <h1>Students Table</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button type="submit">
          {editId ? "Update Student" : "Add Student"}
        </button>
      </form>

      <br />

      <button onClick={downloadExcel}>Download Excel</button>

      <StudentTable
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;