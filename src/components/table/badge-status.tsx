import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface StatusInterface {
  status: string;
}
export default function BadgeStatus(data: StatusInterface) {
  const statusHandler = () => {
    switch (data.status) {
      case "active":
        return "text-[#75E0A7] border-[#085D3A] bg-[#053321]";
      case "blacklisted":
        return "text-[#FDA29B] border-[#912018] bg-[#55160C]";
      case "disabled":
        return "text-[#CECFD2] border-[#333741] bg-[#161B26]";
      case "deleted":
        return "text-[#FDA29B] border-[#912018] bg-[#55160C]";
      case "suspended":
        return "text-[#CECFD2] border-[#333741] bg-[#161B26]";
      default:
        break;
    }
  };

  const iconHandler = () => {
    switch (data.status) {
      case "active":
        return "/icons/check-circle.png";
      case "blacklisted":
        return "/icons/alert-circle.png";
      case "disabled":
        return "/icons/slash-circle-01.png";
      case "suspended":
        return "/icons/slash-circle-01.png";
      case "deleted":
        return "/icons/alert-circle.png";
      default:
        break;
    }
  };

  return (
    <div
      className={clsx(
        "rounded-2xl capitalize text-center w-full border flex flex-auto pr-5 pl-5 items-center justify-center gap-1 ",
        statusHandler()
      )}
    >
      <Image
        src={iconHandler() ?? "/icons/check-circle.png"}
        width={15}
        height={15}
        alt={`${data.status} Icon`}
        style={{ objectFit: "contain" }}
      />
      {data.status}
    </div>
  );
}
