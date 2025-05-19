import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function TaskInput({
  task,
  setTask,
  handleAddTask,
  successMessage,
  promptMessage,
  errorMessage,
}) {
  return (
    <>
      <div className="task-conatainer">
        <p>Add your task</p>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Hey!! anything you wanna do today?"
            onChange={(e) => setTask(e.target.value)}
            id="task-input"
            value={task}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTask();
            }}
          />
          <span className="input-icon" onClick={handleAddTask}>
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </div>

        {successMessage && (
          <div className="success-popup">Task added successfully</div>
        )}
        {promptMessage && (
          <div className="prompt-popup">Please type something first</div>
        )}
        {errorMessage && <div className="error-popup">Task already exists</div>}
      </div>
    </>
  );
}

export default TaskInput;
