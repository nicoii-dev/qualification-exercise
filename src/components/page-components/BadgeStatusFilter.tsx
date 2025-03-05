"use client"

import { setFilter } from "@/lib/redux/slice/membersSlice";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";

export default function BadgeStatusFilter() {
    const dispatch = useDispatch();
    const status = ["active", "blacklisted", "disabled", "deleted", "suspended"]

    const onFilterChange = (value: string) => {
        dispatch(setFilter({ status: { equal: value.toUpperCase() } }));
      };

  return (
    <div className="dropdown dropdown-start">
      <button className="join-item btn btn-outline h-7 border text-[#7A7A7A] border-neutral-600 bg-[#0A1117]">
        Status <MdKeyboardArrowDown size={20} />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-[#0B1D26] rounded-box z-1 w-full p-2 shadow-sm"
      >
        {status.map((item, index: number) => {
          return (
            <li key={index}>
              <a
                className="text-white hover:bg-gray-700 capitalize"
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
