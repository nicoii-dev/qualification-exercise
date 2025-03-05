"use client";

import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

interface SearchInterface {
  title: string;
  tableSearch: (value: string) => void;
  clearText: () => void;
  setSelected: (value: string) => void;
}
export default function SearchComponent({
  title = "",
  tableSearch,
  clearText,
  setSelected
}: SearchInterface) {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (tableSearch) tableSearch(searchText);
  }, [searchText, tableSearch]);

  return (
    <label className="flex input justify-center items-center border-[#7A7A7A] bg-[#0A1117]">
      <input
        type="text"
        required
        value={searchText}
        placeholder={`Search ${title}`}
        className="text-[#C2C2C2]"
        onChange={(e) => setSearchText(e.target.value)}
      />
      {searchText.length > 0 ? (
        <IoClose
          color="white"
          size={25}
          onClick={() => {
            clearText();
            setSearchText("")
            setSelected("")
          }}
        />
      ) : null}
      <svg
        className="h-[1em] opacity-50 text-[#C2C2C2] "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
    </label>
  );
}
