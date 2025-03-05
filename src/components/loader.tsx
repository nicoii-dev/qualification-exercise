"use client";

export default function LoaderComponent() {
  return (
    <div className="absolute top-0 h-[50vh] z-50 flex justify-center items-center w-full">
      <span className="loading loading-spinner loading-xl bg-white"></span>
    </div>
  );
}
