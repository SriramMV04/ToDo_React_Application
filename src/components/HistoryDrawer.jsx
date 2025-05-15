import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function HistoryDrawer({
  showHistoryDrawer,
  setShowHistoryDrawer,
  handleClearHistory,
  recentTasksList,
  recentTimestampsList,
  handleRestoreTaskFromHistory,
  handleTaskDeleteFromHistory,
}) {
  return (
    <>
      {showHistoryDrawer && (
        <div
          className="drawer-backdrop"
          onClick={() => setShowHistoryDrawer(false)}
        />
      )}

      <div className={`side-drawer ${showHistoryDrawer ? "open" : ""}`}>
        <div className="drawer-header">
          <FontAwesomeIcon
            icon={faXmark}
            className="close-btn"
            onClick={() => setShowHistoryDrawer(false)}
            title="Close"
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="clear-btn"
            onClick={() => handleClearHistory()}
            title="Clear all"
          />
        </div>

        <h2 className="heading">Recently Completed Tasks</h2>

        <div className="task-list-container">
          {recentTasksList.length === 0 ? (
            <p id="empty-list">No records 📑</p>
          ) : (
            <div className="card-container">
              {recentTasksList.map((_, itemIndex) => (
                <div className="card-wrapper" key={itemIndex}>
                  <div className="completed-card">
                    <ol>
                      <li>
                        <div className="task-text-container">
                          <p className="task-text">
                            {recentTasksList[itemIndex]}
                          </p>
                        </div>
                      </li>
                      <div className="card-sub-row">
                        <p>{recentTimestampsList[itemIndex]}</p>
                      </div>
                    </ol>
                  </div>

                  <div className="completed-action-buttons">
                    <button
                      className="completed-action-button restore-button"
                      onClick={() => handleRestoreTaskFromHistory(itemIndex)}
                    >
                      <FontAwesomeIcon icon={faBackward} title="Restore" />
                    </button>
                    <button
                      className="completed-action-button delete-button"
                      onClick={() => handleTaskDeleteFromHistory(itemIndex)}
                    >
                      <FontAwesomeIcon icon={faTrash} title="Delete" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HistoryDrawer;
