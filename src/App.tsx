
import React from 'react';
import ProductForm from './components/product/product';
import ListProduct from './components/Lista/listproduct';
import NavBar from './components/navbar/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  const links = [
    { path: '/', label: 'Inicio' },
    { path: '/criarproduto', label: 'Criar Produto' },
    { path: '/listaproduto', label: 'Lista de Produtos' },
  ];

  return (
    <Router>
      <NavBar links={links} />
      <Routes>
        <Route path="/" element={<div>Bem vindo Pae</div>} />
        <Route path="/criarproduto" element={<ProductForm />} />
        <Route path="/listaproduto" element={<ListProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
