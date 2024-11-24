import React, { useState } from "react";
import { Modal, Input, Button } from "@nextui-org/react";
import { FaWallet } from "react-icons/fa";

const Wallet = () => {
  const [balance, setBalance] = useState(150000); // موجودی اولیه
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2024-11-20", amount: 50000, title: "افزایش موجودی" },
    { id: 2, date: "2024-11-18", amount: -20000, title: "خرید محصول" },
    { id: 3, date: "2024-11-15", amount: 100000, title: "افزایش موجودی" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");

  // تابع افزودن اعتبار
  const handleAddCredit = () => {
    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().slice(0, 10),
      amount: Number(amount),
      title: "افزایش موجودی",
    };

    setTransactions([newTransaction, ...transactions]);
    setBalance(balance + Number(amount));
    setAmount("");
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* نیمه بالایی */}
      <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
        {/* ایکون کیف پول */}
        <div className="flex-shrink-0">
          <FaWallet className="text-blue-500 text-8xl" />
        </div>

        {/* موجودی کیف پول */}
        <div className="ml-6 flex-grow text-right">
          <h2 className="text-gray-800 text-2xl font-bold">موجودی کیف پول</h2>
          <p className="text-gray-500 text-lg mt-2">
            {balance.toLocaleString()} تومان
          </p>
          {/* دکمه افزایش اعتبار */}
          <div
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
            onClick={() => setIsModalOpen(true)}
          >
            افزایش اعتبار
          </div>
        </div>
      </div>

      {/* نیمه پایینی: جدول تراکنش‌ها */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-gray-700 mb-4">
          تراکنش‌های اخیر
        </h3>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm font-semibold">
                <th className="py-3 px-4">تاریخ</th>
                <th className="py-3 px-4">مبلغ</th>
                <th className="py-3 px-4">توضیحات</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-t">
                  <td className="py-3 px-4">{transaction.date}</td>
                  <td
                    className={`py-3 px-4 ${
                      transaction.amount > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {transaction.amount.toLocaleString()} تومان
                  </td>
                  <td className="py-3 px-4">{transaction.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* مودال افزایش اعتبار */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeButton
      >
        <Modal.Header>
          <h2 className="text-lg font-bold">افزایش موجودی</h2>
        </Modal.Header>
        <Modal.Body>
          <Input
            fullWidth
            type="number"
            label="مبلغ"
            placeholder="مقدار مبلغ را وارد کنید"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => setIsModalOpen(false)}>
            انصراف
          </Button>
          <Button auto onPress={handleAddCredit}>
            تایید
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Wallet;
