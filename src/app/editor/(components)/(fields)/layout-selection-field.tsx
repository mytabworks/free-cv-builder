import { PanelLeft, PanelRight, PanelTop } from 'lucide-react';
import { Label } from "@/components/ui/label";
import React from "react";
import classNames from "classnames";

interface LayoutSelectionFieldProps {
  value: 'left' | 'right' | 'top';
  onChange: (value: 'left' | 'right' | 'top') => void;
}

export function LayoutSelectionField({ value, onChange }: LayoutSelectionFieldProps) {
  
  const handleChange = (layout: 'left' | 'right' | 'top'): React.MouseEventHandler<HTMLAnchorElement> => () => {
    onChange(layout);
  };

  const items = [
    { label: 'Left Panel', value: 'left', icon: PanelLeft },
    { label: 'Right Panel', value: 'right', icon: PanelRight },
    { label: 'Top Panel', value: 'top', icon: PanelTop },
  ]

  return (
    <div data-tutorial-target="layout">
      <Label htmlFor="template">Layout</Label>
      <div className="flex gap-3 mt-3">
        {items.map((item) => (
          <a
            key={item.value}
            href="#"
            onClick={handleChange(item.value as 'left' | 'right' | 'top')}
            className={classNames("flex flex-1 @3xl:flex-none @3xl:px-6 flex-col items-center px-3 py-3 border rounded-lg transition", null, value === item.value ? 'border-neutral-600 bg-neutral-100' : 'border-neutral-300 hover:bg-neutral-50')}
          >
            <item.icon className={classNames("w-16 h-16", { 'text-neutral-800': value === item.value, 'text-neutral-400': value !== item.value })} />
            <span className="mt-2 text-xs text-neutral-800">{item.label}</span>
          </a>
        ))}
       
      </div>
    </div>
  );
};