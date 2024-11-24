import React, { useEffect, useState } from "react";
import {
  Modal,
  Input,
  Button,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
} from "@nextui-org/react";
import { FaWallet } from "react-icons/fa";
import { useSelector } from "react-redux";
import WalletManagerModal from "./WalletManagerModal"; // کامپوننت جدید
import { getWalletById } from "../../../../../Core/Services/Api/Client/wallet";
import { useQuery } from "react-query";

const Wallet = () => {
  const [balance, setBalance] = useState(150000); // موجودی اولیه
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const[response,setResponse]=useState({})
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2024-11-20", amount: 50000, title: "افزایش موجودی" },
    { id: 2, date: "2024-11-18", amount: -20000, title: "خرید محصول" },
    { id: 3, date: "2024-11-15", amount: 100000, title: "افزایش موجودی" },
  ]);
  const [amount, setAmount] = useState(""); // مقدار ورودی برای افزایش موجودی

  const dark = useSelector((state) => state.darkMood);


  const fetchWalletById = async (id)=>{
    const res = await getWalletById(id)
    console.log(res.data.data)
    setResponse(res.data.data)
  }

  useEffect(()=>{
    fetchWalletById("67435ed4c688ef48df5ba51d");
  },[])















  // مدیریت کیف‌پول‌ها
  const [wallets, setWallets] = useState([
    { id: 1, name: "کیف‌پول اصلی", password: "12345" },
  ]);
  const [activeWallet, setActiveWallet] = useState(wallets[0]);

  // کنترل مودال مدیریت کیف‌پول‌ها
  const {
    isOpen: isManagerOpen,
    onOpen: onManagerOpen,
    onOpenChange: onManagerOpenChange,
  } = useDisclosure();

  const handleAddCredit = () => {
    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().slice(0, 10),
      amount: Number(amount),
      title: "افزایش موجودی",
    };

    setTransactions([newTransaction, ...transactions]);
    setBalance(balance + Number(amount));
    setAmount(""); // پاک کردن مقدار ورودی
    onOpenChange(false); // بستن مودال
  };

  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className="w-full h-full p-4"
    >
      {/* نیمه بالایی */}
      <div
        style={{ background: dark.bgLow, color: dark.textHigh }}
        className="flex flex-row-reverse items-center justify-between w-full p-6 rounded-lg shadow-md"
      >
        {/* ایکون کیف پول */}
        <Tooltip content="جابه جایی بین کیف پول ها">
          <div onClick={onManagerOpen} className="cursor-pointer">
            <FaWallet
              className={`text-blue-500 text-8xl 
            ${dark.selectedButton === 0 ? "text-blue-600" : ""} 
                  ${dark.selectedButton === 1 ? "text-green-600" : ""} 
                  ${dark.selectedButton === 2 ? "text-yellow-600" : ""} 
                  ${dark.selectedButton === 3 ? "text-red-600" : ""}`}
            />
          </div>
        </Tooltip>

        {/* موجودی کیف پول */}
        <div className="ml-6 flex flex-col justify-between h-full w-[30%] text-right">
          <div className="flex items-center gap-x-4 mb-4">
            <h2 className=" text-lg font-bold">موجودی کیف‌پول :</h2>
            <p className=" text-2xl mt-2">{response.Cost} تومان</p>
          </div>
          {/* دکمه افزایش اعتبار */}
          <Button
            className={`w-[40%] text-white
            ${dark.selectedButton === 0 ? "bg-blue-600" : ""} 
                  ${dark.selectedButton === 1 ? "bg-green-600" : ""} 
                  ${dark.selectedButton === 2 ? "bg-yellow-600" : ""} 
                  ${dark.selectedButton === 3 ? "bg-red-600" : ""}`}
            onPress={onOpen}
          >
            افزایش اعتبار
          </Button>
        </div>
      </div>

      {/* نیمه پایینی: جدول تراکنش‌ها */}
      <div className="mt-6 w-full">
        <h3 className="text-xl font-bold mb-4">تراکنش‌های اخیر</h3>
        <div
          style={{ background: dark.bgHigh, color: dark.textLow }}
          className="shadow-md rounded-lg overflow-hidden"
        >
          <table className="w-full text-right border-collapse">
            <thead style={{ background: dark.bgLow, color: dark.textHigh }}>
              <tr className="text-sm font-semibold">
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
        style={{ background: dark.bgHigh, color: dark.textHigh }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                افزایش موجودی
              </ModalHeader>
              <ModalBody>
                {/* ورودی مقدار افزایش موجودی */}
                <Input
                  className={dark.input}
                  type="number"
                  label="مبلغ"
                  placeholder="مقدار مبلغ را وارد کنید"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth
                />
              </ModalBody>
              <ModalFooter>
                {/* دکمه‌ها */}
                <Button color="danger" variant="light" onPress={onClose}>
                  انصراف
                </Button>
                <Button
                  className={`text-white ${
                    dark.selectedButton === 0 ? "bg-blue-600" : ""
                  } 
                  ${dark.selectedButton === 1 ? "bg-green-600" : ""} 
                  ${dark.selectedButton === 2 ? "bg-yellow-600" : ""} 
                  ${dark.selectedButton === 3 ? "bg-red-600" : ""}`}
                  onPress={() => {
                    handleAddCredit();
                  }}
                >
                  افزایش اعتبار
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* مودال مدیریت کیف‌پول‌ها */}
      <WalletManagerModal
        isOpen={isManagerOpen}
        onOpenChange={onManagerOpenChange}
        wallets={wallets}
        setWallets={setWallets}
        activeWallet={activeWallet}
        setActiveWallet={setActiveWallet}
        fetchWalletById={fetchWalletById}
      />
    </div>
  );
};

export default Wallet;
