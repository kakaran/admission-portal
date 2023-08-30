import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./Routes/Routes";
import { AllContext } from "./Context/Context";
import { useContext } from "react";
import "./App.css";


function App() {
  const { role, isSignedIn } = useContext(AllContext);

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
