import { useAppSelector } from "@/lib/redux/hooks";
import {
  nextEndCursor,
  prevEndCursor,
} from "@/lib/redux/slice/membersSlice";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";

interface PaginationInterface {
  pageSize: number;
  setPageSize: (page: number) => void;
  //   totalSize
}

export default function PaginationComponent({
  pageSize = 10,
  setPageSize,
}: PaginationInterface) {
  const dispatch = useDispatch();
  const { members, hasNextPage } = useAppSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.membersData
  );
  const onPageSizeChange = (size: number) => {
    setPageSize(size);
  };

  const nextPageHandler = () => {
    dispatch(nextEndCursor(members[members.length - 1].cursor));
  };

  const prevPageHandler = () => {
    dispatch(prevEndCursor());
  };

  return (
    <div className="flex justify-end gap-5 p-5">
      <div className="dropdown dropdown-top dropdown-end">
        <button className="join-item btn btn-outline border text-[#FFFFFF] border-neutral-600 hover:text-black">
          {pageSize} Entries <MdKeyboardArrowDown size={20} />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-[#0B1D26] rounded-box z-1 w-full p-2 shadow-sm"
        >
          <li>
            <a
              className="text-white hover:bg-gray-700"
              onClick={() => onPageSizeChange(10)}
            >
              10
            </a>
          </li>
          <li>
            <a
              className="text-white hover:bg-gray-700"
              onClick={() => onPageSizeChange(25)}
            >
              25
            </a>
          </li>
          <li>
            <a
              className="text-white  hover:bg-gray-700"
              onClick={() => onPageSizeChange(50)}
            >
              50
            </a>
          </li>
          <li>
            <a
              className="text-white hover:bg-gray-700"
              onClick={() => onPageSizeChange(100)}
            >
              100
            </a>
          </li>
        </ul>
      </div>

      <div className="join grid grid-cols-2">
        <button
          onClick={() => prevPageHandler()}
          className="join-item btn btn-outline border text-[#FFFFFF] border-neutral-600 hover:text-black"
        >
          <IoMdArrowBack size={20} /> Previous
        </button>
        <button
          onClick={() => nextPageHandler()}
          className="join-item btn btn-outline text-[#FFFFFF] border-neutral-600 hover:text-black disabled:border-gray-600 disabled:text-gray-600"
          disabled={!hasNextPage}
        >
          Next <IoMdArrowForward size={20} />
        </button>
      </div>
    </div>
  );
}
