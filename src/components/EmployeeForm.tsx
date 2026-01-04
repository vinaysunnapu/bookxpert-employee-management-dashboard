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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:p-8">
        {/* Profile Image Section */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-4">Profile Image</label>
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Image Preview */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <Upload size={32} className="text-slate-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">No image</p>
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
                className="w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-slate-600 font-medium"
              >
                <Upload size={20} className="mx-auto mb-2" />
                Click to upload or drag and drop
              </button>
              <p className="text-xs text-slate-500 mt-2">PNG, JPG, GIF up to 5MB</p>
              {errors.profileImage && (
                <p className="text-sm text-rose-600 mt-2">{errors.profileImage}</p>
              )}
            </div>
          </div>
        </div>

        {/* Full Name */}
        <div className="mb-6">
          <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
            Full Name <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter full name"
            className={`w-full px-4 py-2.5 rounded-xl border ${
              errors.fullName ? 'border-rose-500' : 'border-slate-200'
            } focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
          />
          {errors.fullName && (
            <p className="text-sm text-rose-600 mt-2">{errors.fullName}</p>
          )}
        </div>

        {/* Gender and DOB - Two columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-semibold text-slate-700 mb-2">
              Gender <span className="text-rose-600">*</span>
            </label>
            <select
              id="gender"
              value={formData.gender}
              onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as any }))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-slate-700 mb-2">
              Date of Birth <span className="text-rose-600">*</span>
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 rounded-xl border ${
                errors.dateOfBirth ? 'border-rose-500' : 'border-slate-200'
              } focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
            />
            {errors.dateOfBirth && (
              <p className="text-sm text-rose-600 mt-2">{errors.dateOfBirth}</p>
            )}
          </div>
        </div>

        {/* State */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            State <span className="text-rose-600">*</span>
          </label>
          <SelectInput
            value={formData.state}
            onChange={handleStateChange}
            placeholder="Select State"
            options={INDIAN_STATES.map(state => ({ value: state, label: state }))}
          />
          {errors.state && (
            <p className="text-sm text-rose-600 mt-2">{errors.state}</p>
          )}
        </div>

        {/* Status Toggle */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-3">Status</label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                formData.isActive ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  formData.isActive ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`font-medium ${formData.isActive ? 'text-emerald-600' : 'text-slate-600'}`}>
              {formData.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl transition-all font-semibold shadow-md hover:shadow-lg"
        >
          {isLoading ? 'Processing...' : submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
