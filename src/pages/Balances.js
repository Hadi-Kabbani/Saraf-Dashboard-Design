import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FiEdit2 } from 'react-icons/fi'; // Pencil icon for changing exchange rate

function Balance() {
  const transactions = useSelector((state) => state.transactions.transactions);
  const lastTransaction = transactions.length > 0 ? transactions[transactions.length - 1] : null;
  const initialUsdBalance = lastTransaction ? lastTransaction.PaymentAmountUs : 1000;
  const initialLbpBalance = lastTransaction ? lastTransaction.PaymentAmountLb : 15000000;
  const initialExchangeRate = lastTransaction ? lastTransaction.exchangeRateLb : 15000;

  const [exchangeRate, setExchangeRate] = useState(initialExchangeRate);
  const [usdBalance, setUsdBalance] = useState(initialUsdBalance);
  const [lbpBalance, setLbpBalance] = useState(initialLbpBalance);
  const [capital, setCapital] = useState(20000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExchangeRate, setNewExchangeRate] = useState(exchangeRate);

  useEffect(() => {
    setLbpBalance(exchangeRate * usdBalance);
  }, [exchangeRate, usdBalance]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleExchangeRateChange = () => {
    setExchangeRate(newExchangeRate);
    toggleModal();
  };

  return (
    <div className="layout bg-gray-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">ميزان</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="flex items-center justify-between">
          <label className="text-xl font-semibold text-gray-700">
            سعر الصرف:
            <span className="ml-2 text-blue-600">{exchangeRate.toLocaleString()}</span>
          </label>
          <button
            onClick={toggleModal}
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            <FiEdit2 className="mr-2" /> تغيير
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full table-fixed border-2 border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">رصيد دولار</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">رصيد لبناني</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">نوع الرصيد</th>
            </tr>
          </thead>
          <tbody>
            {['رصيد دولار', 'رصيد لبناني', 'رأس مال', 'ربح'].map((type, index) => (
              <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} key={type}>
                <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                  {usdBalance.toLocaleString()} USD
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                  {lbpBalance.toLocaleString()} LBP
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium text-gray-900 bg-gray-100 ">{type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">تغيير سعر الصرف</h2>
              <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700">&times;</button>
            </div>
            <input
              type="number"
              value={newExchangeRate}
              onChange={(e) => setNewExchangeRate(Number(e.target.value))}
              className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleExchangeRateChange}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                تحديث
              </button>
              <button
                onClick={toggleModal}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Balance;
