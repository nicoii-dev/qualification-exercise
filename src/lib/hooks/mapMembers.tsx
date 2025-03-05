"use client";

import BadgeStatus from "@/components/table/badge-status";
import VerificationStatus from "@/components/table/verification-status";
import _ from "lodash";
import moment from "moment";

export interface memberInterface {
  id: string;
  name: string;
  verificationStatus: "VERIFIED" | "UNVERIFIED" | "PENDING";
  wallet: {
    balance: string;
  };
  emailAddress: string;
  mobileNumber: string;
  domain: string;
  dateTimeCreated: string;
  status: "ACTIVE" | "BLACKLISTED" | "DISABLED";
  dateTimeLastActive: string;
}

interface dataInterface extends memberInterface {
  node: memberInterface;
  cursor: string;
}
export default function mapMembers(membersData: dataInterface[]) {

  return membersData?.map((data: dataInterface) => ({
    id: data?.node?.id,
    name: data?.node?.name,
    verificationStatus: (
      <VerificationStatus
        status={data?.node?.verificationStatus?.toLowerCase()}
      />
    ),
    balance: !_.isNull(data?.node?.wallet)
      ? parseInt(data?.node?.wallet?.balance)?.toFixed(2)
      : "0.00",
    emailAddress: !_.isNull(data?.node?.emailAddress) ? data?.node?.emailAddress : "N/A",
    mobileNumber: !_.isNull(data?.node?.mobileNumber) ? data?.node?.mobileNumber : "N/A",
    domain: !_.isNull(data?.node?.domain) ? data?.node?.domain : "N/A",
    dateRegistered: !_.isNull(data?.node?.dateTimeCreated) ? moment(data?.node?.dateTimeCreated).format("YYYY MMM DD") : "N/A",
    status: <BadgeStatus status={data?.node?.status?.toLowerCase()} />,
    lastActive: !_.isNull(data?.node?.dateTimeLastActive) ? moment(data?.node?.dateTimeLastActive).format("YYYY MMM DD hh:mm A") : "N/A",
    cursor: data?.cursor,
  }));
}
