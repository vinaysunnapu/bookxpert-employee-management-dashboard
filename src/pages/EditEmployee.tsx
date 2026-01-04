import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import EmployeeForm from '../components/EmployeeForm';
import type { Employee } from '../types/Employee';
import { STORAGE_KEYS } from '../data/constants';

const EditEmployee: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(true);

  useEffect(() => {
    // Fetch employee data
    const employees = JSON.parse(localStorage.getItem(STORAGE_KEYS.EMPLOYEES) || '[]') as Employee[];
    const foundEmployee = employees.find(emp => emp.id === id);
    
    if (foundEmployee) {
      setEmployee(foundEmployee);
    } else {
      alert('Employee not found');
      navigate('/dashboard');
    }
    setIsLoadingEmployee(false);
  }, [id, navigate]);

  const handleLogout = () => {
    navigate('/');
  };

  const handleSubmit = async (employeeData: Omit<Employee, 'id'>) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Get existing employees
      const employees = JSON.parse(localStorage.getItem(STORAGE_KEYS.EMPLOYEES) || '[]') as Employee[];
      
      // Update employee
      const updatedEmployees = employees.map(emp =>
        emp.id === id ? { id: emp.id, ...employeeData } : emp
      ) as Employee[];

      // Save to localStorage
      localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(updatedEmployees));

      // Show success message
      alert(`Employee ${employeeData.fullName} updated successfully!`);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to update employee. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingEmployee) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header onLogout={handleLogout} />
        <main className="flex-1 pt-28 p-6 lg:p-10 flex items-center justify-center">
          <p className="text-slate-500">Loading employee data...</p>
        </main>
      </div>
    );
  }

  if (!employee) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onLogout={handleLogout} />

      <main className="flex-1 pt-28 p-6 lg:p-10">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Edit Employee</h1>
          <p className="text-slate-500 mt-2">Update the employee information below.</p>
        </div>

        {/* Form */}
        <EmployeeForm
          initialData={employee}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitButtonText="Update Employee"
        />
      </main>
    </div>
  );
};

export default EditEmployee;
