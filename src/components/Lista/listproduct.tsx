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
    // // so pra armazenar no local
    const localStorageProducts = localStorage.getItem('productData');
    const parsedLocalProducts: IProduct[] = localStorageProducts ? JSON.parse(localStorageProducts) : [];

    // validação da Api
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
    axios.delete(`http://34.71.240.100/api/product/delete${productId}`)
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

  // if (loading) {
  //   return <div className="text-center mt-5">Carregando</div>;
  // }

  // if (error) {
  //   return <div className="alert alert-danger mt-5">{error}</div>;
  // }

  return (
    <div className="product-list container mt-5">
      <h1 className="text-center mb-4">Lista de Produtos</h1>
      <div className="form-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar produtos"
          value={searchP}
          onChange={(e) => setSearchP(e.target.value)}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Quantidade em Estoque</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>R$ {product.price.toFixed(2)}</td>
              <td>{product.status}</td>
              <td>{product.stock_quantity}</td>
              <td>
                <button className="btn btn-primary mr-2" onClick={() => handleEdit(product)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProduct;