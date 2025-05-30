import "./App.css";
import CompletedTaskList from "./components/CompletedTaskList";
import Footer from "./components/Footer";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

import { useEffect, useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faCloudMoon } from "@fortawesome/free-solid-svg-icons";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";

import HistoryDrawer from "./components/HistoryDrawer";
import EditTaskForm from "./components/EditTaskForm";

function App() {
  const [task, setTask] = useState("");

  const [taskList, setTaskList] = useState([]);
  const [createdAtList, setCreatedAtList] = useState([]);

  const [completedTasksList, setCompletedTasksList] = useState([]);
  const [completedCreatedAtList, setCompletedCreatedAtList] = useState([]);

  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [promptMessage, setPromptMessage] = useState(false);

  const [successDeleteMessage, setSuccessDeleteMessage] = useState(false);
  const [markedAsCompletedMessage, setMarkedAsCompletedMessage] =
    useState(false);
  const [successRestoreMessage, setSuccessRestoreMessage] = useState(false);
  const [successFinishMessage, setSuccessFinishMessage] = useState(false);

  const [recentTasksList, setRecentTasksList] = useState([]);
  const [recentTimestampsList, setRecentTimestampsList] = useState([]);

  const [editTaskText, setEditTaskText] = useState("");
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [showEditTaskForm, setShowEditTaskForm] = useState(false);

  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    const isDarkModeOn = localStorage.getItem("darkMode");
    return isDarkModeOn === "true" ? true : false;
  });

  // State to autoFocus the input field
  const inputRef = useRef(null);

  // Load the data from the local storage
  useEffect(() => {
    const existingTasksList = JSON.parse(localStorage.getItem("tasks"));
    const existingCompletedTasksList = JSON.parse(
      localStorage.getItem("completedTasks")
    );
    const existingTimestampList = JSON.parse(localStorage.getItem("timestamp"));
    const existingCompletedTimestampList = JSON.parse(
      localStorage.getItem("completedTimestamp")
    );

    if (existingTasksList) {
      setTaskList(existingTasksList);
    }

    if (existingCompletedTasksList) {
      setCompletedTasksList(existingCompletedTasksList);
    }

    if (existingTimestampList) {
      setCreatedAtList(existingTimestampList);
    }

    if (existingCompletedTimestampList) {
      setCompletedCreatedAtList(existingCompletedTimestampList);
    }
  }, []);

  // Disable/Enable scrolling when the history drawer is open
  useEffect(() => {
    if (showHistoryDrawer) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
  }, [showHistoryDrawer]);

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // AutoFocus the edit task input field
  useEffect(() => {
    if (showEditTaskForm) {
      const timer = setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [showEditTaskForm]);

  function handleAddTask() {
    if (task.trim() === "") {
      setPromptMessage(true);
      setTimeout(() => setPromptMessage(false), 1000);
      return;
    }

    if (taskList.includes(task) || completedTasksList.includes(task)) {
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 1000);

      // Clear the input field after adding the task
      setTask("");
      return;
    }

    const timestamp = Date.now();
    const date = new Date(timestamp);
    const formattedTimestamp = date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const newTaskList = [...taskList, task];
    const newTimestampList = [...createdAtList, formattedTimestamp];

    setTaskList(newTaskList);
    setCreatedAtList(newTimestampList);

    // Clear the input field after adding the task
    setTask("");

    // Store data in local storage
    localStorage.setItem("tasks", JSON.stringify(newTaskList));
    localStorage.setItem("timestamp", JSON.stringify(newTimestampList));

    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 1000);
  }

  function handleClearTasks() {
    setTaskList([]);
    setCreatedAtList([]);

    // Clear the task data from local storage
    localStorage.removeItem("tasks");
    localStorage.removeItem("timestamp");
  }

  function handleClearCompletedTasks() {
    setCompletedTasksList([]);
    setCompletedCreatedAtList([]);

    // Clear the completed task data from local storage
    localStorage.removeItem("completedTasks");
    localStorage.removeItem("completedTimestamp");
  }

  function removeTaskAtIndex(index) {
    const newTasks = [...taskList];
    const newTimestamps = [...createdAtList];
    newTasks.splice(index, 1);
    newTimestamps.splice(index, 1);

    setTaskList(newTasks);
    setCreatedAtList(newTimestamps);

    localStorage.setItem("tasks", JSON.stringify(newTasks));
    localStorage.setItem("timestamp", JSON.stringify(newTimestamps));
  }

  function handleTaskDelete(index) {
    removeTaskAtIndex(index);

    setSuccessDeleteMessage(true);
    setTimeout(() => {
      setSuccessDeleteMessage(false);
    }, 1000);
  }

  function handleTaskCompleted(index) {
    const task = taskList[index];
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const formattedTimestamp = date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    if (!completedTasksList.includes(task)) {
      const newCompletedTasks = [...completedTasksList, task];
      const newCompletedTimestamps = [
        ...completedCreatedAtList,
        formattedTimestamp,
      ];

      setCompletedTasksList(newCompletedTasks);
      setCompletedCreatedAtList(newCompletedTimestamps);
      localStorage.setItem("completedTasks", JSON.stringify(newCompletedTasks));
      localStorage.setItem(
        "completedTimestamp",
        JSON.stringify(newCompletedTimestamps)
      );

      // Remove the task from the task list after marking it as completed
      removeTaskAtIndex(index);

      setMarkedAsCompletedMessage(true);
      setTimeout(() => {
        setMarkedAsCompletedMessage(false);
      }, 1000);
    }
  }

  function handleEditTask(index) {
    // Open the edit task form
    setShowEditTaskForm(true);

    const task = taskList[index];
    setEditTaskText(task);
    setEditTaskIndex(index);
  }

  function handleSaveEditTask(index) {
    const updatedTask = editTaskText;

    if (!updatedTask.trim()) return;

    if (
      taskList.includes(updatedTask) ||
      completedTasksList.includes(updatedTask)
    ) {
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 1000);
      return;
    }

    const updatedTaskList = [...taskList];
    updatedTaskList[index] = updatedTask;

    const timestamp = Date.now();
    const date = new Date(timestamp);
    const formattedTimestamp = date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const updatedCreatedAtList = [...createdAtList];
    const updatedTimestamp = formattedTimestamp + " (edited)";
    updatedCreatedAtList[index] = updatedTimestamp;

    setTaskList(updatedTaskList);
    setCreatedAtList(updatedCreatedAtList);

    localStorage.setItem("tasks", JSON.stringify(updatedTaskList));
    localStorage.setItem("timestamp", JSON.stringify(updatedCreatedAtList));

    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 1000);

    // Clear the input field after saving the edit
    setEditTaskText("");
    setEditTaskIndex(null);
    setShowEditTaskForm(false);
  }

  function removeCompletedTaskAtIndex(index) {
    const updatedTasks = [...completedTasksList];
    const updatedTimestamps = [...completedCreatedAtList];
    updatedTasks.splice(index, 1);
    updatedTimestamps.splice(index, 1);

    setCompletedTasksList(updatedTasks);
    setCompletedCreatedAtList(updatedTimestamps);

    localStorage.setItem("completedTasks", JSON.stringify(updatedTasks));
    localStorage.setItem(
      "completedTimestamp",
      JSON.stringify(updatedTimestamps)
    );
  }

  function handleCompletedTaskDelete(index) {
    removeCompletedTaskAtIndex(index);

    setSuccessDeleteMessage(true);
    setTimeout(() => {
      setSuccessDeleteMessage(false);
    }, 1000);
  }

  function handleRestoreTask(index) {
    const task = completedTasksList[index];
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const formattedTimestamp = date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    if (!taskList.includes(task)) {
      const newTaskList = [...taskList, task];
      const newTimestampList = [...createdAtList, formattedTimestamp];

      setTaskList(newTaskList);
      setCreatedAtList(newTimestampList);
      localStorage.setItem("tasks", JSON.stringify(newTaskList));
      localStorage.setItem("timestamp", JSON.stringify(newTimestampList));

      // Remove the task from the completed tasks list after restoring it
      removeCompletedTaskAtIndex(index);

      setSuccessRestoreMessage(true);
      setTimeout(() => {
        setSuccessRestoreMessage(false);
      }, 1000);
    }
  }

  function handleFinishCompletedTask(index) {
    const task = completedTasksList[index];
    const timestamp = completedCreatedAtList[index];

    const newRecentTasksList = [...recentTasksList, task];
    const newRecentTimestampsList = [...recentTimestampsList, timestamp];

    setRecentTasksList(newRecentTasksList);
    setRecentTimestampsList(newRecentTimestampsList);

    localStorage.setItem(
      "completedTasksHistory",
      JSON.stringify(newRecentTasksList)
    );
    localStorage.setItem(
      "completedTimestampHistory",
      JSON.stringify(newRecentTimestampsList)
    );

    // Remove the task from the completed tasks list after it is finished
    removeCompletedTaskAtIndex(index);

    setSuccessFinishMessage(true);
    setTimeout(() => {
      setSuccessFinishMessage(false);
    }, 1000);
  }

  function handleViewHistory() {
    // Open the history drawer
    setShowHistoryDrawer(true);

    const historyTasks = JSON.parse(
      localStorage.getItem("completedTasksHistory")
    );
    const historyTimestamps = JSON.parse(
      localStorage.getItem("completedTimestampHistory")
    );

    if (historyTasks && historyTimestamps) {
      setRecentTasksList(historyTasks);
      setRecentTimestampsList(historyTimestamps);
    }
  }

  function handleClearHistory() {
    setRecentTasksList([]);
    setRecentTimestampsList([]);

    setSuccessDeleteMessage(true);
    setTimeout(() => {
      setSuccessDeleteMessage(false);
    }, 1000);

    // Clear the history data from local storage
    localStorage.removeItem("completedTasksHistory");
    localStorage.removeItem("completedTimestampHistory");
  }

  function removeTaskFromHistoryAtIndex(index) {
    const updatedTasks = [...recentTasksList];
    const updatedTimestamps = [...recentTimestampsList];
    updatedTasks.splice(index, 1);
    updatedTimestamps.splice(index, 1);

    setRecentTasksList(updatedTasks);
    setRecentTimestampsList(updatedTimestamps);

    localStorage.setItem("completedTasksHistory", JSON.stringify(updatedTasks));
    localStorage.setItem(
      "completedTimestampHistory",
      JSON.stringify(updatedTimestamps)
    );
  }

  function handleTaskDeleteFromHistory(index) {
    setSuccessDeleteMessage(true);
    setTimeout(() => {
      setSuccessDeleteMessage(false);
    }, 1000);

    removeTaskFromHistoryAtIndex(index);
  }

  function handleRestoreTaskFromHistory(index) {
    const task = recentTasksList[index];
    const timestamp = recentTimestampsList[index];

    if (!taskList.includes(task)) {
      const newTaskList = [...taskList, task];
      const newTimestampList = [...createdAtList, timestamp];

      setTaskList(newTaskList);
      setCreatedAtList(newTimestampList);
      localStorage.setItem("tasks", JSON.stringify(newTaskList));
      localStorage.setItem("timestamp", JSON.stringify(newTimestampList));

      // Remove the task from the history list after restoring it
      removeTaskFromHistoryAtIndex(index);

      setSuccessRestoreMessage(true);
      setTimeout(() => {
        setSuccessRestoreMessage(false);
      }, 1000);
    } else {
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 1000);
    }
  }

  return (
    <>
      <body>
        <div className="top-bar">
          <FontAwesomeIcon
            icon={faClockRotateLeft}
            className="history-icon"
            onClick={handleViewHistory}
            title="History"
          />
          {!darkMode ? (
            <FontAwesomeIcon
              icon={faCloudMoon}
              className="dark-theme-icon"
              onClick={() => setDarkMode(!darkMode)}
              title="Dark mode"
            />
          ) : (
            <FontAwesomeIcon
              icon={faCloudSun}
              className="light-theme-icon"
              onClick={() => setDarkMode(!darkMode)}
              title="Light mode"
            />
          )}
        </div>

        <EditTaskForm
          showEditTaskForm={showEditTaskForm}
          editTaskText={editTaskText}
          editTaskIndex={editTaskIndex}
          setEditTaskText={setEditTaskText}
          handleSaveEditTask={handleSaveEditTask}
          setShowEditTaskForm={setShowEditTaskForm}
          promptMessage={promptMessage}
          errorMessage={errorMessage}
          successMessage={successMessage}
          inputRef={inputRef}
        />
      </body>
      <p id="title">T.O.D.O. – Track, Organize, Do, Optimize</p>
      <HistoryDrawer
        showHistoryDrawer={showHistoryDrawer}
        setShowHistoryDrawer={setShowHistoryDrawer}
        handleClearHistory={handleClearHistory}
        recentTasksList={recentTasksList}
        recentTimestampsList={recentTimestampsList}
        handleRestoreTaskFromHistory={handleRestoreTaskFromHistory}
        handleTaskDeleteFromHistory={handleTaskDeleteFromHistory}
        successDeleteMessage={successDeleteMessage}
        successRestoreMessage={successRestoreMessage}
        errorMessage={errorMessage}
      />
      <TaskInput
        task={task}
        setTask={setTask}
        handleAddTask={handleAddTask}
        successMessage={successMessage}
        promptMessage={promptMessage}
        errorMessage={errorMessage}
      />
      <TaskList
        taskList={taskList}
        handleClearTasks={handleClearTasks}
        handleTaskDelete={handleTaskDelete}
        handleTaskCompleted={handleTaskCompleted}
        handleEditTask={handleEditTask}
        createdAtList={createdAtList}
        successDeleteMessage={successDeleteMessage}
        markedAsCompletedMessage={markedAsCompletedMessage}
      />
      <CompletedTaskList
        completedTasksList={completedTasksList}
        completedCreatedAtList={completedCreatedAtList}
        handleCompletedTaskDelete={handleCompletedTaskDelete}
        handleClearCompletedTasks={handleClearCompletedTasks}
        successDeleteMessage={successDeleteMessage}
        handleRestoreTask={handleRestoreTask}
        successRestoreMessage={successRestoreMessage}
        handleFinishCompletedTask={handleFinishCompletedTask}
        successFinishMessage={successFinishMessage}
      />
      <Footer />
    </>
  );
}

export default App;
