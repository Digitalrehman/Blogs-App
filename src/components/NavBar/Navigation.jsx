import { Link } from "react-router-dom";
import "./Navbar.css";
import { MdAddComment } from "react-icons/md";
import video from "../../assets/BackGround.mp4";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { errornotify, successnotify } from "../Tostify/Tostify";
import axios from "axios";
import { API_URL } from "../../Global";
import ToDo from "../ToDoCard/ToDo";
import { FaSearch } from "react-icons/fa";

const Navigation = () => {
  let [showTask, setShowTask] = useState(false);
  let [getallTask, setGetallTask] = useState([]);
  let [isupdating, setIsupdating] = useState(false);
  let [idforediting, setIdforediting] = useState("");
  let [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    GetTaskHandler();
  }, []);
  const GetTaskHandler = () => {
    let token = localStorage.getItem("token");
    if (token) {
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(`${API_URL}/getTask`, config)
        .then((res) => {
          let tasks = res.data.data;
          setGetallTask([...tasks]);
        })
        .catch((err) => console.error(err));
    }
  };

  const AddTaskHandler = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };
  const TaskSubmitHandler = () => {
    const title = task.title;
    const description = task.description;
    const status = task.status;
    if (!title || !description || !status) {
      errornotify("Required feild are missing");
      return;
    }
    let objsend = {
      title,
      description,
      status,
    };
    let token = localStorage.getItem("token");
    if (token) {
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      if (!isupdating) {
        axios
          .post(`${API_URL}/sendTask`, objsend, config)
          .then((res) => {
            GetTaskHandler();
            successnotify(res.data.message);
            setTask({
              title: "",
              description: "",
              status: "",
            });
          })
          .catch((error) => {
            errornotify(error.response.data.message);
          });
      } else {
        axios
          .put(
            `${API_URL}/updateTask`,
            {
              ...objsend,
              id: idforediting,
            },
            config
          )
          .then((res) => {
            GetTaskHandler();
            successnotify(res.data.message);
            setTask({
              title: "",
              description: "",
              status: "",
            });
            setIsupdating(false);
          })
          .catch((error) => {
            errornotify(error.response.data.message);
          });
      }
    }
  };

  const AppendTaskDetail = (obj, id) => {
    let { title, description, status } = obj;
    setTask({
      title,
      description,
      status,
    });
    setIdforediting(id);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-container">
          <ul className="navbar-nav">
            <li className="nav-item home">
              <Link to="/Home">Home</Link>
            </li>
            <li className="nav-item home">
              <Link to="/Favourite">Favourite</Link>
            </li>
            <li className="nav-item home">
              <Link to="/Saved">Saved</Link>
            </li>
            <li className="nav-item">
              <Link to="/Login">Logout</Link>
            </li>
            <li className="nav-item-search">
              <input type="text" placeholder="Serach Here" />
              <FaSearch />
            </li>
          </ul>
        </div>
        <div className="AddTask">
          <span>
            <MdAddComment onClick={() => setShowTask(true)} />
          </span>
        </div>
      </div>

      {showTask && (
        <div className="AddTaskBox">
          <div className="taskBox">
            <video loop muted autoPlay>
              <source src={video} type="video/mp4" />
            </video>
            <div className="close" onClick={() => setShowTask(false)}>
              <span>
                <IoCloseSharp />
              </span>
            </div>
            <div className="taskBox-header">
              <h1>ADD BLOGS</h1>
            </div>
            <div className="taskBox-body">
              <input
                type="text"
                placeholder="Blog Name"
                name="title"
                value={task.title}
                onChange={AddTaskHandler}
              />
              <input
                type="text"
                placeholder="Blog Description"
                name="description"
                value={task.description}
                onChange={AddTaskHandler}
              />
              <input
                type="text"
                className="select"
                placeholder="Name"
                name="status"
                value={task.status}
                onChange={AddTaskHandler}
              />
              <Link
                to=""
                onClick={() => {
                  TaskSubmitHandler();
                  setShowTask(false);
                }}
              >
                Add Task
              </Link>
            </div>
          </div>
        </div>
      )}
      <ToDo
        task={getallTask}
        showtask={setShowTask}
        appendTaskDetail={AppendTaskDetail}
        setIsupdating={setIsupdating}
        setGetallTask={setGetallTask}
      />
    </>
  );
};

export default Navigation;
