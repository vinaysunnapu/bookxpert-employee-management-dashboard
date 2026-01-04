import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import EmployeeForm from '../components/EmployeeForm';
import MessageModal from '../components/MessageModal';
import type { Employee } from '../types/Employee';
import { STORAGE_KEYS } from '../data/constants';

const EditEmployee: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: 'success' as 'success' | 'error',
    title: '',
    message: '',
  });

  useEffect(() => {
    // Fetch employee data
    const employees = JSON.parse(localStorage.getItem(STORAGE_KEYS.EMPLOYEES) || '[]') as Employee[];
    const foundEmployee = employees.find(emp => emp.id === id);
    
    if (foundEmployee) {
      setEmployee(foundEmployee);
    } else {
      setModalConfig({
        type: 'error',
        title: 'Employee Not Found',
        message: 'The employee you are trying to edit could not be found.',
      });
      setShowModal(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3100);
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
      setModalConfig({
        type: 'success',
        title: 'Employee Updated Successfully',
        message: `${employeeData.fullName}'s information has been updated.`,
      });
      setShowModal(true);

      // Redirect to dashboard after modal closes
      setTimeout(() => {
        navigate('/dashboard');
      }, 3100);
    } catch (error) {
      setModalConfig({
        type: 'error',
        title: 'Failed to Update Employee',
        message: 'An error occurred while updating the employee. Please try again.',
      });
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingEmployee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
        <Header onLogout={handleLogout} />
        <main className="flex-1 pt-28 p-6 lg:p-10 flex items-center justify-center">
          <p className="text-slate-300 text-xl font-semibold">Loading employee data...</p>
        </main>
      </div>
    );
  }

  if (!employee) {
    return null;
  }

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
            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Edit Employee</h1>
            <p className="text-slate-300 mt-3 text-lg font-medium">Update employee information and keep records current.</p>
          </div>
        </div>

        {/* Form */}
        <EmployeeForm
          initialData={employee}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitButtonText="Update Employee"
        />
      </main>

      {/* Message Modal */}
      <MessageModal
        isOpen={showModal}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={() => setShowModal(false)}
        autoClose={3000}
      />
    </div>
  );
};

export default EditEmployee;
