import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import SelectInput from './SelectInput';
import type { FormErrors, EmployeeFormProps } from '../types';
import { INDIAN_STATES, MIN_AGE, MAX_IMAGE_SIZE } from '../data/constants';

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
  submitButtonText = 'Add Employee',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || '',
    gender: initialData?.gender || 'Male',
    dateOfBirth: initialData?.dateOfBirth || '',
    state: initialData?.state || '',
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
    profileImage: initialData?.profileImage || '',
  });

  const [previewImage, setPreviewImage] = useState<string>(initialData?.profileImage || '');
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full Name must be at least 3 characters';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < MIN_AGE) {
        newErrors.dateOfBirth = `Employee must be at least ${MIN_AGE} years old`;
      }
      if (dob > today) {
        newErrors.dateOfBirth = 'Date of Birth cannot be in the future';
      }
    }

    if (!formData.state) {
      newErrors.state = 'State is required';
    }

    if (!formData.profileImage) {
      newErrors.profileImage = 'Profile Image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > MAX_IMAGE_SIZE) {
        setErrors(prev => ({ ...prev, profileImage: 'Image size must be less than 5MB' }));
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, profileImage: 'Please select a valid image file' }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
        setFormData(prev => ({ ...prev, profileImage: result }));
        setErrors(prev => ({ ...prev, profileImage: undefined }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStateChange = (value: string) => {
    setFormData(prev => ({ ...prev, state: value }));
    if (errors.state) {
      setErrors(prev => ({ ...prev, state: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSubmit({
      fullName: formData.fullName.trim(),
      gender: formData.gender as 'Male' | 'Female' | 'Other',
      dateOfBirth: formData.dateOfBirth,
      state: formData.state,
      isActive: formData.isActive,
      profileImage: formData.profileImage,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 lg:p-12">
        {/* Profile Image Section */}
        <div className="mb-10">
          <label className="block text-lg font-bold text-white mb-6">Profile Image</label>
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Image Preview */}
            <div className="flex-shrink-0">
              <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-dashed border-white/30 flex items-center justify-center overflow-hidden shadow-lg">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <Upload size={48} className="text-white/40 mx-auto mb-3" />
                    <p className="text-sm text-slate-400">No image</p>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Area */}
            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-6 py-4 border-2 border-dashed border-white/30 rounded-2xl hover:border-blue-500 hover:bg-blue-500/10 transition-all text-white font-bold text-lg backdrop-blur-md cursor-pointer"
              >
                <Upload size={24} className="mx-auto mb-3" />
                Click to upload or drag and drop
              </button>
              <p className="text-sm text-slate-400 mt-3">PNG, JPG, GIF up to 5MB</p>
              {errors.profileImage && (
                <p className="text-sm text-rose-400 mt-3 font-semibold">{errors.profileImage}</p>
              )}
            </div>
          </div>
        </div>

        {/* Full Name */}
        <div className="mb-8">
          <label htmlFor="fullName" className="block text-lg font-bold text-white mb-3">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter full name"
            className={`w-full px-5 py-3.5 rounded-xl border-2 ${
              errors.fullName ? 'border-rose-500' : 'border-white/20'
            } bg-white/5 backdrop-blur-md text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium`}
          />
          {errors.fullName && (
            <p className="text-sm text-rose-400 mt-2 font-semibold">{errors.fullName}</p>
          )}
        </div>

        {/* Gender and DOB - Two columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-lg font-bold text-white mb-3">
              Gender <span className="text-rose-400">*</span>
            </label>
            <select
              id="gender"
              value={formData.gender}
              onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as any }))}
              className="w-full px-5 py-3.5 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium cursor-pointer hover:border-white/40"
            >
              <option value="Male" className="bg-slate-900">Male</option>
              <option value="Female" className="bg-slate-900">Female</option>
              <option value="Other" className="bg-slate-900">Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-lg font-bold text-white mb-3">
              Date of Birth <span className="text-rose-400">*</span>
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className={`w-full px-5 py-3.5 rounded-xl border-2 ${
                errors.dateOfBirth ? 'border-rose-500' : 'border-white/20'
              } bg-white/5 backdrop-blur-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium cursor-pointer`}
            />
            {errors.dateOfBirth && (
              <p className="text-sm text-rose-400 mt-2 font-semibold">{errors.dateOfBirth}</p>
            )}
          </div>
        </div>

        {/* State */}
        <div className="mb-8">
          <label className="block text-lg font-bold text-white mb-3">
            State <span className="text-rose-400">*</span>
          </label>
          <SelectInput
            value={formData.state}
            onChange={handleStateChange}
            placeholder="Select State"
            options={INDIAN_STATES.map(state => ({ value: state, label: state }))}
          />
          {errors.state && (
            <p className="text-sm text-rose-400 mt-2 font-semibold">{errors.state}</p>
          )}
        </div>

        {/* Status Toggle */}
        <div className="mb-10">
          <label className="block text-lg font-bold text-white mb-4">Status</label>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
              className={`relative inline-flex h-10 w-16 items-center rounded-full transition-all cursor-pointer ${
                formData.isActive ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform shadow-md ${
                  formData.isActive ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`font-bold text-lg ${formData.isActive ? 'text-emerald-400' : 'text-slate-400'}`}>
              {formData.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:from-blue-400 disabled:via-purple-400 disabled:to-pink-400 text-white rounded-xl transition-all font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:scale-100 cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
