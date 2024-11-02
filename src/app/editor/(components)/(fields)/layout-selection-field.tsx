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
    <div>
      <Label htmlFor="template">Layout</Label>
      <div className="flex gap-3 mt-3">
        {items.map((item) => (
          <a
            key={item.value}
            href="#"
            onClick={handleChange(item.value as 'left' | 'right' | 'top')}
            className={classNames("flex flex-1 @3xl:flex-none @3xl:px-6 flex-col items-center px-4 py-3 border rounded-lg transition", null, value === item.value ? 'border-emerald-600 bg-emerald-100' : 'border-slate-300 hover:bg-slate-50')}
          >
            <item.icon className={classNames("w-16 h-16", { 'text-emerald-600': value === item.value, 'text-gray-500': value !== item.value })} />
            <span className="mt-2 text-xs text-gray-800">{item.label}</span>
          </a>
        ))}
       
      </div>
    </div>
  );
};