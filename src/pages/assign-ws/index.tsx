import React, { useState, useEffect } from 'react';
import WorkingScholarTable from '../../components/workingscholar-table';
import { WorkingScholar, Department } from '../../utils/interfaces';
// Import necessary components for fetching data (e.g., axios)

const WorkingScholarPage: React.FC = () => {
  const [workingScholars, setWorkingScholars] = useState<WorkingScholar[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual fetch logic (using axios or similar)
        const responseScholars = await fetch('/api/working-scholars');
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
    // Handle department assignment logic (likely involves another fetch request)
  };

  return (
    <div>
      <h1>Working Scholars</h1>
      <WorkingScholarTable
        workingScholars={workingScholars}
        departments={departments}
        onAssignDepartment={handleAssignDepartment}
      />
    </div>
  );
};

export default WorkingScholarPage;