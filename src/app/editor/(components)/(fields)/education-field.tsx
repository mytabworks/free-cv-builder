import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, GripVertical } from "lucide-react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useCVBuilder } from "../cv-builder-context";
import { SortableItem } from "@/components/sortable-item";

export function CVEducationField() {
  const { data: { education }, setData } = useCVBuilder()
	const [newEducation, setNewEducation] = useState('')

	const addEducation = () => {
    if (newEducation.trim()) {
      setData(prev => ({
        ...prev,
        education: [...prev.education, { id: crypto.randomUUID(), details: newEducation.trim() }]
      }))
      setNewEducation('')
    }
  }

  const updateEducation = (id: string, details: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, details } : edu)
    }))
  }

  const removeEducation = (id: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
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

      const items = education
      const oldIndex = items.findIndex((item: any) => item.id === active.id);
      const newIndex = items.findIndex((item: any) => item.id === over?.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setData(prev => ({ ...prev, education: newItems }));
    }
  };

  return (
    <fieldset className="space-y-2 border border-neutral-300 hover:border-neutral-500 focus-within:border-neutral-500 p-4 rounded-md bg-white">
			<h2 className="text-xl">EDUCATION</h2>
			<form 
				className="flex items-center mb-2" 
				onSubmit={(e) => {
					e.preventDefault()
					addEducation()
				}}
			>
				<Input
					value={newEducation}
					onChange={(e) => setNewEducation(e.target.value)}
					placeholder="Add education (e.g., BS in Computer Science, XYZ University)"
					className="mr-2"
					required
				/>
				<Button type="submit">Add</Button>
			</form>
			<DndContext 
				sensors={sensors} 
				collisionDetection={closestCenter} 
				onDragEnd={handleDragEnd}
			>
				<SortableContext items={education.map(item => item.id)} strategy={verticalListSortingStrategy}>
					{education.map((item) => (
						<SortableItem 
							key={item.id} 
							id={item.id} 
							className="flex items-center mt-2"
							gripIcon={<GripVertical className="mr-2 cursor-grab active:cursor-grabbing" />}
							
						>
							<div 
								className="flex items-center w-full" 
								onPointerDown={(e) => e.stopPropagation()}
							>
								<Input
									value={item.details}
									onChange={(e) => updateEducation(item.id, e.target.value)}
								/>
								<Button
									type="button"
									variant="hover-danger"
									className="ml-2"
									size="icon"
									onClick={() => removeEducation(item.id)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</SortableItem>
					))}
				</SortableContext>
			</DndContext>
		</fieldset>
  )
}