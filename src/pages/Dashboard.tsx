import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusIcon, SearchIcon,
  PrinterIcon, UserCheck, UserMinus 
} from 'lucide-react';
import Header from '../components/Header';
import EmployeeTable from '../components/EmployeeTable';
import StatCard from '../components/StatCard';
import SelectInput from '../components/SelectInput';
import { printEmployeesList } from '../utils/printUtils';
import type { Employee } from '../types/Employee';
import { mockEmployees, STORAGE_KEYS } from '../data';

const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(true);

  // Requirement: Prevent dashboard access without login [cite: 7]
  const navigate = useNavigate();
  
  useEffect(() => {
    const auth = localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED);
    if (!auth) navigate('/');
    
    // Load employees from localStorage or use mock data
    const savedEmployees = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
    if (savedEmployees) {
      const parsed = JSON.parse(savedEmployees);
      setEmployees(parsed);
      setFilteredEmployees(parsed);
    } else {
      // Initialize with mock data if no saved employees
      localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(mockEmployees));
      setEmployees(mockEmployees);
      setFilteredEmployees(mockEmployees);
    }
    setLoading(false);
  }, [navigate]);

  // Filter employees based on search and filters
  useEffect(() => {
    let filtered = employees;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(emp =>
        emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Gender filter
    if (filterGender !== 'All') {
      filtered = filtered.filter(emp => emp.gender === filterGender);
    }

    // Status filter
    if (filterStatus !== 'All') {
      const isActive = filterStatus === 'Active';
      filtered = filtered.filter(emp => emp.isActive === isActive);
    }

    setFilteredEmployees(filtered);
  }, [employees, searchTerm, filterGender, filterStatus]);

  // Handler functions
  const handleEdit = (id: string) => {
    navigate(`/edit-employee/${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm(`Are you sure you want to delete this employee?`)) {
      const updatedEmployees = employees.filter(emp => emp.id !== id);
      setEmployees(updatedEmployees);
      localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(updatedEmployees));
    }
  };

  const handleToggleStatus = (id: string, status: boolean) => {
    const updatedEmployees = employees.map(emp =>
      emp.id === id ? { ...emp, isActive: status } : emp
    );
    setEmployees(updatedEmployees);
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(updatedEmployees));
  };

  const handlePrint = (employee: Employee) => {
    printEmployeesList([employee]);
  };

  const handlePrintList = () => {
    printEmployeesList(filteredEmployees, {
      gender: filterGender !== 'All' ? filterGender : undefined,
      status: filterStatus !== 'All' ? filterStatus : undefined,
    });
  };

  // Calculate stats
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.isActive).length;
  const inactiveEmployees = employees.filter(emp => !emp.isActive).length;

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1 pt-28 p-6 lg:p-10">
        
        {/* 1. Dashboard Summary  */}
        <header className="mb-8 mt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Employee Overview</h1>
            <p className="text-slate-500">Manage and monitor your workforce efficiently.</p>
          </div>
          <button 
            onClick={() => navigate('/add-employee')}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg font-medium"
          >
            <PlusIcon size={18} /> Add Employee
          </button>
        </header>

        {/* Stats Grid [cite: 11] */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Employees" count={totalEmployees} icon={<UserCheck className="text-blue-600" />} color="bg-blue-50" />
          <StatCard title="Active" count={activeEmployees} icon={<UserCheck className="text-emerald-600" />} color="bg-emerald-50" />
          <StatCard title="Inactive" count={inactiveEmployees} icon={<UserMinus className="text-rose-600" />} color="bg-rose-50" />
        </div>

        {/* 2. Search & Combined Filters [cite: 42, 47] */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[300px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          
          <div className="flex gap-3 flex-wrap">
            <SelectInput
              value={filterGender}
              onChange={setFilterGender}
              placeholder="All Genders"
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Other', label: 'Other' },
              ]}
            />
            <SelectInput
              value={filterStatus}
              onChange={setFilterStatus}
              placeholder="All Status"
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
              ]}
            />
            <button 
              onClick={handlePrintList}
              className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium"
            >
              <PrinterIcon size={18} /> Print List
            </button>
          </div>
        </div>

        {/* 3. Employee List Table [cite: 12, 13] */}
        <EmployeeTable
          employees={filteredEmployees}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          onPrint={handlePrint}
          loading={loading}
        />
      </main>
    </div>
  );
};

export default Dashboard;