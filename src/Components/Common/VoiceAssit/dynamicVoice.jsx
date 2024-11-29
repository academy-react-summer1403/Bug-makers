import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiMic } from 'react-icons/fi'; // اضافه کردن آیکون میکروفن از react-icons
import { useNavigate } from 'react-router-dom';

const DynamicVoiceWizard = () => {
  const [step, setStep] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);
  const [customNames, setCustomNames] = useState({}); 
  const [isListening, setIsListening] = useState(false); 
  const [isRecordingDone, setIsRecordingDone] = useState(false); 
  const [recordingTime, setRecordingTime] = useState(5); 
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (step === 5) {
      const storedTags = JSON.parse(localStorage.getItem('selectedTags')) || [];
      const storedCustomNames = JSON.parse(localStorage.getItem('customNames')) || {};
      setSelectedTags(storedTags);
      setCustomNames(storedCustomNames);
    }
  }, [step]);

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleTagSelection = (tag) => {
    let updatedTags = [...selectedTags];
    if (updatedTags.includes(tag)) {
      updatedTags = updatedTags.filter((item) => item !== tag);
    } else {
      updatedTags.push(tag);
    }
    setSelectedTags(updatedTags);
    localStorage.setItem('selectedTags', JSON.stringify(updatedTags));
  };

  const handleCustomNameChange = (tag, name) => {
    if (name.length > 15) {
      setErrorMessage('نام باید حداکثر 15 کاراکتر باشد.');
      return;
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      setErrorMessage('نام باید فقط شامل حروف انگلیسی باشد.');
      return;
    } else {
      setErrorMessage('');
    }

    const updatedNames = { ...customNames, [tag]: name };
    setCustomNames(updatedNames);
    localStorage.setItem('customNames', JSON.stringify(updatedNames));
  };

  const toggleListening = () => {
    setIsListening(true);
    setRecordingTime(5); 
    setIsRecordingDone(false); 
    setErrorMessage(''); 

    setTimeout(() => {
      setIsListening(false);
      setIsRecordingDone(true);
      nextStep(); 
    }, 5000);
  };

  useEffect(() => {
    if (isListening && recordingTime > 0) {
      const timer = setInterval(() => {
        setRecordingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isListening, recordingTime]);

  const navigate = useNavigate()
  const lastSubmit = () => {
    navigate('/')
    toast.success('صداتو ضبط کردم')
  }
  return (
    <div className="max-w-4xl mx-auto p-8   bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">فرم ویزارد اضافه کردن شورتکات</h2>

      <div className="step-content">
        {step === 1 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">مرحله 1: شروع</h3>
            <p className="mb-4">برای شروع، لطفاً به مرحله بعد بروید.</p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
              onClick={nextStep}
            >
              ادامه دادن
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">مرحله 2: انتخاب شورتکات‌ها</h3>
            <p className="mb-4">لطفاً شورتکات‌های خود را انتخاب کنید.</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {['ClientPanel/dashbord', 'ClientPanel/MyReserve', 'شورتکات 3', 'شورتکات 4'].map((tag) => (
                <div
                  key={tag}
                  onClick={() => handleTagSelection(tag)}
                  className={`cursor-pointer py-2 px-4 rounded text-center border ${selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  {tag}
                </div>
              ))}
            </div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
              onClick={nextStep}
            >
              مرحله بعد
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mt-2 w-full"
              onClick={prevStep}
            >
              مرحله قبلی
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">مرحله 3: تعیین نام دینامیک</h3>
            <p className="mb-4">لطفاً برای هر تگ، یک نام انحصاری وارد کنید.</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {selectedTags.map((tag) => (
                <div key={tag}>
                  <label className="block text-gray-700">{tag}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded mt-2"
                    placeholder="نام انحصاری برای این تگ"
                    onChange={(e) => handleCustomNameChange(tag, e.target.value)}
                    value={customNames[tag] || ''}
                  />
                </div>
              ))}
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
              onClick={nextStep}
            >
              مرحله بعد
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mt-2 w-full"
              onClick={prevStep}
            >
              مرحله قبلی
            </button>
          </div>
        )}

            {step === 4 && (
            <div>
                <h3 className="text-xl font-semibold mb-4">مرحله 4: ضبط صدا</h3>
                <p className="mb-4">برای شروع ضبط، روی دکمه میکروفن کلیک کنید.</p>
                <div className="flex justify-center mb-4">
                {/* آیکون میکروفن با هاله آبی در هنگام ضبط */}
                <FiMic
                    size={50}
                    className={`cursor-pointer ${isListening ? 'text-blue-500 animate-pulse' : 'text-gray-700'}`} // هاله آبی هنگام ضبط
                />
                </div>
                <button
                className={`px-4 py-2 ${isListening ? 'bg-red-500' : 'bg-blue-500'} text-white rounded hover:bg-blue-600 w-full`}
                onClick={toggleListening}
                disabled={isRecordingDone}
                >
                {isListening ? 'در حال ضبط...' : 'شروع ضبط'}
                </button>
                {isRecordingDone && (
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full mt-4"
                    onClick={nextStep}
                >
                    مرحله بعد
                </button>
                )}
            </div>
            )}
        {step === 5 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">مرحله 5: نمایش شورتکات‌ها</h3>
            <p className="mb-4">شورتکات‌ها و نام‌های دینامیک انتخاب شده:</p>
            {selectedTags.length === 0 ? (
              <p className="text-sm text-gray-500">هیچ شورتکاتی انتخاب نشده است.</p>
            ) : (
              <ul className="list-disc pl-5">
                {selectedTags.map((tag, index) => (
                  <li key={index} className="text-gray-700">
                    <strong>{tag}:</strong> {customNames[tag] || 'نام انحصاری وارد نشده'}
                  </li>
                ))}
              </ul>
            )}
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full"
              onClick={lastSubmit}
            >
              تأیید و ذخیره
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mt-2 w-full"
              onClick={prevStep}
            >
              مرحله قبلی
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicVoiceWizard;
