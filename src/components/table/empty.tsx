import Image from "next/image";

export default function EmptyComponent() {
  return (
    <div className="text-white absolute flex flex-col gap-2 justify-center items-center w-full h-[50vh]">
      <Image
        src={"/icons/box.png"}
        width={150}
        height={150}
        alt={"Empty data"}
        style={{ objectFit: "contain" }}
      />
      <div className="text-2xl text-gray-300">No Data</div>
    </div>
  );
}
