
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './Routers/Routers';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="container">
      <RouterProvider router={routes}>
      </RouterProvider>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
