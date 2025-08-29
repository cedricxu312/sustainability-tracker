import React, { useState, useEffect } from 'react';
import ActionForm from './components/ActionForm';
import ActionsTable from './components/ActionsTable';
import { sustainabilityActionsAPI } from './services/api';
import './App.css';

/**
 * Main App Component
 * Manages the sustainability actions application state and UI
 */
function App() {
  // State management
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingAction, setEditingAction] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  /**
   * Load actions from API on component mount
   */
  useEffect(() => {
    loadActions();
  }, []);

  /**
   * Clear success message after 3 seconds
   */
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  /**
   * Load all sustainability actions
   */
  const loadActions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await sustainabilityActionsAPI.getAllActions();
      setActions(data);
    } catch (err) {
      setError(`Failed to load actions: ${err.message}`);
      console.error('Error loading actions:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle form submission (create or update)
   */
  const handleFormSubmit = async (formData) => {
    try {
      setFormLoading(true);
      setError(null);

      if (editingAction) {
        // Update existing action
        await sustainabilityActionsAPI.updateAction(editingAction.id, formData);
        setSuccessMessage('Sustainability action updated successfully! 🌱');
      } else {
        // Create new action
        await sustainabilityActionsAPI.createAction(formData);
        setSuccessMessage('Sustainability action added successfully! 🌱');
      }

      // Refresh the actions list
      await loadActions();
      
      // Reset form state
      handleFormCancel();
    } catch (err) {
      setError(`Failed to ${editingAction ? 'update' : 'create'} action: ${err.message}`);
      console.error('Error submitting form:', err);
    } finally {
      setFormLoading(false);
    }
  };

  /**
   * Handle form cancellation
   */
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingAction(null);
    setError(null);
  };

  /**
   * Handle edit action
   */
  const handleEditAction = (action) => {
    setEditingAction(action);
    setShowForm(true);
    setError(null);
  };

  /**
   * Handle delete action
   */
  const handleDeleteAction = async (actionId) => {
    try {
      setLoading(true);
      setError(null);
      
      await sustainabilityActionsAPI.deleteAction(actionId);
      setSuccessMessage('Sustainability action deleted successfully! 🗑️');
      
      // Refresh the actions list
      await loadActions();
    } catch (err) {
      setError(`Failed to delete action: ${err.message}`);
      console.error('Error deleting action:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle table sorting
   */
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  /**
   * Sort actions based on current sort field and direction
   */
  const getSortedActions = () => {
    if (!actions.length) return actions;

    return [...actions].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle different data types
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  /**
   * Calculate total points
   */
  const totalPoints = actions.reduce((sum, action) => sum + (action.points || 0), 0);

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>🌱 Sustainability Tracker</h1>
            <p>Track your eco-friendly actions and earn points!</p>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-label">Total Actions</span>
              <span className="stat-value">{actions.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Points</span>
              <span className="stat-value points">{totalPoints}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="container">
          {/* Error Message */}
          {error && (
            <div className="message error-message">
              <span className="message-icon">⚠️</span>
              <span>{error}</span>
              <button 
                className="message-close"
                onClick={() => setError(null)}
              >
                ×
              </button>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="message success-message">
              <span className="message-icon">✅</span>
              <span>{successMessage}</span>
              <button 
                className="message-close"
                onClick={() => setSuccessMessage(null)}
              >
                ×
              </button>
            </div>
          )}

          {/* Add Action Button */}
          {!showForm && (
            <div className="add-action-section">
              <button
                className="btn btn-primary btn-large"
                onClick={() => setShowForm(true)}
              >
                ➕ Add New Action
              </button>
            </div>
          )}

          {/* Action Form */}
          {showForm && (
            <ActionForm
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              initialData={editingAction}
              isEditing={!!editingAction}
              isLoading={formLoading}
            />
          )}

          {/* Actions Table */}
          <ActionsTable
            actions={getSortedActions()}
            onEdit={handleEditAction}
            onDelete={handleDeleteAction}
            isLoading={loading}
            onSort={handleSort}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container">
          <p>🌍 Making the world greener, one action at a time!</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
