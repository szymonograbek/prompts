import { Switch } from "@/components/Switch";
import { Switch as HeadlessSwitch, RadioGroup } from "@headlessui/react";
import {
  ChatSettings,
  ChatSettingsProps,
} from "@/features/chat-gpt/components/ChatSettings";
import { Tool } from "../constants";
import { SearchProvider } from "../types";
import clsx from "clsx";
import { Fragment } from "react";

export interface ToolsConfig extends Tool {
  onChange: (state: boolean) => void;
  enabled: boolean;
}

interface AgentSettingsProps extends ChatSettingsProps {
  tools: Array<ToolsConfig>;
  searchProvider: SearchProvider;
  setSearchProvider: (provider: SearchProvider) => void;
}

export function AgentSettings({
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
  tools,
  searchProvider,
  setSearchProvider,
}: AgentSettingsProps) {
  return (
    <ChatSettings
      temperature={temperature}
      setTemperature={setTemperature}
      maxTokens={maxTokens}
      setMaxTokens={setMaxTokens}
    >
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Tools</h2>
        <HeadlessSwitch.Group>
          <div className="flex flex-col border px-2 rounded">
            {tools.map((tool, index) => (
              <Fragment key={tool.key}>
                <div className="py-2 px-2 flex items-center justify-between">
                  <HeadlessSwitch.Label className="mr-2 text-sm font-medium leading-6 text-gray-900">
                    {tool.name}
                  </HeadlessSwitch.Label>
                  <Switch enabled={tool.enabled} onChange={tool.onChange} />
                </div>
                {index !== tools.length - 1 && <hr />}
              </Fragment>
            ))}
          </div>
        </HeadlessSwitch.Group>
        <div className="mt-6">
          <RadioGroup value={searchProvider} onChange={setSearchProvider}>
            <div className="mb-2">
              <RadioGroup.Label className="text-xl font-bold">
                Search Provider
              </RadioGroup.Label>
            </div>
            <RadioGroup.Option value={SearchProvider.BING}>
              {({ checked }) => (
                <div
                  className={clsx(
                    "p-2 rounded cursor-pointer text-sm mb-1",
                    checked ? "bg-blue-200" : ""
                  )}
                >
                  Bing (1k requests/month)
                </div>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value={SearchProvider.GOOGLE}>
              {({ checked }) => (
                <div
                  className={clsx(
                    "p-2 rounded cursor-pointer text-sm",
                    checked ? "bg-blue-200" : ""
                  )}
                >
                  Google (100 requests/month)
                </div>
              )}
            </RadioGroup.Option>
          </RadioGroup>
        </div>
      </div>
    </ChatSettings>
  );
}
