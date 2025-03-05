"use client";

import TableComponent from "@/components/table";
import mapMembers from "@/lib/hooks/mapMembers";
import { useGetMembersQuery } from "@/lib/redux/api-slice/membersApiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setHasNextPage, setMembers } from "@/lib/redux/slice/membersSlice";
import { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import NameFilter from "@/components/page-components/NameFilter";
import VerificationStatusFilter from "@/components/page-components/VerificationStatusFilter";
import EmailFilter from "@/components/page-components/EmailFilter";
import MobileFilter from "@/components/page-components/MobileFilter";
import DomainFilter from "@/components/page-components/DomainFilter";
import BadgeStatusFilter from "@/components/page-components/BadgeStatusFilter";
import DateRegisteredFilter from "@/components/page-components/DateRegisteredFilter";
import LastActiveFilter from "@/components/page-components/LastActiveFilter";

export default function MembersPage() {
  const dispatch = useAppDispatch();
  const [pageSize, setPageSize] = useState<number>(10);

  const [renderKey, setRenderKey] = useState(0); // for force rerendering

  const { members, endCursor, filter } = useAppSelector(
    (state: any) => state.membersData
  );

  const { data, isLoading, refetch } = useGetMembersQuery(
    {
      first: pageSize,
      after: !_.isEmpty(endCursor) ? endCursor[endCursor.length - 1] : null,
      filter: !_.isEmpty(filter) ? filter : null,
    },
    { refetchOnMountOrArgChange: true }
  );

  const tableHeader = [
    { id: "name", label: "Name", align: "left" },
    { id: "verificationStatus", label: "Verification Status", align: "left" },
    { id: "balance", label: "Balance", align: "left" },
    { id: "emailAddress", label: "Email Address", align: "left" },
    { id: "mobileNumber", label: "Mobile number", align: "left" },
    { id: "domain", label: "Domain", align: "left" },
    { id: "dateRegistered", label: "Date Registered", align: "right" },
    { id: "status", label: "Status", align: "left" },
    { id: "lastActive", label: "Date and Time Last Active", align: "left" },
  ];

  const setMembersData = useCallback(() => {
    dispatch(setMembers(mapMembers(data?.data?.members?.edges)));
    dispatch(setHasNextPage(data?.data?.members?.pageInfo?.hasNextPage));
  }, [data, dispatch, renderKey]);

  useEffect(() => {
    setMembersData();
  }, [setMembersData]);

  return (
    <div className="p-10 bg-[#0A1117] h-screen overflow-scroll ">
      <div>
        <div className="text-3xl text-white">Members</div>
        <div className="text-[#A3A3A3] mb-5 mt-2">View your members here.</div>
      </div>

      <div className="flex  items-center w-full gap-5 p-3 border-t border-r border-l border-neutral-600 rounded-tr-xl rounded-tl-xl bg-[#0B1D26]">
        <div className="text-xl text-white text-nowrap">Filters |</div>
        <div className="flex flex-wrap  items-center gap-5 w-full">
          <NameFilter refetch={refetch} setRenderKey={setRenderKey} />
          <VerificationStatusFilter />
          <EmailFilter refetch={refetch} setRenderKey={setRenderKey} />
          <MobileFilter refetch={refetch} setRenderKey={setRenderKey} />
          <DomainFilter refetch={refetch} setRenderKey={setRenderKey} />
          <DateRegisteredFilter />
          <BadgeStatusFilter />
          <LastActiveFilter />
        </div>
      </div>
      <TableComponent
        header={tableHeader}
        data={members ?? []}
        total={members?.length ?? 0}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isLoading={isLoading}
      />
    </div>
  );
}
