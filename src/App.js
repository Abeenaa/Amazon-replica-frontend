import { useContext, useEffect } from "react";
import "./App.css";
import Routing from "./Routing.jsx";
import { DataContext } from "./Components/DataProvider/DataProvider.jsx";
import { auth } from "./Utility/Firebase.js";
import { Type } from "./Utility/action.type.js";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="App">
      {/* <Header />
      <CarouselEffect />
      <Catagory />
      <Product /> */}

      <Routing />
    </div>
  );
}

export default App;
