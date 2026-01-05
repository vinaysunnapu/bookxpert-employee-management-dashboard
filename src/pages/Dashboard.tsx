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
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Requirement: Prevent dashboard access without login
  const navigate = useNavigate();
  
  useEffect(() => {
    const auth = localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED);
    if (!auth) navigate('/login');
    
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
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(updatedEmployees));
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

  // Pagination calculations
  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterGender, filterStatus]);

  // Adjust current page if it exceeds total pages (e.g., when deleting records on last page)
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <Header onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1 pt-28 p-6 lg:p-10">
        
        {/* 1. Dashboard Summary  */}
        <header className="mb-10 mt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Employee Overview</h1>
            <p className="text-slate-300 mt-2 text-lg font-medium">Manage and monitor your workforce with precision.</p>
          </div>
          <button 
            onClick={() => navigate('/add-employee')}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-2xl font-bold text-base transform hover:scale-105 cursor-pointer"
          >
            <PlusIcon size={20} /> Add Employee
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Employees" count={totalEmployees} icon={<UserCheck className="text-blue-400" />} color="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30" />
          <StatCard title="Active" count={activeEmployees} icon={<UserCheck className="text-emerald-400" />} color="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 border border-emerald-500/30" />
          <StatCard title="Inactive" count={inactiveEmployees} icon={<UserMinus className="text-rose-400" />} color="bg-gradient-to-br from-rose-900/40 to-rose-800/20 border border-rose-500/30" />
        </div>

        {/* 2. Search & Combined Filters */}
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10 mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[300px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all backdrop-blur-md"
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
              className="flex items-center gap-2 px-4 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition-all font-medium text-white backdrop-blur-md hover:shadow-lg cursor-pointer"
            >
              <PrinterIcon size={18} /> Print List
            </button>
          </div>
        </div>

        {/* 3. Employee List Table */}
        <EmployeeTable
          employees={paginatedEmployees}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          onPrint={handlePrint}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default Dashboard;