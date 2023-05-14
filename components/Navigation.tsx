"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Popover } from "@headlessui/react";

export function Navigation() {
  return (
    <>
      <nav className="hidden md:block">
        <Links />
      </nav>
      <Popover className="relative md:hidden">
        <nav className="flex-1">
          <Popover.Button className="inline-flex md:hidden p-2">
            <Bars3Icon className="h-6" />
          </Popover.Button>
          <Popover.Panel className="absolute z-10 bg-white p-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 mt-1 w-60">
            <div className="flex flex-col">
              <Links />
            </div>
          </Popover.Panel>
        </nav>
      </Popover>
    </>
  );
}

const linkBaseClassName =
  "text-md font-medium py-2 px-3 hover:text-blue-700 text-gray-900 transition-colors rounded hover:bg-blue-100 md:hover:bg-transparent";

function Links() {
  const pathname = usePathname();

  return (
    <>
      <Link
        href="/chat"
        className={clsx(
          linkBaseClassName,
          pathname === "/chat" && "text-blue-700"
        )}
      >
        Chat
      </Link>
      <Link
        href="/agentgpt"
        className={clsx(
          linkBaseClassName,
          pathname === "/agentgpt" && "text-blue-700"
        )}
      >
        AgentGPT
      </Link>
    </>
  );
}
