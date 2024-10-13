import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import AddButton from '../components/AddButton';

interface Bill {
  id: number;
  billDate: string;
  contractNumber: string;
  employeeName: string;
  idNumber: string;
  serviceType: string;
  amount: number;
  remarks: string;
}

const BillManagement: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([
    { id: 1, billDate: '2023-05-01', contractNumber: 'CT001', employeeName: '张三', idNumber: '110101199001011234', serviceType: '咨询服务', amount: 5000, remarks: '首次咨询' },
    { id: 2, billDate: '2023-05-15', contractNumber: 'CT002', employeeName: '李四', idNumber: '310101199203033456', serviceType: '技术支持', amount: 8000, remarks: '紧急支持' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBill, setCurrentBill] = useState<Bill | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const columns = [
    { key: 'billDate', label: '账单日期' },
    { key: 'contractNumber', label: '合同编号' },
    { key: 'employeeName', label: '员工姓名' },
    { key: 'idNumber', label: '身份证号' },
    { key: 'serviceType', label: '服务类型' },
    { key: 'amount', label: '账单金额' },
    { key: 'remarks', label: '备注' },
  ];

  const handleSearch = (query: string) => {
    // 实现搜索逻辑
    console.log('搜索:', query);
    // 这里应该根据账单日期、合同编号和身份证号进行过滤
  };

  const handleEdit = (bill: Bill) => {
    setCurrentBill(bill);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const handleDelete = (bill: Bill) => {
    // 实现删除逻辑
    console.log('删除账单:', bill);
    setBills(bills.filter(b => b.id !== bill.id));
  };

  const handleAdd = () => {
    setCurrentBill({ id: 0, billDate: '', contractNumber: '', employeeName: '', idNumber: '', serviceType: '', amount: 0, remarks: '' });
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentBill) {
      if (isCreating) {
        // 实现创建逻辑
        console.log('创建新账单:', currentBill);
        setBills([...bills, { ...currentBill, id: bills.length + 1 }]);
      } else {
        // 实现更新逻辑
        console.log('更新账单:', currentBill);
        setBills(bills.map(bill => bill.id === currentBill.id ? currentBill : bill));
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">客户账单管理</h1>
      <div className="mb-4 flex justify-between items-center">
        <SearchBar onSearch={handleSearch} />
        <AddButton onClick={handleAdd} label="添加账单" />
      </div>
      <DataTable
        data={bills}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isCreating ? "添加账单" : "编辑账单"}>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label htmlFor="billDate" className="block text-sm font-medium text-gray-700">账单日期</label>
            <input
              type="date"
              id="billDate"
              value={currentBill?.billDate || ''}
              onChange={(e) => setCurrentBill(curr => curr ? { ...curr, billDate: e.target.value } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contractNumber" className="block text-sm font-medium text-gray-700">合同编号</label>
            <input
              type="text"
              id="contractNumber"
              value={currentBill?.contractNumber || ''}
              onChange={(e) => setCurrentBill(curr => curr ? { ...curr, contractNumber: e.target.value } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700">员工姓名</label>
            <input
              type="text"
              id="employeeName"
              value={currentBill?.employeeName || ''}
              onChange={(e) => setCurrentBill(curr => curr ? { ...curr, employeeName: e.target.value } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">身份证号</label>
            <input
              type="text"
              id="idNumber"
              value={currentBill?.idNumber || ''}
              onChange={(e) => setCurrentBill(curr => curr ? { ...curr, idNumber: e.target.value } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">服务类型</label>
            <input
              type="text"
              id="serviceType"
              value={currentBill?.serviceType || ''}
              onChange={(e) => setCurrentBill(curr => curr ? { ...curr, serviceType: e.target.value } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">账单金额</label>
            <input
              type="number"
              id="amount"
              value={currentBill?.amount || ''}
              onChange={(e) => setCurrentBill(curr => curr ? { ...curr, amount: parseFloat(e.target.value) } : null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">备注</label>
            <textarea
              id="remarks"
              value={currentBill?.remarks || ''}
              onChange={(e) => setCurrentBill(curr => curr ? { ...curr, remarks: e.target.value } : null)}
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

export default BillManagement;