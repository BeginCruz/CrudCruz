import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './product.css';
import axios from 'axios';

enum ProductStatus {
  IN_STOCK = 'em estoque',
  REPLENISHING = 'em reposição',
  OUT_OF_STOCK = 'em falta'
}

interface IProduct {
  name: string;
  description: string;
  price: number;
  status: ProductStatus;
  stock_quantity: number;
}

const ProductForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IProduct>();
  
  const onSubmit: SubmitHandler<IProduct> = data => {
    axios.post('http:34.71.240.100/api/product/create', data)
    console.log(data);

  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
      <div className="form-group">
        <label htmlFor="name">Nome:</label>
        <input id="name" className="form-control" {...register("name", { required: "Nome é obrigatório" })} />
        {errors.name && <span className="text-danger">{errors.name.message}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Descrição do produto:</label>
        <textarea id="description" className="form-control" {...register("description")} />
      </div>
      
      <div className="form-group">
        <label htmlFor="price">Preço:</label>
        <input id="price" type="number" step="0.01" className="form-control" {...register("price", { required: "Preço é obrigatório", valueAsNumber: true })} />
        {errors.price && <span className="text-danger">{errors.price.message}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select id="status" className="form-control" {...register("status", { required: "Status é obrigatório" })}>
          <option value={ProductStatus.IN_STOCK}>{ProductStatus.IN_STOCK}</option>
          <option value={ProductStatus.REPLENISHING}>{ProductStatus.REPLENISHING}</option>
          <option value={ProductStatus.OUT_OF_STOCK}>{ProductStatus.OUT_OF_STOCK}</option>
        </select>
        {errors.status && <span className="text-danger">{errors.status.message}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="stock_quantity">Quantidade:</label>
        <input id="stock_quantity" type="number" className="form-control" {...register("stock_quantity", { required: "Quantidade é obrigatória", valueAsNumber: true })} />
        {errors.stock_quantity && <span className="text-danger">{errors.stock_quantity.message}</span>}
      </div>
      
      <button type="submit" className="btn btn-primary mt-3">Criar Produto</button>
    </form>
  );
};

export default ProductForm;



// import React from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import './product.css';


// enum ProductStatus {
//   IN_STOCK = 'em estoque',
//   REPLENISHING = 'em reposição',
//   OUT_OF_STOCK = 'em falta'
// }

// interface IProduct {
//   name: string;
//   description: string;
//   price: number;
//   status: ProductStatus;
//   stock_quantity: number;
// }

// const ProductForm: React.FC = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<IProduct>();
  
//   const onSubmit: SubmitHandler<IProduct> = data => {
//     console.log(data);
//     // validar api
//   };
  
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <label htmlFor="name">Nome:</label>
//         <input id="name" {...register("name", { required: "Nome é obrigatório" })} />
//         {errors.name && <span>{errors.name.message}</span>}
//       </div>
      
//       <div>
//         <label htmlFor="description">Descrição do produto:</label>
//         <textarea id="description" {...register("description")} />
//       </div>
      
//       <div>
//         <label htmlFor="price">Preço:</label>
//         <input id="price" type="number" step="0.01" {...register("price", { required: "Preço é obrigatório", valueAsNumber: true })} />
//         {errors.price && <span>{errors.price.message}</span>}
//       </div>
      
//       <div>
//         <label htmlFor="status">Status:</label>
//         <select id="status" {...register("status", { required: "Status é obrigatório" })}>
//           <option value={ProductStatus.IN_STOCK}>{ProductStatus.IN_STOCK}</option>
//           <option value={ProductStatus.REPLENISHING}>{ProductStatus.REPLENISHING}</option>
//           <option value={ProductStatus.OUT_OF_STOCK}>{ProductStatus.OUT_OF_STOCK}</option>
//         </select>
//         {errors.status && <span>{errors.status.message}</span>}
//       </div>
      
//       <div>
//         <label htmlFor="stock_quantity">Quantidade:</label>
//         <input id="stock_quantity" type="number" {...register("stock_quantity", { required: "Quantidade é obrigatoria", valueAsNumber: true })} />
//         {errors.stock_quantity && <span>{errors.stock_quantity.message}</span>}
//       </div>
      
//       <button type="submit">Criar Produto</button>
//     </form>
//   );
// };

// export default ProductForm;
