import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import AddButton from '../components/AddButton';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: '笔记本电脑', category: '电子产品', price: 5999.99 },
    { id: 2, name: '办公椅', category: '家具', price: 999.99 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const columns = [
    { key: 'name', label: '名称' },
    { key: 'category', label: '类别' },
    { key: 'price', label: '价格' },
  ];

  const handleSearch = (query: string) => {
    // 实现搜索逻辑
    console.log('搜索:', query);
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    // 实现删除逻辑
    console.log('删除产品:', product);
  };

  const handleAdd = () => {
    setCurrentProduct({ id: 0, name: '', category: '', price: 0 });
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProduct) {
      if (isCreating) {
        // 实现创建逻辑
        console.log('创建新产品:', currentProduct);
        setProducts([...products, { ...currentProduct, id: products.length + 1 }]);
      } else {
        // 实现更新逻辑
        console.log('更新产品:', currentProduct);
        setProducts(products.map(product => product.id === currentProduct.id ? currentProduct : product));
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">产品管理</h1>
      <div className="mb-4 flex justify-between items-center">
        <SearchBar onSearch={handleSearch} />
        <AddButton onClick={handleAdd} label="添加产品" />
      </div>
      <DataTable
        data={products}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isCreating ? "添加产品" : "编辑产品"}>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">名称</label>
            <input
              type="text"
              id="name"
              value={currentProduct?.name || ''}
              onChange={(e) => setCurrentProduct(curr => curr ? { ...curr, name: e.target.value } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">类别</label>
            <input
              type="text"
              id="category"
              value={currentProduct?.category || ''}
              onChange={(e) => setCurrentProduct(curr => curr ? { ...curr, category: e.target.value } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">价格</label>
            <input
              type="number"
              id="price"
              value={currentProduct?.price || ''}
              onChange={(e) => setCurrentProduct(curr => curr ? { ...curr, price: parseFloat(e.target.value) } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {isCreating ? "添加" : "保存更改"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProductManagement;