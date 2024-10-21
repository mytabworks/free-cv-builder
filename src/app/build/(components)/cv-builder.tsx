"use client";

import React, { useEffect, useState } from "react"
import classNames from "classnames"
import { CVBuilderContext, TCVData } from "./cv-builder-context";
import { CVFormPanel } from "./(panels)/form-panel";
import * as Separator from "@radix-ui/react-separator"
import { CVPreviewPanel } from "./(panels)/preview-panel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CVBuilder() {
  const [data, setData] = useState<TCVData>({
    name: '',
    email: '',
    phone: '',
    summary: '',
    skills: [],
    workExperiences: [],
    education: [],
    photo: null,
    sectionOrder: ['skills', 'workExperiences', 'education'],
    font: 'Arial',
    themeColor: '#10b981',
    template: 'Classic',
    showRatings: false
  })

  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const containerWidth = window.innerWidth;
        const newLeftPanelWidth = (e.clientX / containerWidth) * 100;
        setLeftPanelWidth(Math.min(Math.max(newLeftPanelWidth, 20), 80));
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);

  return (
    <CVBuilderContext.Provider value={{ data, setData }}>
      <div 
        className={classNames("min-h-screen bg-white flex flex-col md:flex-row dark:bg-neutral-950", { "select-none": false })} 
      >
        {/* Left side - Tabs */}
        {showLeftPanel && (
          <div className={`${showRightPanel ? 'w-full md:w-[50%]' : 'w-full'}`} style={{ width: showRightPanel ? `${leftPanelWidth}%` : '100%' }}>
            <CVFormPanel />
          </div>
        )}

        {/* Resizer */}
        <Separator.Root
          className="bg-slate-100 hover:bg-blue-500 active:bg-blue-500 relative data-[orientation=horizontal]:h-[5px] data-[orientation=horizontal]:w-[100vw] data-[orientation=vertical]:h-[100vh] data-[orientation=vertical]:w-[5px] cursor-col-resize"
          decorative
          orientation="vertical"
          onMouseDown={handleDragStart}
        >
          {/* Toggle buttons */}
          <div className={classNames("absolute top-1/2 transform -translate-y-1/2 flex flex-col space-y-2", {
            "left-1/2 -translate-x-1/2 ": showLeftPanel && showRightPanel,
            "left-0 ": !showLeftPanel && showRightPanel,
            "right-0 ": showLeftPanel && !showRightPanel,
          })}>
            {showRightPanel && <Button
              variant="outline"
              size="icon"
              onClick={() => setShowLeftPanel(!showLeftPanel)}
              className="bg-emerald-100 hover:bg-emerald-200"
            >
              {showLeftPanel ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>}
            {showLeftPanel && <Button
              variant="outline"
              size="icon"
              onClick={() => setShowRightPanel(!showRightPanel)}
              className="bg-emerald-100 hover:bg-emerald-200"
            >
              {showRightPanel ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>}
          </div>
        </Separator.Root>
        
        {/* Right side - Preview */}
        {showRightPanel && (
          <div className={`${showLeftPanel ? 'w-full md:w-[50%]' : 'w-full'}`} style={{ width: showLeftPanel ? `${100 - leftPanelWidth}%` : '100%' }}>
            <CVPreviewPanel />
          </div>
        )}
      </div>
    </CVBuilderContext.Provider>
  )
}