"use client";

import React, { useEffect, useState } from "react"
import classNames from "classnames"
import { CVBuilderContext, TCVData, TShowPanel } from "./cv-builder-context";
import { CVFormPanel } from "./(panels)/form-panel";
import { CVPreviewPanel } from "./(panels)/preview-panel";
import { Link } from "@/components/link";
import { CVResizer } from "./cv-resizer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffectMounted } from "@/hooks/use-effect-mounted";
import { useNavigationBlocker } from "@/hooks/use-navigation-blocker";
import { defaultCVData } from "@/constants/default-cv-data";
import Image from "next/image";

export function CVBuilder() {
  const [data, setData] = useState<TCVData>(() => {
    const getData = typeof window !== 'undefined' && localStorage.getItem('lime-cv-data')
    if(getData) return JSON.parse(getData)
    return defaultCVData
  })

  const [panel, setPanel] = useState<TShowPanel>({
    showLeft: true,
    showRight: true,
    width: 50,
    isDragging: false
  });

	useEffect(() => {
		const media = window.matchMedia('(max-width: 768px)')

		const handler = () => {
      if(!media.matches) return setPanel(prev => ({ ...prev, showLeft: true, showRight: true, width: 50 }));
      setPanel(prev => ({ ...prev, showLeft: true, showRight: false }))
		}

		handler()

		media.addEventListener('change', handler)

		return () => {
			media.removeEventListener('change',handler)
		}
	}, []);

  const [dirty, setDirty] = useState(false);

  useEffectMounted(() => {
    if(dirty) {
      return localStorage.setItem('lime-cv-data', JSON.stringify({ ...data }))
    }

    setDirty(true)
  }, [data])

  useEffect(() => {
    if(data.name) {
      document.title = data.name!.replaceAll(' ', '-').toLowerCase() + '-cv'
    }
  }, [data.name])

  // useNavigationBlocker(dirty)

  return (
    <CVBuilderContext.Provider value={{ data, setData, panel, setPanel }}>
      <div 
        className={classNames("flex flex-col md:flex-row dark:bg-neutral-950", { 
          "select-none relative after:content-[''] after:absolute after:inset-0": panel.isDragging
        })} 
      >
        {/* Left side - Tabs */}
        {panel.showLeft && (
          <div 
            className={classNames("@container bg-slate-50 max-md:!w-full p-3 md:p-6", null, panel.showRight ? 'w-full md:w-[50%]' : 'w-full')} 
            style={{ width: panel.showRight ? `${panel.width}%` : '100%' }}
          >
            <header className="mb-5 flex items-center justify-between">
              <Link to="/">
                <Image src="/free-cv-builder-logo.png" height={30} width={200} alt="Free CV Builder Logo" className="h-8 md:h-10 w-auto" />
              </Link>
              <Button 
                className="max-md:!flex hidden"
                onClick={() => 
                  setPanel(prev => ({ 
                    ...prev, 
                    showRight: !panel.showRight 
                  })
                )}
              >
                Preview CV
                {" "}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </header>
            <CVFormPanel />
          </div>
        )}

        {/* Resizer */}
        <CVResizer />

        {/* Right side - Preview */}
        {panel.showRight && (
          <div 
            className={classNames("max-md:fixed max-md:inset-0 max-md:h-screen max-md:!w-full max-md:bg-emerald-100 py-3  md:py-6", null, panel.showLeft ? 'md:w-[50%]' : '')} 
            style={{ width: panel.showLeft ? `${100 - panel.width}%` : '100%' }}
          >
            <header className="max-md:!block hidden px-3 mb-5">
              <Button 
                onClick={() => 
                  setPanel(prev => ({ 
                    ...prev, 
                    showRight: !panel.showRight, 
                  }))
                }
              >
                <ChevronLeft className="h-4 w-4" />
                {" "}
                Back
              </Button>
            </header>
            <CVPreviewPanel />
          </div>
        )}
      </div>
    </CVBuilderContext.Provider>
  )
}
