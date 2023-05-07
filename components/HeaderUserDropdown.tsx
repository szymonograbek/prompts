"use client";

import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Button, ButtonProps } from "./Button";

export function HeaderUserDropdown({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button as={Fragment}>{children}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        <Menu.Items className="absolute right-0 mt-1 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-1">
          <Menu.Item as={ButtonWithIcon}>Sign out</Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const ButtonWithIcon = ({ children, ...props }: ButtonProps) => (
  <Button
    onClick={() => signOut()}
    className="w-full"
    variant="ghost"
    rightIcon={<ArrowRightOnRectangleIcon className="h-4 text-slate-600" />}
    {...props}
  >
    {children}
  </Button>
);
