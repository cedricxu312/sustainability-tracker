import React, { useState, useEffect } from 'react';
import './ActionForm.css';

/**
 * ActionForm Component
 * Handles both creating new actions and editing existing ones
 */
const ActionForm = ({ 
  onSubmit, 
  onCancel, 
  initialData = null, 
  isEditing = false,
  isLoading = false 
}) => {
  // Form state
  const [formData, setFormData] = useState({
    action: '',
    date: '',
    points: ''
  });

  // Form validation state
  const [errors, setErrors] = useState({});

  // Initialize form with data when editing
  useEffect(() => {
    if (initialData && isEditing) {
      setFormData({
        action: initialData.action || '',
        date: initialData.date || '',
        points: initialData.points?.toString() || ''
      });
    }
  }, [initialData, isEditing]);

  /**
   * Handle input changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Validate form data
   */
  const validateForm = () => {
    const newErrors = {};

    // Validate action
    if (!formData.action.trim()) {
      newErrors.action = 'Action description is required';
    } else if (formData.action.trim().length < 3) {
      newErrors.action = 'Action description must be at least 3 characters';
    }

    // Validate date
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      if (selectedDate > today) {
        newErrors.date = 'Date cannot be in the future';
      }
    }

    // Validate points
    if (!formData.points) {
      newErrors.points = 'Points are required';
    } else {
      const pointsNum = parseInt(formData.points);
      if (isNaN(pointsNum) || pointsNum < 0) {
        newErrors.points = 'Points must be a positive number';
      } else if (pointsNum > 1000) {
        newErrors.points = 'Points cannot exceed 1000';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Prepare data for submission
    const submissionData = {
      action: formData.action.trim(),
      date: formData.date,
      points: parseInt(formData.points)
    };

    onSubmit(submissionData);
  };

  /**
   * Handle form reset
   */
  const handleReset = () => {
    setFormData({
      action: '',
      date: '',
      points: ''
    });
    setErrors({});
  };

  /**
   * Handle cancel action
   */
  const handleCancel = () => {
    handleReset();
    onCancel();
  };

  return (
    <div className="action-form-container">
      <h2 className="form-title">
        {isEditing ? 'Edit Sustainability Action' : 'Add New Sustainability Action'}
      </h2>
      
      <form onSubmit={handleSubmit} className="action-form">
        {/* Action Description Field */}
        <div className="form-group">
          <label htmlFor="action" className="form-label">
            Action Description *
          </label>
          <input
            type="text"
            id="action"
            name="action"
            value={formData.action}
            onChange={handleInputChange}
            className={`form-input ${errors.action ? 'error' : ''}`}
            placeholder="e.g., Used public transportation instead of driving"
            disabled={isLoading}
          />
          {errors.action && <span className="error-message">{errors.action}</span>}
        </div>

        {/* Date Field */}
        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Date *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className={`form-input ${errors.date ? 'error' : ''}`}
            max={new Date().toISOString().split('T')[0]}
            disabled={isLoading}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>

        {/* Points Field */}
        <div className="form-group">
          <label htmlFor="points" className="form-label">
            Points Earned *
          </label>
          <input
            type="number"
            id="points"
            name="points"
            value={formData.points}
            onChange={handleInputChange}
            className={`form-input ${errors.points ? 'error' : ''}`}
            placeholder="0-1000"
            min="0"
            max="1000"
            disabled={isLoading}
          />
          {errors.points && <span className="error-message">{errors.points}</span>}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner">⏳</span>
            ) : (
              isEditing ? 'Update Action' : 'Add Action'
            )}
          </button>
          
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          
          {!isEditing && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleReset}
              disabled={isLoading}
            >
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ActionForm;
