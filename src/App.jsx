import { ToastContainer } from "./components/Tostify/Tostify";
import Router from "./Router/Router";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"
const App = () => {
  return (
    <>
    <div className="body">
    
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
        </div>
      
    </>
  );
};

export default App;
