import { useEffect, useRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import classNames from "classnames";

interface TutorialGuideProps {
  active: boolean;
  steps: Array<{
    target: string | null;
    content: string;
    interactionRequired?: boolean;
  }>;
  onFinish: () => void;
}

export function TutorialGuide({ active, steps, onFinish }: TutorialGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [popoverPosition, setPopoverPosition] = useState({ top: window.innerHeight / 2, left: window.innerWidth / 2 });
  const [firstRender, setFirstRender] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const step = steps[currentStep];

  useEffect(() => {
    if (active) {
      setCurrentStep(0);
    }
  }, [active]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      return setCurrentStep(currentStep + 1);
    }

    onFinish();
    setFirstRender(true)
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updatePopoverPosition = () => {
    if(step.target === null) {
      const popoverElement = popoverRef.current;
      
      if(!popoverElement) {
        setTimeout(updatePopoverPosition);
        return;
      }

      const popoverHeight = popoverElement!.clientHeight;
      const popoverWidth = popoverElement!.clientWidth;

      setPopoverPosition({ top: window.innerHeight / 2 - popoverHeight / 2, left: window.innerWidth / 2 - popoverWidth / 2 });
      return;
    }

    const targetElement = document.querySelector<HTMLElement>(`[data-tutorial-target="${step.target}"]`);
    if (targetElement) {
      const popoverElement = popoverRef.current;
      const overlayElement = overlayRef.current;

      if(!popoverElement || !overlayElement) {
        setTimeout(updatePopoverPosition);
        return;
      }

      // Check for overflowed ancestor and scroll it if necessary
      let ancestor = targetElement.parentElement;
      let isScrolled = false;

      while (ancestor) {
        const hasVerticalScroll = ancestor.scrollHeight > ancestor.clientHeight;
        const hasHorizontalScroll = ancestor.scrollWidth > ancestor.clientWidth;
      
        if (hasVerticalScroll || hasHorizontalScroll) {
          // Calculate the bounding rectangles of both the target element and the ancestor
          const targetRect = targetElement.getBoundingClientRect();
          const ancestorRect = ancestor.getBoundingClientRect();
      
          const isInVerticalView = 
            targetRect.top >= ancestorRect.top && targetRect.top + targetRect.height <= ancestorRect.top + ancestorRect.height;
          const isInHorizontalView = 
            targetRect.left >= ancestorRect.left && targetRect.left + targetRect.width <= ancestorRect.left + ancestorRect.width;

          // Scroll the ancestor if the target is not fully in view
          if (!isInVerticalView || !isInHorizontalView) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
            isScrolled = true;
          }
      
          break;
        }
        
        ancestor = ancestor.parentElement;
      }

      const updatePos = () => {
        const rect = targetElement.getBoundingClientRect();
      
        // Create a hole using clip-path
        overlayElement!.style.clipPath = `polygon(0% 0%, 0% 100%, ${rect.left}px 100%, ${rect.left}px ${rect.top}px,${rect.right}px ${rect.top}px,${rect.right}px ${rect.bottom}px,${rect.left}px ${rect.bottom}px, ${rect.left}px 100%, 100% 100%, 100% 0%)`;
        const popoverHeight = popoverElement!.clientHeight + 5;
        const popoverWidth = popoverElement!.clientWidth + 5;
        const posTop = rect.top + window.scrollY;
        const posLeft = rect.left + window.scrollX;
        const targetLeftCenter = posLeft + rect.width / 2
        const targetLeftCenterWithPopover = targetLeftCenter - popoverWidth / 2
        const targetTopWithTargetHeight = posTop + rect.height + 5
        const targetTopCenter = posTop + rect.height / 2 - popoverHeight / 2
        setPopoverPosition({
          top: targetTopWithTargetHeight + popoverHeight > window.innerHeight && posTop < popoverHeight 
          ? targetTopCenter 
            : posTop < popoverHeight 
              ? targetTopWithTargetHeight 
              : posTop - popoverHeight,
          left: targetLeftCenterWithPopover < 0 ? 0 : targetLeftCenterWithPopover + popoverWidth > window.innerWidth ? window.innerWidth - popoverWidth : targetLeftCenterWithPopover,
        });
      }

      if(isScrolled) {
        setTimeout(updatePos, 500);
      } else {
        updatePos();
      }

      return () => {
        targetElement.style.backgroundColor = "";
        targetElement.style.zIndex = "";
        targetElement.style.position = "";
      }
    }
  };

  useEffect(() => {
    if (!active) return;

    return updatePopoverPosition();
  }, [active, currentStep]);

  const interactionRegistration = () => {
    const targetElement = document.querySelector<HTMLElement>(`[data-tutorial-target="${step.target}"]`);
    if (!targetElement) return;
    const handler = () => {
      nextStep();
    }

    targetElement.addEventListener('click', handler)

    return () => {
      targetElement.removeEventListener('click', handler)
    }
  }

  useEffect(() => {
    if(!active || !step.interactionRequired) return;

    return interactionRegistration();
  }, [active, currentStep])

  if(!active) return null;

  return (
    <>
      <div ref={overlayRef} className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-[clip-path] duration-300 ease-in-out" />
      <Popover.Root open={active}>
        <Popover.Portal>
          <Popover.Content
            ref={popoverRef}
            className={classNames("sm:w-96 w-screen z-50 bg-white p-4 rounded-lg shadow-lg border border-gray-200 transition-[top,left] duration-300 ease-in-out", {
              "opacity-0": firstRender,
              "opacity-100": !firstRender,
            })}
            onTransitionEnd={() => {
              if(currentStep === 0) {
                setFirstRender(false)
              }
            }}
            style={{
              position: 'absolute',
              top: `${popoverPosition.top}px`,
              left: `${popoverPosition.left}px`,
            }}
          >
            <h3 className="font-semibold mb-2 text-gray-800 text-center">Step {currentStep + 1}</h3>
            <p className="text-sm text-gray-600 text-center">{steps[currentStep].content}</p>
            <div className="flex justify-between mt-4">
              <Button 
                onClick={prevStep} 
                disabled={currentStep === 0}
              >
                Prev
              </Button>
              <div className="flex gap-2">
                {currentStep !== steps.length - 1 && (
                  <Button 
                    onClick={onFinish} 
                  >
                    Skip
                  </Button>
                )}
                <Button 
                  onClick={nextStep}
                  disabled={step.interactionRequired}
                >
                  {currentStep === steps.length - 1 ? 'Done' : 'Next'}
                </Button>
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  )
}