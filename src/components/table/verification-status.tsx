import clsx from "clsx";
import React from "react";

interface StatusInterface {
  status: string;
}
export default function VerificationStatus(data: StatusInterface) {
  const statusHandler = () => {
    switch (data.status) {
      case "verified":
        return "text-[#027A48] border-[#008005]";
      case "unverified":
        return "text-[#C01048] border-[#800C05]";
      case "pending":
        return "text-[#B93815] border-[#B93815]";
      default:
        break;
    }
  };
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-2xl pr-2 pl-2 capitalize text-center w-fit border bg-[#0B1D26]",
        statusHandler()
      )}
    >
      {`• ${data.status}`}
    </div>
  );
}
