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
import { useLazyGetMembersByDomainQuery } from "@/lib/redux/api-slice/membersApiSlice";
import mapMembers, { memberInterface } from "@/lib/hooks/mapMembers";
import { FilterInterface } from "./NameFilter";

export default function DomainFilter({ refetch, setRenderKey }: FilterInterface) {
  const dispatch = useDispatch();
  const { members } = useAppSelector((state: any) => state.membersData);

  // query
  const [getMemberByDomain] = useLazyGetMembersByDomainQuery();

  const [search, setSearch] = useState("");

  const [selectedDomain, setSelectedDomain] = useState<string>("");

  const onDomainSelected = (id: string, domain: string) => {
    if (id !== selectedDomain) {
      setSelectedDomain(id);
      dispatch(setFilter({ domain: { equal: domain } }));
      return;
    }
    setSelectedDomain("");
    if (search.length <= 0) {
      dispatch(setFilter(null));
    }
  };

  const memberDataHandler = useCallback(async () => {
    if (search.length > 0) {
      const { data } = await getMemberByDomain({ search: search });
      dispatch(
        setMembers(
          mapMembers(
            data?.data?.membersByDomain?.map((data: memberInterface) => {
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
  }, [dispatch, getMemberByDomain, search]);

  useEffect(() => {
    memberDataHandler();
  }, [memberDataHandler]);

  // for manual refetching
  const clearText = async () => {
    await refetch();
    dispatch(setFilter(null));
    setRenderKey((prevKey: number) => prevKey + 1);
  };

  const debounceSearch = _.debounce((value) => {
    setSearch(value);
  }, 1000);

  return (
    <div className="dropdown dropdown-start">
      <button className="join-item text-nowrap btn btn-outline h-7 border text-[#7A7A7A] border-neutral-600 bg-[#0A1117]">
        Domain <MdKeyboardArrowDown size={20} />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-[#0A1117] rounded-box z-1 min-w-52 w-fit p-2 shadow-sm"
      >
        <li>
          <SearchComponent
            title="Search Domain"
            tableSearch={(query) => {
              debounceSearch(query);
            }}
            clearText={clearText}
            setSelected={setSelectedDomain}
          />
        </li>
        {members?.map((item: { id: string; domain: string }, index: number) => {
          if (item.domain !== "N/A") {
            return (
              <li key={index}>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm border rounde-box border-white text-white "
                    onChange={() => onDomainSelected(item.id, item.domain)}
                    checked={selectedDomain === item.id}
                  />
                  <a className="text-[#FBBD2C] hover:bg-gray-700">
                    {item.domain}
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
