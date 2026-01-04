import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import EmployeeForm from '../components/EmployeeForm';
import MessageModal from '../components/MessageModal';
import type { Employee } from '../types/Employee';
import { STORAGE_KEYS } from '../data/constants';

const AddEmployee: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: 'success' as 'success' | 'error',
    title: '',
    message: '',
  });

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
      setModalConfig({
        type: 'success',
        title: 'Employee Added Successfully',
        message: `${employeeData.fullName} has been added to the system.`,
      });
      setShowModal(true);
    } catch (error) {
      setModalConfig({
        type: 'error',
        title: 'Failed to Add Employee',
        message: 'An error occurred while adding the employee. Please try again.',
      });
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    // If success modal, navigate to dashboard immediately
    if (modalConfig.type === 'success') {
      navigate('/dashboard');
    } else {
      // For error modal, just close it
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <Header onLogout={handleLogout} />

      <main className="flex-1 mt-12 pt-28 p-6 lg:p-10">
        {/* Page Header with Back Button */}
        <div className="mb-10 flex items-start gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 font-bold transition-all border border-blue-500/30 hover:border-blue-500/60 flex-shrink-0 mt-1 cursor-pointer"
            title="Back to Dashboard"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Add New Employee</h1>
            <p className="text-slate-300 mt-3 text-lg font-medium">Create a new team member profile with complete details and authentication.</p>
          </div>
        </div>

        {/* Form */}
        <EmployeeForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitButtonText="Add Employee"
        />
      </main>

      {/* Message Modal */}
      <MessageModal
        isOpen={showModal}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={handleModalClose}
        autoClose={modalConfig.type === 'success' ? 3000 : 3000}
      />
    </div>
  );
};

export default AddEmployee;
