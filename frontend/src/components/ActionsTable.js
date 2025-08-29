import React from 'react';
import './ActionsTable.css';

/**
 * ActionsTable Component
 * Displays sustainability actions in a table format with edit/delete functionality
 */
const ActionsTable = ({ 
  actions, 
  onEdit, 
  onDelete, 
  isLoading = false,
  onSort 
}) => {
  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  /**
   * Handle delete confirmation
   */
  const handleDelete = (action) => {
    if (window.confirm(`Are you sure you want to delete "${action.action}"?`)) {
      onDelete(action.id);
    }
  };

  /**
   * Calculate total points
   */
  const totalPoints = actions.reduce((sum, action) => sum + (action.points || 0), 0);

  if (isLoading) {
    return (
      <div className="table-loading">
        <div className="loading-spinner">⏳</div>
        <p>Loading sustainability actions...</p>
      </div>
    );
  }

  if (actions.length === 0) {
    return (
      <div className="table-empty">
        <div className="empty-icon">🌱</div>
        <h3>No sustainability actions yet</h3>
        <p>Start tracking your eco-friendly activities by adding your first action!</p>
      </div>
    );
  }

  return (
    <div className="actions-table-container">
      {/* Table Header with Summary */}
      <div className="table-header">
        <div className="table-title">
          <h2>Sustainability Actions</h2>
          <span className="action-count">
            {actions.length} action{actions.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="table-summary">
          <div className="summary-item">
            <span className="summary-label">Total Points:</span>
            <span className="summary-value points">{totalPoints}</span>
          </div>
        </div>
      </div>

      {/* Actions Table */}
      <div className="table-wrapper">
        <table className="actions-table">
          <thead>
            <tr>
              <th 
                className="sortable"
                onClick={() => onSort('id')}
              >
                ID ↕
              </th>
              <th 
                className="sortable"
                onClick={() => onSort('action')}
              >
                Action ↕
              </th>
              <th 
                className="sortable"
                onClick={() => onSort('date')}
              >
                Date ↕
              </th>
              <th 
                className="sortable"
                onClick={() => onSort('points')}
              >
                Points ↕
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {actions.map((action) => (
              <tr key={action.id} className="action-row">
                <td className="action-id">{action.id}</td>
                <td className="action-description">
                  <div className="action-text">{action.action}</div>
                </td>
                <td className="action-date">
                  {formatDate(action.date)}
                </td>
                <td className="action-points">
                  <span className="points-badge">
                    {action.points} pts
                  </span>
                </td>
                <td className="action-buttons">
                  <button
                    className="btn btn-edit"
                    onClick={() => onEdit(action)}
                    title="Edit this action"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(action)}
                    title="Delete this action"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="table-footer">
        <div className="footer-info">
          <span>Showing {actions.length} sustainability action{actions.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="footer-actions">
          <span className="eco-tip">
            🌍 Every small action counts towards a sustainable future!
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActionsTable;
