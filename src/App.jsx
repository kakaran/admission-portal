import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./Routes/Routes";
import { AllContext } from "./Context/Context";
import { useContext } from "react";
import Loader from "./Components/Loader/Loader";
import "./App.css";


function App() {
  const { role, isSignedIn, authLoading } = useContext(AllContext);

  if (authLoading) return <Loader />;

  return (
    <Router>
      <Routes>
        {routes(role, isSignedIn)?.map((route, index) => {
          return <Route key={index} {...route} />;
        })}
      </Routes>
    </Router>
  );
}

export default App;
