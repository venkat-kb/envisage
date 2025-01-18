"use client";
import SidenavItems, { AdminSidenavItems } from "@/data/sidenav-items";
import { Sidebar, SidebarClose, SidebarOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const AdminSidenav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <aside className={`sidebar-3 border fixed ${isOpen ? "open" : ""}`}>
      <div className="inner max-w-max">
        <header className="flex items-center max-w-max mb-4">
          <button
            type="button"
            className="sidebar-3-burger"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="material-symbols-outlined text-muted-foreground hover:text-black hover:transition-all">
              {isOpen ? <SidebarClose /> : <SidebarOpen />}
            </span>
          </button>
          <Image
            src="/assets/logo.svg"
            className={!isOpen ? "hidden" : ""}
            height="40"
            width="80"
            alt="TEMT Logo"
          />
        </header>
        <nav>
          {AdminSidenavItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                router.push(item.href);
                setIsOpen(false);
              }}
              className="opacity-100"
            >
              {/* <span className="material-symbols-outlined">{item}</span> */}

              <span className="material-symbols-outlined">
                <item.Icon
                  className=" material-symbols-outlined z-20"
                  color="white"
                  size={20}
                />
              </span>
              <p className="text-white truncate ">{item.label}</p>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};
