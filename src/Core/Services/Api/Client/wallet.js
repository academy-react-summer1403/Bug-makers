import axios from "axios";
import { getItem } from "../../common/storage.services";


export const getAllWallet = async () => {
  try {
    let url = "https://taharahimycode.liara.run/wallet/getAll";
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getWalletById = async (id) => {
  try {
    let url = `https://taharahimycode.liara.run/wallet/getById/${id}`;
    const response = await axios.get(url);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteWalletById = async (id) => {
  try {
    let url = `https://taharahimycode.liara.run/wallet/delete/${id}`;
    const response = await axios.delete(url);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getTractionGetAll = async (id) => {
  try {
    let url = `https://taharahimycode.liara.run/wallet/Traction/getAll`;
    const response = await axios.get(url);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const CreateTractionById = async (id) => {
  try {
    let url = `https://taharahimycode.liara.run/wallet/Traction/create`;
    const response = await axios.post(url, {
      WalletId: `${id.walletId}`,
      Cost: id.amount,
      Title: `${id.title}`,
      Serial: "222",
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const CreateWallet = async (id) => {
  try {
    let url = `https://taharahimycode.liara.run/wallet/create`;
    const response = await axios.post(url, {
      
        UserId: `${id.UserId}`,
        UserName: id.UserName,
        Password: id.Password,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const activeWalletApi = async (id) => {
  try {
    let url = `https://taharahimycode.liara.run/wallet/active/access/${id}`;
    const response = await axios.post(url, {
      code: `0000`,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
