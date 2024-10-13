import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import AddButton from '../components/AddButton';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员' },
    { id: 2, name: '李四', email: 'lisi@example.com', role: '用户' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const columns = [
    { key: 'name', label: '姓名' },
    { key: 'email', label: '邮箱' },
    { key: 'role', label: '角色' },
  ];

  const handleSearch = (query: string) => {
    // 实现搜索逻辑
    console.log('搜索:', query);
  };

  const handleEdit = (user: User) => {
    setCurrentUser(user);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const handleDelete = (user: User) => {
    // 实现删除逻辑
    console.log('删除用户:', user);
  };

  const handleAdd = () => {
    setCurrentUser({ id: 0, name: '', email: '', role: '用户' });
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      if (isCreating) {
        // 实现创建逻辑
        console.log('创建新用户:', currentUser);
        setUsers([...users, { ...currentUser, id: users.length + 1 }]);
      } else {
        // 实现更新逻辑
        console.log('更新用户:', currentUser);
        setUsers(users.map(user => user.id === currentUser.id ? currentUser : user));
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">用户管理</h1>
      <div className="mb-4 flex justify-between items-center">
        <SearchBar onSearch={handleSearch} />
        <AddButton onClick={handleAdd} label="添加用户" />
      </div>
      <DataTable
        data={users}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isCreating ? "添加用户" : "编辑用户"}>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">姓名</label>
            <input
              type="text"
              id="name"
              value={currentUser?.name || ''}
              onChange={(e) => setCurrentUser(curr => curr ? { ...curr, name: e.target.value } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">邮箱</label>
            <input
              type="email"
              id="email"
              value={currentUser?.email || ''}
              onChange={(e) => setCurrentUser(curr => curr ? { ...curr, email: e.target.value } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">角色</label>
            <select
              id="role"
              value={currentUser?.role || ''}
              onChange={(e) => setCurrentUser(curr => curr ? { ...curr, role: e.target.value } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="管理员">管理员</option>
              <option value="用户">用户</option>
            </select>
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

export default UserManagement;