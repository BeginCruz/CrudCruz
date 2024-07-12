import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  status: string;
  stock_quantity: number;
}

const ListProduct: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchP, setSearchP] = useState<string>('');

  useEffect(() => {
    axios.get('http://34.71.240.100/api/product/list') //Apizinhaaa
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Falha ao carregar');
        setLoading(false);
      });
  }, []);

  const handleEdit = (product: IProduct) => {
    console.log('Editar produto', product);
  };

  const handleDelete = (productId: number) => {
    axios.delete(`http://34.71.240.100/api/product/list'/${productId}`)
      .then(response => {
        setProducts(products.filter(product => product.id !== productId));
      })
      .catch(error => {
        setError('Erro ao excluir produto');
      });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchP.toLowerCase())
  );

  if (loading) {
    return <div className="text-center mt-5">Carregando</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-5">{error}</div>;
  }

  return (
    <div className="product-list container mt-5">
      <h1 className="text-center mb-4">Lista de Produtos</h1>
      <div className="form-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar produtos."
          value={searchP}
          onChange={(e) => setSearchP(e.target.value)}
        />
      </div>
      <ul className="list-group">
        {filteredProducts.map(product => (
          <li key={product.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="h5">{product.name}</h2>
                <p>{product.description}</p>
                <p><strong>Preco:</strong> R$ {product.price.toFixed(2)}</p>
                <p><strong>Status:</strong> {product.status}</p>
                <p><strong>Quantidade em Estoque:</strong> {product.stock_quantity}</p>
              </div>
              <div>
                <button className="btn btn-primary mr-2" onClick={() => handleEdit(product)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Excluir</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListProduct;