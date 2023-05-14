"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Popover } from "@headlessui/react";

export function Navigation() {
  return (
    <>
      <nav className="hidden md:block -ml-2">
        <NavLinks />
      </nav>
      <Popover className="relative md:hidden">
        <nav className="flex-1 -ml-2">
          <Popover.Button className="inline-flex md:hidden p-2">
            <Bars3Icon className="h-6" />
          </Popover.Button>
          <Popover.Panel className="absolute z-10 bg-white p-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 mt-1 w-60">
            <div className="flex flex-col">
              <NavLinks />
            </div>
          </Popover.Panel>
        </nav>
      </Popover>
    </>
  );
}

function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      <NavLink active={pathname === "/chat"} href="/chat" className="mr-2">
        Chat
      </NavLink>
      <NavLink active={pathname === "/agentgpt"} href="/agentgpt">
        AgentGPT
      </NavLink>
    </>
  );
}

function NavLink({
  active,
  href,
  children,
  className,
}: {
  active: boolean;
  href: string;
  children: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "text-md font-medium py-2 px-3 hover:text-blue-700  transition-colors rounded hover:bg-blue-100 md:hover:bg-transparent",
        active ? "text-blue-700" : "text-gray-900",
        className
      )}
    >
      {children}
    </Link>
  );
}
