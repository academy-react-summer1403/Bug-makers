import React, { useState } from "react";
import Slider from "react-slider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Input, Button, Select, SelectItem } from "@nextui-org/react";

const Filters = () => {
  // State management for date picker modal
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // State for slider (price range)
  const [priceRange, setPriceRange] = useState([1000000, 10000000]);

  // State for instructor selection
  const [selectedInstructor, setSelectedInstructor] = useState("");

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end || start); // If no end date, use the start date
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Price Slider */}
      <div className="flex items-center">
        <span className="ml-2 text-sm text-gray-500">قیمت</span>
        <Slider
          className="ml-4 w-40"
          value={priceRange}
          onChange={(value) => setPriceRange(value)}
          min={1000000}
          max={10000000}
          step={100000}
          thumbClassName="bg-yellow-500 h-4 w-4 rounded-full"
          trackClassName="bg-gray-300 h-1"
          renderThumb={(props, state) => <div {...props}></div>}
        />
        <span className="ml-4 text-sm text-gray-500">
          {priceRange[0].toLocaleString()} تا {priceRange[1].toLocaleString()}{" "}
          تومان
        </span>
      </div>

      {/* Instructor Dropdown */}
      <div className="ml-8 w-40">
        <Select
          placeholder="اساتید"
          value={selectedInstructor}
          onChange={(e) => setSelectedInstructor(e.target.value)}
          fullWidth
        >
          <SelectItem value="محسن اسفندیاری">محسن اسفندیاری</SelectItem>
          <SelectItem value="استاد دیگری">استاد دیگری</SelectItem>
        </Select>
      </div>

      {/* Date Picker Modal Trigger */}
      <div className="ml-8">
        <Button
          auto
          flat
          onClick={() => setIsDateModalOpen(true)}
          className="bg-gray-200"
        >
          {startDate ? startDate.toLocaleDateString("fa-IR") : ""} -{" "}
          {endDate ? endDate.toLocaleDateString("fa-IR") : ""}
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center ml-8">
        <Input clearable placeholder="جستجو دوره" width="200px" />
        <Button auto flat className="bg-yellow-500 ml-2">
          جستجو
        </Button>
      </div>

      {/* Date Picker Modal */}
      <Modal
        closeButton
        aria-labelledby="date-picker-modal"
        open={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
      >
        <Modal.Header>
          <h3>انتخاب تاریخ</h3>
        </Modal.Header>
        <Modal.Body>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            dateFormat="yyyy/MM/dd"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat onClick={() => setIsDateModalOpen(false)}>
            تایید
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Filters;
