"use client";

import { setFilter } from "@/lib/redux/slice/membersSlice";
import moment from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

export default function DateRegisteredFilter() {
  const dispatch = useDispatch();
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const onDateChange = (newValue: DateValueType) => {
    console.log(newValue)
    setDateValue(newValue);
    if (newValue?.startDate === null) {
      dispatch(setFilter(null));
      return;
    }
    dispatch(
      setFilter({
        dateTimeCreated: {
          greaterThanOrEqual: moment(newValue?.startDate).utc().toISOString(),
          lesserThanOrEqual: moment(newValue?.endDate).utc().toISOString(),
        },
      })
    );
  };

  return (
    <div>
      <Datepicker
        primaryColor="amber"
        value={dateValue}
        onChange={(event: DateValueType) => onDateChange(event)}
        showShortcuts={true}
        showFooter
        placeholder="Date Registered"
        inputClassName="h-7 text-nowrap rounded-md p-2 bg-[#0A1117] border border-[#7A7A7A] text-sm text-[#7A7A7A]"
      />
    </div>
  );
}
