"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import {
  setFilter,
  setHasNextPage,
  setMembers,
} from "@/lib/redux/slice/membersSlice";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";
import SearchComponent from "../search";
import { useLazyGetMembersByMobileNumberQuery } from "@/lib/redux/api-slice/membersApiSlice";
import mapMembers, { memberInterface } from "@/lib/hooks/mapMembers";
import { FilterInterface } from "./NameFilter";

export default function MobileFilter({ refetch, setRenderKey }: FilterInterface) {
  const dispatch = useDispatch();
  const { members } = useAppSelector((state: any) => state.membersData);
  const [search, setSearch] = useState("");

  const [selectedNumber, setSelectedNumber] = useState<string>();

  // query
  const [getMemberByNumber] = useLazyGetMembersByMobileNumberQuery();

  const onMobileSelected = (value: string) => {
    if (value !== selectedNumber) {
      setSelectedNumber(value);
      dispatch(setFilter({ mobileNumber: { equal: value } }));
      return;
    }
    setSelectedNumber("");
    if (search.length <= 0) {
      dispatch(setFilter(null));
    }
  };

  const memberDataHandler = useCallback(async () => {
    if (search.length > 0) {
      const { data } = await getMemberByNumber({ search: search });
      dispatch(
        setMembers(
          mapMembers(
            data?.data?.membersByMobileNumber?.map((data: memberInterface) => {
              return {
                node: data,
                cursor: "",
              };
            })
          )
        )
      );
      dispatch(setHasNextPage(false));
    }
  }, [dispatch, getMemberByNumber, search]);

  useEffect(() => {
    memberDataHandler();
  }, [memberDataHandler]);

  // for manual refetching
  const clearText = async () => {
    await refetch();
    dispatch(setFilter(null));
    setRenderKey((prevKey: number) => prevKey + 1);
    setSearch("");
  };

  const debounceSearch = _.debounce((value) => {
    setSearch(value);
  }, 1000);

  return (
    <div className="dropdown dropdown-start">
      <button className="join-item text-nowrap btn btn-outline h-7 border text-[#7A7A7A] border-neutral-600 bg-[#0A1117]">
        Mobile Number <MdKeyboardArrowDown size={20} />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-[#0A1117] rounded-box z-1 min-w-52 w-fit p-2 shadow-sm"
      >
        <li>
          <SearchComponent
            title="Name"
            tableSearch={(query) => {
              debounceSearch(query);
            }}
            clearText={clearText}
            setSelected={setSelectedNumber}
          />
        </li>
        {members?.map((item: { mobileNumber: string }, index: number) => {
          if (item.mobileNumber !== "N/A") {
            return (
              <li key={index}>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm border rounde-box border-white text-white "
                    onChange={() => onMobileSelected(item.mobileNumber)}
                    checked={selectedNumber === item.mobileNumber}
                  />
                  <a className="text-[#FBBD2C] hover:bg-gray-700">
                    {item.mobileNumber}
                  </a>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
