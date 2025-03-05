"use client";

import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setFilter } from "@/lib/redux/slice/membersSlice";

interface FilterInterface {
  data: any[];
  title: string;
  filterName: string;
  capitalize?: boolean;
  type?: "date" | "status";
  setValue: () => void;
}

export default function Filters({
  data = [],
  title = "",
  filterName,
  // capitalize = false,
  type,
}: FilterInterface) {
  const dispatch = useAppDispatch();
  const [dateValue, setDateValue] = useState({
    startDate: null,
    endDate: null,
  });

  const onFilterChange = (value: string) => {
    // let updatedValue = "";
    // updatedValue = capitalize ? value.toUpperCase() : value;
    dispatch(setFilter({ filterName, value }));
  };

  if (type === "status") {
    return (
      <div className="dropdown dropdown-start">
        <button className="join-item btn btn-outline h-7 border text-[#7A7A7A] border-neutral-600 bg-[#0A1117]">
          {title} <MdKeyboardArrowDown size={20} />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-[#0B1D26] rounded-box z-1 w-full p-2 shadow-sm"
        >
          {data.map((item, index: number) => {
            return (
              <li key={index}>
                <a
                  className="text-white hover:bg-gray-700"
                  onClick={() => onFilterChange(item)}
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (type === "date") {
    return (
      <div className="dropdown dropdown-top dropdown-end">
        <button className="join-item btn btn-outline border text-[#7A7A7A] border-neutral-600 hover:text-black">
          {title} <MdKeyboardArrowDown size={20} />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-[#0B1D26] rounded-box z-1 w-full p-2 shadow-sm"
        >
          <Datepicker
            value={dateValue}
            onChange={(newValue) => setDateValue(newValue)}
          />
        </ul>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-start">
      <button className="join-item btn btn-outline h-7 border text-[#7A7A7A] border-neutral-600 bg-[#0A1117]">
        {title} <MdKeyboardArrowDown size={20} />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-[#0A1117] rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {data.map((item, index: number) => {
          return (
            <li key={index}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm border rounde-box border-white "
                />
                <a className="text-[#FBBD2C] hover:bg-gray-700">{item}</a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
