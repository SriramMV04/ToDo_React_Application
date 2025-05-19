function EditTaskForm({
  showEditTaskForm,
  setShowEditTaskForm,
  editTaskText,
  editTaskIndex,
  setEditTaskText,
  handleSaveEditTask,
  errorMessage,
  successMessage,
  inputRef,
}) {
  return (
    <>
      {showEditTaskForm && <div className="edit-form-backdrop" />}
      <div className={`edit-task-form ${showEditTaskForm ? "open" : ""}`}>
        <h3>Edit Task</h3>
        <input
          type="text"
          onChange={(e) => setEditTaskText(e.target.value)}
          id="task-input"
          value={editTaskText}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSaveEditTask(editTaskIndex);
          }}
          ref={inputRef}
        />
        <div className="edit-task-instructions">
          <p>*will be marked as (edited)</p>
          <p>*timestamp will be updated</p>
        </div>
        <div className="edit-task-buttons">
          <button
            className="cancel-edit-btn"
            onClick={() => setShowEditTaskForm(false)}
          >
            Cancel
          </button>
          <button
            className="save-edit-btn"
            onClick={() => handleSaveEditTask(editTaskIndex)}
          >
            Save
          </button>
        </div>
      </div>
      {errorMessage && <div className="error-popup">Task already exists</div>}
      {successMessage && (
        <div className="success-popup">Task added successfully</div>
      )}
    </>
  );
}

export default EditTaskForm;
