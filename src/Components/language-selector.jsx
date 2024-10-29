import { button } from '@nextui-org/react';
import { changeLanguage } from 'i18next';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {

    const {i18n} = useTranslation()
    const language =[
    {code : "en" , lang : "English"},
    {code : "fa" , lang : "فارسی"},
    {code : "tr" , lang : "ترکی"}
    ]

    const changeLanguages = (lng) => {
        i18n.changeLanguage(lng);
    }


    
  return <div className='btn-container flex justify-center items-center gap-3'>
    {
        language.map((lng) => {
            return (
                <button 
                    className={`${lng.code === i18n.language ? 'text-blue-600' : ''}`}
                    key={lng.code} 
                    onClick={() => changeLanguages(lng.code)}
                    >
                {lng.lang}
                </button>
                ) 
        })
    }

  </div>;
  
}

export default LanguageSelector