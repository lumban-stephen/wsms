import React, { useState, useEffect } from 'react';
import WorkingScholarTable from '../../components/workingscholar-table';
import { WorkingScholar, Department } from '../../utils/interfaces';

const WorkingScholarPage: React.FC = () => {
  const [workingScholars, setWorkingScholars] = useState<WorkingScholar[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedScholar, setSelectedScholar] = useState<WorkingScholar | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseScholars = await fetch('/api/ws/working-scholars/unassigned');
        const responseDepartments = await fetch('/api/departments');
        const scholarData = await responseScholars.json();
        const departmentData = await responseDepartments.json();
        setWorkingScholars(scholarData);
        setDepartments(departmentData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors appropriately (e.g., display error message)
      }
    };

    fetchData();
  }, []);

  const handleAssignDepartment = (scholarId: number, departmentId: number) => {
    const scholarToAssign = workingScholars.find((scholar) => scholar.id === scholarId);
    if (scholarToAssign) {
        setSelectedScholar(scholarToAssign); // Set selected scholar for confirmation
        }
    };

  const handleConfirmAssignment = async () => {
    if (selectedScholar) {
      const { id: scholarId, dept_fk: currentDeptFk } = selectedScholar; // Destructure scholar data

      if (currentDeptFk !== null) {
        console.warn('Scholar already assigned to a department');
        return; // Handle already assigned case (optional)
      }

      const confirm = window.confirm('Are you sure you want to assign this scholar?');
      if (confirm) {
        try {
          // Replace with your actual API call to update dept_fk
          const response = await fetch(`/api/ws/working-scholars/${scholarId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dept_fk: currentDeptFk }), // Update dept_fk
          });

          if (response.ok) {
            const updatedScholars = [...workingScholars];
            const updatedScholarIndex = updatedScholars.findIndex((s) => s.id === scholarId);
            updatedScholars[updatedScholarIndex].dept_fk = currentDeptFk;
            setWorkingScholars(updatedScholars);
            setSelectedScholar(null); // Clear selected scholar
          } else {
            console.error('Error updating scholar department:', await response.text());
            // Handle update error (e.g., display error message)
          }
        } catch (error) {
          console.error('Error assigning department:', error);
          // Handle other errors (e.g., network issues)
        }
      }
    }
  };

  const handleCancelAssignment = () => {
    setSelectedScholar(null); // Clear selected scholar
  };

  return (
    <div>
      <h1>Working Scholars</h1>
      <WorkingScholarTable
        workingScholars={workingScholars}
        departments={departments}
        onAssignDepartment={handleAssignDepartment}
        selectedScholar={selectedScholar}
        onConfirmAssignment={handleConfirmAssignment}
        onCancelAssignment={handleCancelAssignment}
      />
      {selectedScholar && ( // Conditionally render confirmation modal
        <div>
          <p>Confirm assignment of {selectedScholar.name} to {departments.find((d) => d.id === selectedScholar.dept_fk)?.name || 'No department'}</p>
          <button onClick={handleConfirmAssignment}>Confirm</button>
          <button onClick={handleCancelAssignment}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default WorkingScholarPage;
