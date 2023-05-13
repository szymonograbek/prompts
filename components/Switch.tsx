import { Switch as HeadlessSwitch } from "@headlessui/react";
import clsx from "clsx";

interface SwitchProps {
  enabled: boolean;
  onChange: (state: boolean) => void;
}

export function Switch({ enabled, onChange }: SwitchProps) {
  return (
    <HeadlessSwitch
      checked={enabled}
      onChange={onChange}
      className={clsx(
        "relative inline-flex h-5 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        enabled ? "bg-blue-600" : "bg-gray-200"
      )}
    >
      <span
        className={clsx(
          enabled ? "translate-x-7" : "translate-x-1",
          "inline-block h-3 w-3 transform rounded-full bg-white transition-transform"
        )}
      />
    </HeadlessSwitch>
  );
}
