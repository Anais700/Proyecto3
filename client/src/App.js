
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Categories from './components/Categories/Categories';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Categories/>
      <Products/>
      <Login/>
    </div>
  );
}

export default App;
