"use client";

import { Button } from "@/components/Button";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

interface Option {
  id: number;
  name: string;
}

interface SelectProps<T> {
  value: T;
  onChange: (value: T) => void;
  options: Array<T>;
  name?: string;
}

export function Select<T extends Option>({
  value,
  onChange,
  options,
  name,
}: SelectProps<T>) {
  return (
    <Listbox value={value} onChange={onChange} name={name}>
      <div className="relative">
        <Listbox.Button as={Fragment}>
          {({ open }) => (
            <Button
              className="relative"
              rightIcon={
                open ? (
                  <ChevronUpIcon className="h-4" />
                ) : (
                  <ChevronDownIcon className="h-4" />
                )
              }
            >
              {value.name}
            </Button>
          )}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={
              "absolute mt-1 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-1 max-h-60 bg-white"
            }
          >
            {options.map((option) => (
              <Listbox.Option key={option.id} value={option}>
                <Button variant="ghost" className="w-full">
                  {option.name}
                </Button>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
