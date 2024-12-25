import { Check } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest(".dashboard-select")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="dashboard-select w-full relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-lg bg-darkLight mb-2 p-4 flex justify-between items-center cursor-pointer"
      >
        <div className="">
          <p className="text-white font-medium">Rhodium</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 text-gray-400"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute w-full left-0 p-2 bg-white z-40 space-y-1 rounded-lg border-gray-900">
          <Link
            href="/rhodium"
            className={
              "w-full h-full flex items-center space-x-2 hover:bg-dark px-3 py-2 rounded-md " +
              (pathname && pathname.startsWith("/rhodium")
                ? "bg-darkLight"
                : "")
            }
            onClick={() => setIsOpen(false)}
          >
            <Check
              color="#FFF"
              size={20}
              className={
                pathname && pathname.startsWith("/rhodium")
                  ? "opacity-100"
                  : "opacity-0"
              }
            />
            <p className="text-white">Rhodium</p>
          </Link>
          <Link
            href="/rhopay"
            className={
              "w-full h-full flex items-center space-x-2 hover:bg-gray-900/50 px-3 py-2 rounded-md " +
              (pathname && pathname.startsWith("/rhopay")
                ? "bg-gray-900/50"
                : "")
            }
            onClick={() => setIsOpen(false)}
          >
            <Check
              color="#FFF"
              size={20}
              className={
                pathname && pathname.startsWith("/rhopay")
                  ? "opacity-100"
                  : "opacity-0"
              }
            />
            <p className="text-dark">Rhopay</p>
          </Link>
        </div>
      )}
    </div>
  );
}
