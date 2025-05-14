import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

function TaskList({
  taskList,
  handleClearTasks,
  handleTaskDelete,
  handleCompletedTask,
  createdAtList,
  successDeleteMessage,
  markedAsCompletedMessage,
}) {
  return (
    <>
      <p id="list-title">Pending Tasks</p>
      <div className="clear-container">
        <p
          id="clear-tasks"
          onClick={handleClearTasks}
          style={{
            cursor: taskList.length === 0 ? "not-allowed" : "pointer",
            color: taskList.length === 0 ? "grey" : "#04AA6D",
          }}
        >
          Clear all
        </p>
      </div>
      <div className="task-list-container">
        {taskList.length === 0 ? (
          <p id="empty-list">No records 📑</p>
        ) : (
          <div className="card-container">
            {taskList.map((item, itemIndex) => (
              <div className="card-wrapper" key={itemIndex}>
                <div className="main-card">
                  <ol>
                    <li>
                      <div className="task-text-container">
                        <p className="task-text">{item}</p>
                      </div>
                    </li>
                    <div className="card-sub-row">
                      <p>{createdAtList[itemIndex]}</p>
                    </div>
                  </ol>
                </div>

                <div className="action-buttons">
                  <button
                    className="action-button complete-button"
                    onClick={() => handleCompletedTask(itemIndex)}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} title="Completed" />
                  </button>
                  <button
                    className="action-button delete-button"
                    onClick={() => handleTaskDelete(itemIndex)}
                  >
                    <FontAwesomeIcon icon={faTrash} title="Delete" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {successDeleteMessage && (
          <div className="success-delete-popup">Task deleted successfully</div>
        )}
        {markedAsCompletedMessage && (
          <div className="completed-popup">Marked as completed</div>
        )}
      </div>
    </>
  );
}

export default TaskList;
