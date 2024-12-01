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
  Skeleton,
  
} from "@nextui-org/react";
import { FaWallet } from "react-icons/fa";
import { useSelector } from "react-redux";
import WalletManagerModal from "./WalletManagerModal"; // کامپوننت جدید
import { CreateTractionById, getAllWallet, getTractionGetAll, getWalletById } from "../../../../../Core/Services/Api/Client/wallet";
import { useQuery, useQueryClient } from "react-query";
import { getItem, setItem } from "../../../../../Core/Services/common/storage.services";
import convertToJalali from "../../../../Common/TimeChanger/TimeToShamsi";


const Wallet = () => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [amount, setAmount] = useState(""); // مقدار ورودی برای افزایش موجودی

  const dark = useSelector((state) => state.darkMood);

  const userId = getItem("userId");
    const { data:allWallet } = useQuery({
      queryKey: ["getAllWallet"],
      queryFn: getAllWallet,
    });
    const filterWallet = allWallet
      ? allWallet?.data.data.filter(
          (el) => el.UserId == userId && el.IsActive != false
        )
      : "درحال بارگذاری";

setItem("walletId", filterWallet[0].id)


  const walletId = filterWallet[0]?.id;
  const id =  walletId ;
  
  const { data: response, isLoading } = useQuery({
    queryKey: ["getWalletById", id],
    queryFn: () => getWalletById(id),
    enabled: !!id,
    onSuccess:(data)=>{
      setItem("walletId", data?.data.data.id);
    }
  });
  // const fetchWalletById = async (id)=>{
  //   const res = await getWalletById(id)
  //   console.log(res.data.data)
  //   setResponse(res.data.data)
  // }

  // useEffect(()=>{
  //   fetchWalletById("67435ed4c688ef48df5ba51d");
  // },[])

  const {
    data: tractions,
    isLoading: isLoadTr,
    error: errTr,
  } = useQuery({
    queryKey: ["getWalletTractionById", id],
    queryFn: () => getTractionGetAll(id),
    enabled: !!id,
  });

  const transactions = tractions
    ? tractions?.data.data
        .filter((el) => el.WalletId == response?.data.data.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];



  console.log(tractions)

console.log(transactions);











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

  const handleAddCredit = async () => {
    const newTransaction = {
      walletId:response?.data.data.id,
      amount: Number(amount),
      title: "افزایش موجودی",
    };

    const res = await CreateTractionById(newTransaction);

    queryClient.invalidateQueries("getWalletById");
    queryClient.invalidateQueries("getWalletTractionById");
    setAmount(""); // پاک کردن مقدار ورودی
    onOpenChange(false); // بستن مودال
  };

  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className="w-full h-full p-4 "
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
        <div className="ml-6 flex flex-col justify-between h-full max-md:w-[60%] w-[30%] text-right">
          <div className="flex items-center gap-x-4 max-md:flex-col mb-4 max-md:gap-x-1">
            <h2 className="text-lg max-md:font-normal font-bold">
              موجودی کیف‌پول :
            </h2>
            {isLoading ? (
              <Skeleton height={30} width={120} />
            ) : (
              <p className="text-2xl mt-2">{response?.data.data.Cost} تومان</p>
            )}
          </div>
          <Button className="w-[40%] text-white bg-blue-600" onPress={onOpen}>
            افزایش اعتبار
          </Button>
        </div>
      </div>

      {/* نیمه پایینی: جدول تراکنش‌ها */}
      <div className="mt-6 w-full  ">
        <h3 className="text-xl font-bold mb-4">تراکنش‌های اخیر</h3>
        <div
          style={{ background: dark.bgHigh, color: dark.textLow }}
          className="shadow-md  max-h-[550px] overflow-auto  rounded-lg "
        >
          <table className="w-full relative  text-right border-collapse">
            <thead
              className="sticky top-0"
              style={{ background: dark.bgLow, color: dark.textHigh }}
            >
              <tr className="text-sm font-semibold">
                <th className="py-3 px-4">تاریخ</th>
                <th className="py-3 px-4">مبلغ</th>
                <th className="py-3 px-4">توضیحات</th>
              </tr>
            </thead>
            <tbody>

              {isLoadTr ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-3 px-4">
                      <Skeleton height={40} width={80} />
                    </td>
                    <td className="py-3 px-4">
                      <Skeleton height={40} width={100} />
                    </td>
                    <td className="py-3 px-4">
                      <Skeleton height={40} width={150} />
                    </td>
                  </tr>
                ))
              ) : transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t">
                    <td className="py-3 px-4">
                      {convertToJalali(transaction.date)}
                    </td>
                    <td
                      className={`py-3 px-4 ${
                        transaction.Cost > 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {transaction.Cost.toLocaleString()} تومان
                    </td>
                    <td className="py-3 px-4">{transaction.Title}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  {
                    errTr ?  <td colSpan="3" className="py-3 px-4 text-center">
                      تراکنشی موجود نیست
                      </td>
                  : null
                  }
                </tr>
              )}
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
        fetchWalletById={setActiveWallet}
        filterWallet={filterWallet}
      />
    </div>
  );
};

export default Wallet;
