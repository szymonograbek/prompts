"use client";

import { Button } from "@/components/Button";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface ChatSettingsProps {
  temperature: number;
  setTemperature: (value: number) => void;
  maxTokens: number;
  setMaxTokens: (value: number) => void;
}

export function ChatSettings({
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
}: ChatSettingsProps) {
  return (
    <Popover className="relative">
      <Popover.Button as={Button}>Settings</Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        <Popover.Panel className="absolute left-0 mt-1 bg-white w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-4">
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Temperature
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="number"
                name="price"
                id="price"
                className="w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0-1"
                min={0}
                max={1}
                step={0.1}
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="maxTokens"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Max tokens
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="number"
                name="maxTokens"
                id="maxTokens"
                className="w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0-4000"
                min={1}
                max={4000}
                step={1}
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value, 10))}
              />
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
