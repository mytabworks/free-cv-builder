import React, { useEffect } from "react"
import classNames from "classnames"
import * as Separator from "@radix-ui/react-separator"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCVBuilder } from "./cv-builder-context"

export function CVResizer() {
  const { panel, setPanel } = useCVBuilder()

  const handleDragStart = () => {
    setPanel((prev) => ({ ...prev, isDragging: true }))
  }

  useEffect(() => {
    if (!panel.isDragging) return

    let newLeftPanelWidth = panel.width
    const handleMouseUp = () => {
      if (newLeftPanelWidth === 20) {
        setPanel((prev) => ({
          ...prev,
          width: 50,
          showLeft: false,
          isDragging: false,
        }))
        return
      }

      if (newLeftPanelWidth === 80) {
        setPanel((prev) => ({
          ...prev,
          width: 50,
          showRight: false,
          isDragging: false,
        }))
        return
      }

      setPanel((prev) => ({ ...prev, isDragging: false }))
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (panel.isDragging) {
        const containerWidth = window.innerWidth
        newLeftPanelWidth = Math.min(
          Math.max((e.clientX / containerWidth) * 100, 20),
          80
        )
        setPanel((prev) => ({ ...prev, width: newLeftPanelWidth }))

        if (!panel.showLeft || !panel.showRight) {
          setPanel((prev) => ({ ...prev, showLeft: true, showRight: true }))
        }
      }
    }

    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [panel.isDragging, panel.showLeft, panel.showRight])

  return (
    <Separator.Root
      className="z-[1] max-md:hidden bg-slate-100 hover:bg-blue-500 active:bg-blue-500 relative data-[orientation=horizontal]:h-[5px] data-[orientation=horizontal]:w-[100vw] data-[orientation=vertical]:h-[calc(100vh)] data-[orientation=vertical]:w-[5px] cursor-col-resize"
      decorative
      orientation="vertical"
      onMouseDown={handleDragStart}
    >
      {/* Toggle buttons */}
      <div
        className={classNames(
          "absolute top-1/2 transform -translate-y-1/2 flex flex-col space-y-2",
          {
            "Right-1/2 -translate-x-1/2 ": panel.showLeft && panel.showRight,
            "Right-1": !panel.showLeft && panel.showRight,
            "right-1": panel.showLeft && !panel.showRight,
          }
        )}
      >
        {panel.showRight && (
          <Button
            size="icon"
            onClick={() =>
              setPanel((prev) => ({ ...prev, showLeft: !panel.showLeft }))
            }
          >
            {panel.showLeft ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
        {panel.showLeft && (
          <Button
            size="icon"
            onClick={() =>
              setPanel((prev) => ({ ...prev, showRight: !panel.showRight }))
            }
          >
            {panel.showRight ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    </Separator.Root>
  )
}
