import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Switch,
} from "@nextui-org/react";
import { FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../Components/language-selector";
import { CiSettings } from "react-icons/ci";
import { selectButton, selectdark } from "../../Redux/Slice/darkMood/darkMood";
import { SunIcon } from "./sunIcon";
import { MoonIcon } from "./moonIcon";
import { removeLoginToken, setLoginToken } from "../../Redux/Slice/Login/Login";
import { removeItem } from "../../Core/Services/common/storage.services";
import toast from "react-hot-toast";


const SiteSetting = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const dark = useSelector((state) => state.darkMood);
  const [theme, setTheme] = useState(dark.selectedDark);

  const handleColorSelect = (colorIndex) => {
    dispatch(selectButton(colorIndex));
    setIsOpen(false);
  };

  const language = [
    { code: "en", lang: "English" },
    { code: "fa", lang: "فارسی" },
    { code: "tr", lang: "ترکی" },
  ];

  const changeLanguages = (lng) => {
    i18n.changeLanguage(lng);
  };

  const changeTheme = () => {
    dispatch(selectdark(theme));
  };

  useEffect(() => {
    changeTheme();
  }, [theme]);

  const handleThemeChange = () => {
    setTheme(theme === 1 ? 0 : 1);
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  return (
    <Dropdown
      isOpen={isOpen}
      showArrow
      radius="sm"
      classNames={{
        base: "before:bg-default-200",
        content: "p-0 border-small border-divider bg-background",
      }}
    >
      <DropdownTrigger>
        <button
          onClick={() => {
            isOpen == true ? setIsOpen(false) : setIsOpen(true);
          }}
          className="step4 cursor-pointer max-[710px]:w-[30px] max-[710px]:h-[30px] max-[625px]:left-[150px] max-[465px]:left-[120px] max-[394px]:w-7 max-[394px]:h-7 profile border rounded-[15px] w-[45px] h-[30px] absolute left-[90px] shadow-xl"
        >
          <CiSettings className="m-auto" size={18} />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        style={{
          background: dark.bgLow,
          color: dark.textHigh,
        }}
        aria-label="Custom item styles"
        disabledKeys={["profile"]}
        className="p-3 border rounded-md"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection aria-label="Preferences" showDivider>
          <DropdownItem isReadOnly key="language" className="cursor-default">
            <LanguageSelector />
          </DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Preferences" showDivider>
          <DropdownItem
            isReadOnly
            key="theme"
            className="cursor-default"
            endContent={
              <select
                className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                id="theme"
                name="theme"
              >
                <option onClick={() => handleColorSelect(0)}>آبی</option>
                <option onClick={() => handleColorSelect(1)}>سبز</option>
                <option onClick={() => handleColorSelect(2)}>زرد</option>
                <option onClick={() => handleColorSelect(3)}>قرمز</option>
              </select>
            }
          >
            تم
          </DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Dark">
          <DropdownItem onClick={handleThemeChange} key="Dark">
            {theme === 1 ? "روشن" : "تیره"}

            <Switch
              className="mr-[30%]"
              defaultSelected={theme === 1 ? true : false}
              size="lg"
              color="secondary"
              onClick={handleThemeChange}
              thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                  <SunIcon className={className} />
                ) : (
                  <MoonIcon className={className} />
                )
              }
            ></Switch>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem
            key="logout"
            onClick={() => {
              toast.success("با موفقیت از اکانت خود خارج شدید");
              removeItem("token");

              dispatch(removeLoginToken());
            }}
          >
            خروج
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SiteSetting;
