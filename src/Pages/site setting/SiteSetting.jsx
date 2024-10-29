import React, { useState } from 'react';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, User} from "@nextui-org/react";import { FiSettings } from 'react-icons/fi';
import { selectButton } from '../../Redux/Slice/Theme/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../Components/language-selector';
import { CiSettings } from 'react-icons/ci';
import { useQuery } from 'react-query';
import { ProfileGet } from '../../Core/Services/Api/Client/Profile';

const SiteSetting = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch();
  
    const handleColorSelect = (colorIndex) => {
      dispatch(selectButton(colorIndex));
      setIsOpen(false);
    }  

    const {i18n} = useTranslation()
    const language =[
    {code : "en" , lang : "English"},
    {code : "fa" , lang : "فارسی"},
    {code : "tr" , lang : "ترکی"}
    ]

    const changeLanguages = (lng) => {
        i18n.changeLanguage(lng);
    }


    return (
        <Dropdown
          showArrow
          radius="sm"
          classNames={{
            base: "before:bg-default-200", // change arrow background
            content: "p-0 border-small border-divider bg-background",
          }}
        >
          <DropdownTrigger>
            <button 
            className='cursor-pointer max-[710px]:w-[30px] max-[710px]:h-[30px] max-[625px]:left-[150px] max-[465px]:left-[120px] max-[394px]:w-7 max-[394px]:h-7 /*end responsive*/ profile border rounded-[15px] w-[45px] h-[30px] absolute left-[90px] bg-custom-gradient-Header shadow-custom-shadow'>
            <CiSettings className='m-auto' size={18} /></button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Custom item styles"
            disabledKeys={["profile"]}
            className="p-3"
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
              <DropdownItem
                isReadOnly
                key="theme"
                className="cursor-default"

              >
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
                  </select>
                }
              >
                تم
              </DropdownItem>
            </DropdownSection>  
    
            <DropdownSection aria-label="Help & Feedback">
              <DropdownItem key="logout">Log Out</DropdownItem>
            </DropdownSection> 
          </DropdownMenu>
        </Dropdown>
      );
    }

export default SiteSetting;
