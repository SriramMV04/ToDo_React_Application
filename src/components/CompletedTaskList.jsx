import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function CompletedTaskList({
  completedTasksList,
  handleClearCompletedTasks,
  handleCompletedTaskDelete,
  completedCreatedAtList,
  successDeleteMessage,
  handleRestoreTask,
  successRestoreMessage,
  successFinishMessage,
  handleFinishCompletedTask,
}) {
  return (
    <>
      <p id="completed-list-title">Completed Tasks</p>
      <div className="clear-container">
        <p
          id="clear-tasks"
          onClick={handleClearCompletedTasks}
          style={{
            cursor: completedTasksList.length === 0 ? "not-allowed" : "pointer",
            color: completedTasksList.length === 0 ? "grey" : "#04AA6D",
          }}
        >
          Clear all
        </p>
      </div>
      <div className="task-list-container">
        {completedTasksList.length === 0 ? (
          <p id="empty-list">No records 📑</p>
        ) : (
          <div className="completed-card-container">
            {completedTasksList.map((_, itemIndex) => (
              <div className="card-wrapper" key={itemIndex}>
                <div className="completed-card">
                  <ol>
                    <li>
                      <div className="task-text-container">
                        <p className="task-text">
                          {completedTasksList[itemIndex]}
                        </p>
                      </div>
                    </li>
                    <div className="card-sub-row">
                      <p>{completedCreatedAtList[itemIndex]}</p>
                    </div>
                  </ol>
                </div>

                <div className="completed-action-buttons">
                  <button
                    className="completed-action-button restore-button"
                    onClick={() => handleRestoreTask(itemIndex)}
                  >
                    <FontAwesomeIcon icon={faBackward} title="Restore" />
                  </button>
                  <button
                    className="completed-action-button delete-button"
                    onClick={() => handleCompletedTaskDelete(itemIndex)}
                  >
                    <FontAwesomeIcon icon={faTrash} title="Delete" />
                  </button>
                  <button
                    className="completed-action-button finish-button"
                    onClick={() => handleFinishCompletedTask(itemIndex)}
                  >
                    <FontAwesomeIcon icon={faCheck} title="Finish" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {successRestoreMessage && (
          <div className="success-restore-popup">Task has been restored</div>
        )}
        {successDeleteMessage && (
          <div className="success-delete-popup">Task deleted successfully</div>
        )}
        {successFinishMessage && (
          <div className="success-finish-popup">Task moved to history</div>
        )}
      </div>
    </>
  );
}

export default CompletedTaskList;
