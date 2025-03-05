"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import {
  setFilter,
  setHasNextPage,
  setMembers,
} from "@/lib/redux/slice/membersSlice";
import { useCallback, useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAppDispatch } from "@/lib/redux/hooks";
import SearchComponent from "../search";
import mapMembers, { memberInterface } from "@/lib/hooks/mapMembers";
import { useLazyGetMembersByNameQuery } from "@/lib/redux/api-slice/membersApiSlice";
import _ from "lodash";

export interface FilterInterface {
  refetch: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRenderKey: (value: number | any) => void;
}

export default function NameFilter({ refetch, setRenderKey }: FilterInterface) {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { members } = useAppSelector((state: any) => state.membersData);
  const [search, setSearch] = useState("");

  const [selectedName, setSelectedName] = useState<string>();

  // query
  const [getMemberByName] = useLazyGetMembersByNameQuery();

  const onNameSelected = (value: string) => {
    if (value !== selectedName) {
      setSelectedName(value);
      dispatch(setFilter({ name: { equal: value } }));
      return;
    }
    setSelectedName("");
    if (search.length <= 0) {
      dispatch(setFilter(null));
    }
  };

  const memberDataHandler = useCallback(async () => {
    if (search.length > 0) {
      const { data } = await getMemberByName({ search: search });
      dispatch(
        setMembers(
          mapMembers(
            data?.data?.membersByName?.map((data: memberInterface) => {
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
  }, [dispatch, getMemberByName, search]);

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
        Name <MdKeyboardArrowDown size={20} />
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
            setSelected={setSelectedName}
          />
        </li>
        {members?.map((item: { name: string }, index: number) => {
          return (
            <li key={index}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm border rounde-box border-white text-white "
                  onChange={() => onNameSelected(item.name)}
                  checked={selectedName === item.name}
                />
                <a className="text-[#FBBD2C] hover:bg-gray-700">{item.name}</a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
