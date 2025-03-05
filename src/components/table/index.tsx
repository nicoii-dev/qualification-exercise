import React from "react";
import PaginationComponent from "./pagination";
import clsx from "clsx";
import LoaderComponent from "../loader";
import EmptyComponent from "./empty";

interface headerInterface {
  id: string;
  label: string;
  align?: string;
}
interface TableInterface {
  header: headerInterface[];
  data: any[];
  total: number;
  pageSize: number;
  setPageSize: (page: number) => void;
  buttonTitle?: string;
  buttonFunction?: () => void;
  isLoading: boolean;
}

export default function TableComponent({
  header,
  data,
  pageSize = 10,
  setPageSize,
  isLoading,
}: TableInterface) {
  return (
    <div className=" bg-[#0A2C3833] border border-neutral-600">
      <div className="overflow-auto w-full scrollbar h-[65vh] ">
        <table className="table">
          {/* head */}
          <thead className="bg-[#0B1D26]">
            <tr>
              {header.map((head: headerInterface, index: number) => {
                return (
                  <th
                    key={index}
                    className={clsx(
                      "text-[#667085] border-b border-b-neutral-600",
                      `text-${head.align ?? "left"}`
                    )}
                  >
                    {head.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          {data.length > 0 ? (
            <tbody>
              {!isLoading ? (
                data.map((row, index) => {
                  return (
                    <tr
                      key={index}
                      className="border-b border-t border-neutral-600"
                    >
                      {header.map((head, index) => (
                        <th
                          key={index}
                          className={clsx(
                            "text-[#667085]",
                            `text-${head.align ?? "left"}`
                          )}
                        >
                          {row[head.id]}
                        </th>
                      ))}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <th>
                    <LoaderComponent />
                  </th>
                </tr>
              )}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <th>
                  <EmptyComponent />
                </th>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      <PaginationComponent pageSize={pageSize} setPageSize={setPageSize} />
    </div>
  );
}
