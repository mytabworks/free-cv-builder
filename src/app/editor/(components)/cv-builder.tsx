"use client";

import React, { useEffect, useState } from "react"
import classNames from "classnames"
import { CVBuilderContext, TCVData } from "./cv-builder-context";
import { CVFormPanel } from "./(panels)/form-panel";
import * as Separator from "@radix-ui/react-separator"
import { CVPreviewPanel } from "./(panels)/preview-panel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/components/link";

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

  const handleDragEnd = () => {
    
  }

  useEffect(() => {
    let newLeftPanelWidth = leftPanelWidth;
    const handleMouseUp = () => {
      setIsDragging(false)

      if(newLeftPanelWidth === 20) {
        setLeftPanelWidth(50)
        setShowLeftPanel(false)
        return;
      }
  
      if(newLeftPanelWidth === 80) {
        setLeftPanelWidth(50)
        setShowRightPanel(false)
        return;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const containerWidth = window.innerWidth;
        newLeftPanelWidth = Math.min(Math.max((e.clientX / containerWidth) * 100, 20), 80)
        setLeftPanelWidth(newLeftPanelWidth);

        if(!showLeftPanel || !showRightPanel) {
          setShowLeftPanel(true)
          setShowRightPanel(true)
        }
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, showLeftPanel, showRightPanel]);

  return (
    <CVBuilderContext.Provider value={{ data, setData }}>
      <div 
        className={classNames("flex flex-col md:flex-row dark:bg-neutral-950", { 
          "select-none relative after:content-[''] after:absolute after:inset-0": isDragging
        })} 
      >
        {/* Left side - Tabs */}
        {showLeftPanel && (
          <div className={`bg-slate-50 p-6 ${showRightPanel ? 'w-full md:w-[50%]' : 'w-full'}`} style={{ width: showRightPanel ? `${leftPanelWidth}%` : '100%' }}>
            <header className="mb-5">
              <Link to="/">
                <h1 className="text-lg md:text-2xl font-bold text-emerald-600">Free CV Builder</h1>
              </Link>
            </header>
            <CVFormPanel />
          </div>
        )}

        {/* Resizer */}
        <Separator.Root
          className="z-[1] bg-slate-100 hover:bg-blue-500 active:bg-blue-500 relative data-[orientation=horizontal]:h-[5px] data-[orientation=horizontal]:w-[100vw] data-[orientation=vertical]:h-[calc(100vh)] data-[orientation=vertical]:w-[5px] cursor-col-resize"
          decorative
          orientation="vertical"
          onMouseDown={handleDragStart}
        >
          {/* Toggle buttons */}
          <div className={classNames("absolute top-1/2 transform -translate-y-1/2 flex flex-col space-y-2", {
            "left-1/2 -translate-x-1/2 ": showLeftPanel && showRightPanel,
            "left-1": !showLeftPanel && showRightPanel,
            "right-1": showLeftPanel && !showRightPanel,
          })}>
            {showRightPanel && (
              <Button
                size="icon"
                onClick={() => setShowLeftPanel(!showLeftPanel)}
              >
                {showLeftPanel ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            )}
            {showLeftPanel && (
              <Button
                size="icon"
                onClick={() => setShowRightPanel(!showRightPanel)}
              >
                {showRightPanel ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </Separator.Root>
        
        {/* Right side - Preview */}
        {showRightPanel && (
          <div className={`py-6 ${showLeftPanel ? 'w-full md:w-[50%]' : 'w-full'}`} style={{ width: showLeftPanel ? `${100 - leftPanelWidth}%` : '100%' }}>
            <CVPreviewPanel />
          </div>
        )}
      </div>
    </CVBuilderContext.Provider>
  )
}