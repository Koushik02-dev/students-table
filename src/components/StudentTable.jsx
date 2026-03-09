import React from "react";

function StudentTable({ students, onEdit, onDelete }) {
  return (
    <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.length === 0 ? (
          <tr>
            <td colSpan="4">No Students Found</td>
          </tr>
        ) : (
          students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>

              <td>
                <button onClick={() => onEdit(student)}>Edit</button>
                <button onClick={() => onDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default StudentTable;