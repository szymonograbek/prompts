"use client";

import { Select } from "@/components/Select";

export enum Models {
  "GPT-3.5-turbo" = "gpt-3.5-turbo",
  "GPT-4" = "gpt-4",
}

export interface Model {
  id: number;
  name: Models;
}

interface ModelSelectProps {
  selectedModel: Model;
  onModelSelect: (model: Model) => void;
}

export const MODELS: Array<Model> = [
  {
    id: 0,
    name: Models["GPT-3.5-turbo"],
  },
  {
    id: 1,
    name: Models["GPT-4"],
  },
];

export function ModelSelect({
  selectedModel,
  onModelSelect,
}: ModelSelectProps) {
  return (
    <Select
      value={selectedModel}
      onChange={onModelSelect}
      options={MODELS}
      name="model"
    />
  );
}
