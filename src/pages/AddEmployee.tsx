import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import EmployeeForm from '../components/EmployeeForm';
import type { Employee } from '../types/Employee';
import { STORAGE_KEYS } from '../data/constants';

const AddEmployee: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const handleSubmit = async (employeeData: Omit<Employee, 'id'>) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Generate unique ID
      const newId = `EMP${String(Date.now()).slice(-6)}`;
      const newEmployee: Employee = {
        id: newId,
        ...employeeData,
      };

      // Get existing employees from localStorage
      const existingEmployees = JSON.parse(localStorage.getItem(STORAGE_KEYS.EMPLOYEES) || '[]') as Employee[];
      const updatedEmployees = [...existingEmployees, newEmployee];
      
      // Save to localStorage
      localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(updatedEmployees));

      // Show success message
      alert(`Employee ${employeeData.fullName} added successfully!`);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to add employee. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
          <h1 className="text-3xl font-bold text-slate-800">Add New Employee</h1>
          <p className="text-slate-500 mt-2">Fill in the form below to add a new employee to the system.</p>
        </div>

        {/* Form */}
        <EmployeeForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitButtonText="Add Employee"
        />
      </main>
    </div>
  );
};

export default AddEmployee;
