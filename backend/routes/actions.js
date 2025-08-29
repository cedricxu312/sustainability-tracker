import express from "express";
import { readData, writeData } from "../utils/dataStore.js";

const router = express.Router();

// Log router initialization for debugging
console.log("Sustainability actions router loaded successfully");

/**
 * GET /api/actions
 * Retrieve all sustainability actions from the data store
 * Returns: Array of action objects
 */
router.get("/", (req, res) => {
  try {
    const sustainabilityActions = readData();
    res.json(sustainabilityActions);
  } catch (error) {
    console.error("Error retrieving actions:", error);
    res.status(500).json({ error: "Failed to retrieve sustainability actions" });
  }
});

/**
 * POST /api/actions
 * Add a new sustainability action to the data store
 * Body: { action: string, date: string, points: number }
 * Returns: Created action object with generated ID
 */
router.post("/", (req, res) => {
  try {
    const { action, date, points } = req.body;
    
    // Validate required fields
    if (!action || !date || points === undefined) {
      return res.status(400).json({ 
        error: "Missing required fields", 
        required: ["action", "date", "points"],
        received: { action: !!action, date: !!date, points: points !== undefined }
      });
    }

    // Validate data types
    if (typeof action !== 'string' || typeof date !== 'string' || typeof points !== 'number') {
      return res.status(400).json({ 
        error: "Invalid data types",
        expected: { action: "string", date: "string", points: "number" }
      });
    }

    const existingActions = readData();
    
    // Generate unique ID (simple increment approach)
    const newActionId = existingActions.length > 0 
      ? Math.max(...existingActions.map(action => action.id)) + 1 
      : 1;

    const newSustainabilityAction = {
      id: newActionId,
      action,
      date,
      points
    };

    existingActions.push(newSustainabilityAction);
    writeData(existingActions);
    
    res.status(201).json(newSustainabilityAction);
  } catch (error) {
    console.error("Error creating action:", error);
    res.status(500).json({ error: "Failed to create sustainability action" });
  }
});

/**
 * PUT /api/actions/:id
 * Replace an existing sustainability action completely
 * Params: id - Action ID to update
 * Body: { action: string, date: string, points: number }
 * Returns: Updated action object
 */
router.put("/:id", (req, res) => {
  try {
    const actionId = parseInt(req.params.id);
    
    // Validate ID parameter
    if (isNaN(actionId)) {
      return res.status(400).json({ error: "Invalid action ID format" });
    }

    const { action, date, points } = req.body;
    
    // Validate required fields
    if (!action || !date || points === undefined) {
      return res.status(400).json({ 
        error: "Missing required fields", 
        required: ["action", "date", "points"]
      });
    }

    const existingActions = readData();
    const actionIndex = existingActions.findIndex(item => item.id === actionId);

    if (actionIndex === -1) {
      return res.status(404).json({ 
        error: "Sustainability action not found",
        actionId: actionId
      });
    }

    // Replace the entire action
    const updatedAction = { id: actionId, action, date, points };
    existingActions[actionIndex] = updatedAction;
    writeData(existingActions);
    
    res.json(updatedAction);
  } catch (error) {
    console.error("Error updating action:", error);
    res.status(500).json({ error: "Failed to update sustainability action" });
  }
});

/**
 * PATCH /api/actions/:id
 * Update specific fields of an existing sustainability action
 * Params: id - Action ID to update
 * Body: { action?: string, date?: string, points?: number }
 * Returns: Updated action object
 */
router.patch("/:id", (req, res) => {
  try {
    const actionId = parseInt(req.params.id);
    
    // Validate ID parameter
    if (isNaN(actionId)) {
      return res.status(400).json({ error: "Invalid action ID format" });
    }

    const existingActions = readData();
    const actionIndex = existingActions.findIndex(item => item.id === actionId);

    if (actionIndex === -1) {
      return res.status(404).json({ 
        error: "Sustainability action not found",
        actionId: actionId
      });
    }

    const currentAction = existingActions[actionIndex];
    const { action, date, points } = req.body;

    // Update only provided fields, keep existing values for others
    const updatedAction = {
      id: actionId,
      action: action !== undefined ? action : currentAction.action,
      date: date !== undefined ? date : currentAction.date,
      points: points !== undefined ? points : currentAction.points
    };

    existingActions[actionIndex] = updatedAction;
    writeData(existingActions);
    
    res.json(updatedAction);
  } catch (error) {
    console.error("Error patching action:", error);
    res.status(500).json({ error: "Failed to update sustainability action" });
  }
});

/**
 * DELETE /api/actions/:id
 * Remove a sustainability action from the data store
 * Params: id - Action ID to delete
 * Returns: 200 status on successful deletion
 */
router.delete("/:id", (req, res) => {
  try {
    const actionId = parseInt(req.params.id);
    
    // Validate ID parameter
    if (isNaN(actionId)) {
      return res.status(400).json({ error: "Invalid action ID format" });
    }

    const existingActions = readData();
    const actionIndex = existingActions.findIndex(item => item.id === actionId);

    if (actionIndex === -1) {
      return res.status(404).json({ 
        error: "Sustainability action not found",
        actionId: actionId
      });
    }

    // Remove the action from the array
    existingActions.splice(actionIndex, 1);
    writeData(existingActions);
    
    res.status(200).json({ 
      message: "Sustainability action deleted successfully",
      deletedActionId: actionId
    });
  } catch (error) {
    console.error("Error deleting action:", error);
    res.status(500).json({ error: "Failed to delete sustainability action" });
  }
});

export default router;
