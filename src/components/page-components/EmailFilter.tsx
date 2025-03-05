"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  setFilter,
  setHasNextPage,
  setMembers,
} from "@/lib/redux/slice/membersSlice";
import { useCallback, useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import _ from "lodash";
import SearchComponent from "../search";
import {
  useGetMembersByEmailQuery,
  useLazyGetMembersByEmailQuery,
} from "@/lib/redux/api-slice/membersApiSlice";
import mapMembers, { memberInterface } from "@/lib/hooks/mapMembers";
import { FilterInterface } from "./NameFilter";

export default function EmailFilter({ refetch, setRenderKey }: FilterInterface) {
  const dispatch = useAppDispatch();
  const { members } = useAppSelector((state: any) => state.membersData);

  const [search, setSearch] = useState("");

  const [getMemberByEmail] = useLazyGetMembersByEmailQuery();

  const [selectedEmail, setSelectedEmail] = useState<string>();

  const onEmailSelected = (value: string) => {
    if (value !== selectedEmail) {
      setSelectedEmail(value);
      dispatch(setFilter({ emailAddress: { equal: value } }));
      return;
    }
    setSelectedEmail("");
    if (search.length <= 0) {
      dispatch(setFilter(null));
    }
  };

  const memberDataHandler = useCallback(async () => {
    if (search.length > 0) {
      const { data } = await getMemberByEmail({ search: search });
      dispatch(
        setMembers(
          mapMembers(
            data?.data?.membersByEmailAddress?.map((data: memberInterface) => {
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
  }, [dispatch, getMemberByEmail, search]);

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
        Email Address <MdKeyboardArrowDown size={20} />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-[#0A1117] rounded-box z-1 w-fit p-2 shadow-sm"
      >
        <li>
          <SearchComponent
            title="Email Address"
            tableSearch={(query) => {
              debounceSearch(query);
            }}
            clearText={clearText}
            setSelected={setSelectedEmail}
          />
        </li>
        {members?.map((item: { emailAddress: string }, index: number) => {
          if (item.emailAddress !== "N/A") {
            return (
              <li key={index}>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm border rounde-box border-white text-white "
                    onChange={() => onEmailSelected(item.emailAddress)}
                    checked={selectedEmail === item.emailAddress}
                  />
                  <a className="text-[#FBBD2C] hover:bg-gray-700">
                    {item.emailAddress}
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
