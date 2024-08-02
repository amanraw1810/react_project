
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { Dashboard } from './components/dashboard/Dashboard';
import { Pagenotfound } from './components/pagenotfound/Pagenotfound';
import Productdetails from './components/productdetails/Productdetails';
import Card from './components/cart/Card';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';





function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="product-details/:id" element={<Productdetails />} />
        <Route path="/cart" element={<Card />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
