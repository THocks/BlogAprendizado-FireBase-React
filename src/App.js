import "./App.css";
// Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
//context
import { AuthProvider } from "./context/AuthContext";

//hooks
import { useState, useEffect } from "react";
import { useAuthenticator } from "./hooks/useAuthenticator";
// pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Navbar from "./Components/NavBar/Navbar";
import Footer from "./Components/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PostUser from "./pages/Postuser/PostUser";
import Dashboard from "./pages/Dashboard/Dashboard";
import Search from "./pages/Search/Search";
import Post from "./pages/post/Post";
import EditPost from "./pages/EditPost/EditPost";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthenticator();
  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/Register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/posts/edit/:id"
                element={user ? <EditPost /> : <Navigate to="/login" />}
              />
              <Route
                path="/post/postuser"
                element={user ? <PostUser /> : <Navigate to="/login" />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
