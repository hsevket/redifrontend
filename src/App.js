import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/authcontext/AuthContext";
import AuthProtector from "./components/AuthProtector";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Posts from "./components/Posts";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <AuthProtector>
                <MainPage />
              </AuthProtector>
            }
          >
            <Route index element={<Posts />} />
            <Route path="profile" element={<Profile />} />
            <Route path="editprofile" element={<EditProfile />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
