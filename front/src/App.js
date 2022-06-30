import AddAccount from "./components/add-account";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons


function App() {
  return (
    <div className="App">
        <AddAccount />
    </div>
  );
}

export default App;