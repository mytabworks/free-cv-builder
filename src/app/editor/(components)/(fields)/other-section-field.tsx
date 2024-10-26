import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, GripVertical, Plus, ChevronDown } from "lucide-react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { TWOtherSection, useCVBuilder } from "../cv-builder-context";
import { SortableItem } from "@/components/sortable-item";
import { Card, CardContent } from "@/components/ui/card";
import { ModalConfirm } from "@/components/ui/modal"
import { useState } from "react"
import * as Accordion from "@radix-ui/react-accordion";
import { randomUUID } from "@/lib/random-UUID"

export function CVOtherSectionField() {
  const { data: { otherSections }, setData } = useCVBuilder()

	const addOtherSection = () => {
    const newSection: TWOtherSection = {
      id: randomUUID(),
      title: '',
      keyPoints: [],
    }

    setData(prev => ({
      ...prev,
      otherSections: [...prev.otherSections, newSection]
    }))
  }

  const updateOtherSection = (id: string, field: keyof TWOtherSection, value: string | boolean) => {
    setData(prev => ({
      ...prev,
      otherSections: prev.otherSections.map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    }))
  }

  const addKeyPoint = (sectionId: string) => {
    setData(prev => ({
      ...prev,
      otherSections: prev.otherSections.map(section =>
        section.id === sectionId ? { 
					...section, 
					keyPoints: [
						...section.keyPoints, 
						{ 
							id: randomUUID(), 
							text: "" 
						}
					] 
				} : section
      )
    }))
  }

  const updateKeyPoint = (sectionId: string, pointId: string, value: string) => {
    setData(prev => ({
      ...prev,
      otherSections: prev.otherSections.map(section =>
        section.id === sectionId ? {
          ...section,
          keyPoints: section.keyPoints.map(point => point.id === pointId ? { ...point, text: value } : point)
        } : section
      )
    }))
  }

  const removeKeyPoint = (sectionId: string, pointId: string) => {
    setData(prev => ({
      ...prev,
      otherSections: prev.otherSections.map(section =>
        section.id === sectionId ? {
          ...section,
          keyPoints: section.keyPoints.filter(point => point.id !== pointId)
        } : section
      )
    }))
  }

	const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

	const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {

      const items = otherSections
      const oldIndex = items.findIndex((item: any) => item.id === active.id);
      const newIndex = items.findIndex((item: any) => item.id === over?.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setData(prev => ({ ...prev, otherSections: newItems }));
    }
  };

	const handleKeyPointDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

		if (active.id === over?.id && !over) return;

		const [sectionId, activePointId] = (active?.id as string).split('@')
		const [, overPointId] = (over?.id as string).split('@')

		if (activePointId === overPointId) return;

		const section = otherSections.find(section => section.id === sectionId)

		const items = section?.keyPoints || []
		const oldIndex = items.findIndex((item: any) => item.id === activePointId);
		const newIndex = items.findIndex((item: any) => item.id === overPointId);

		const newItems = arrayMove(items, oldIndex, newIndex);

		setData(prev => ({
      ...prev,
      otherSections: prev.otherSections.map(section =>
        section.id === sectionId ? {
          ...section,
          keyPoints: newItems
        } : section
      )
    }))
  };

	const [remove, setRemove] = useState<string | null>(null);

	const preventDragConflict = (e: any) => e.stopPropagation()

  return (
    <fieldset className="space-y-2 border border-neutral-300 hover:border-neutral-500 focus-within:border-neutral-500 p-4 rounded-md bg-white">
			<h2 className="text-xl mb-3">OTHER SECTION</h2>
			<ModalConfirm
				show={remove !== null}
				title={(<div className="flex"><Trash2 className="mr-1" /> Remove {remove ? otherSections.find(section => section.id !== remove)?.title || 'Section' : ''}?</div>)}
				message="Are you sure you want to continue?"
				onConfirm={(confirm) => {
					if (confirm) {
						setData(prev => ({
							...prev,
							otherSections: prev.otherSections.filter(section => section.id !== remove)
						}))
					}

					setRemove(null)
				}}
			/>
			<div className="group">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={otherSections.map(section => section.id)} strategy={verticalListSortingStrategy}>
            {otherSections.map((section, index) => (
              <SortableItem 
                key={section.id} 
                id={section.id} 
                className="flex items-center"
              >
                <Card className="group-[:has([data-state='open']):hover]:opacity-30 group-[:has([data-state='open']):focus-within]:opacity-30 hover:!opacity-100 focus-within:!opacity-100 focus-within:border-neutral-500 hover:border-neutral-500 mb-4 w-full">
                  <CardContent className="pt-6">
                    <Accordion.Root type="single" defaultValue={section.keyPoints.length === 0 ? section.id : undefined} collapsible className="w-full">
                      <Accordion.Item value={section.id} className="w-full">
                        <Accordion.Trigger className="group/accordion w-full hover:no-underline" onClick={(e) => (e.target as HTMLElement)?.closest('button')?.blur()}>
                          <div className="flex items-center">
                            <GripVertical className="mr-2 cursor-grab active:cursor-grabbing" />
                            <div className="flex justify-between align-center gap-4 flex-1" onPointerDown={preventDragConflict}>
                              <div>
                                <h3 className="text-lg font-semibold flex-grow mb-0">{section.title || `Section ${index + 1}`}</h3>
                              </div>
                            </div>
                            <Button
                              as="a"
                              type="button"
                              variant="secondary"
                              size="sm"
                              className="ml-2"
                              onPointerDown={preventDragConflict}
                            >
                              <ChevronDown className="group-[[data-state='open']]/accordion:rotate-180 h-4 w-4" />
                            </Button>
                            <Button
                              as="a"
                              type="button"
                              variant="danger"
                              size="sm"
                              className="ml-2"
                              onPointerDown={preventDragConflict}
                              onClick={(e) => {
                                e.stopPropagation()
                                setRemove(section.id)
                              }}
                            >
                              <Trash2/>
                            </Button>
                          </div>
                        </Accordion.Trigger>
                        <Accordion.Content>
                          <div onPointerDown={preventDragConflict} onKeyDown={preventDragConflict}>
                            <div className="mt-4">
                              <Label htmlFor={`section-title-${section.id}`}>Section Title</Label>
                              <Input
                                id={`section-title-${section.id}`}
                                value={section.title}
                                onChange={(e) => updateOtherSection(section.id, "title", e.target.value)}
                                placeholder="Education, Certifications, Achievements, etc."
                              />
                            </div>
                            <div className="mt-4">
                              <Label>Key Items</Label>
                              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleKeyPointDragEnd}>
                                <SortableContext items={section.keyPoints.map(point => `${section.id}@${point.id}`)} strategy={verticalListSortingStrategy}>
                                  {section.keyPoints.map((point) => (
                                    <SortableItem 
                                      key={point.id} 
                                      id={`${section.id}@${point.id}`}
                                      className="flex items-center mt-2"
                                      gripIcon={<GripVertical className="mr-2 cursor-grab active:cursor-grabbing" />}
                                    >
                                      <div className="flex items-center w-full" onPointerDown={preventDragConflict} onKeyDown={preventDragConflict}>
                                        <Input
                                          value={point.text}
                                          onChange={(e) => updateKeyPoint(section.id, point.id, e.target.value)}
                                          onKeyDown={(e) => e.key === 'Enter' && addKeyPoint(section.id)}
                                          placeholder={`${section.title || ''} item`}
                                          autoFocus
                                        />
                                        <Button
                                          type="button"
                                          size="icon"
                                          variant="hover-danger"
                                          className="ml-2"
                                          onClick={() => removeKeyPoint(section.id, point.id)}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </SortableItem>
                                  ))}
                                </SortableContext>
                              </DndContext>
                              <div />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addKeyPoint(section.id)}
                                className="mt-2"
                              >
                                <Plus /> Add Key Item
                              </Button>
                            </div>
                          </div>
                        </Accordion.Content>
                      </Accordion.Item>
                    </Accordion.Root>
                  </CardContent>
                </Card>
                    
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
			</div>
			<Button
				type="button"
				onClick={addOtherSection}
				className="mt-4"
			>
				<Plus /> Add Section
			</Button>
		</fieldset>   
  )
}