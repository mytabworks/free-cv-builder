import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCVBuilder } from "../cv-builder-context"
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableItem } from "@/components/sortable-item"
import { GripVertical } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact'];
const templates = ['Classic', 'Modern', 'Minimalist', 'Creative', 'Professional'];

export function CVSettingsForm() {
	const { data, setData } = useCVBuilder()

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

	const handleSelectChange = (name: string) => (value: string) => {
    setData(prev => ({ ...prev, [name]: value }))
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

      const items = data.sectionOrder
      const oldIndex = items.findIndex((item: any) => item === active.id);
      const newIndex = items.findIndex((item: any) => item === over?.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setData(prev => ({ ...prev, sectionOrder: newItems }));
    }
  };

  return (
    <ScrollArea className="h-[calc(100vh-100px)] p-6">
			<div className="space-y-6">
				<div>
					<Label>Section Order</Label>
					<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
						<SortableContext items={data.sectionOrder} strategy={verticalListSortingStrategy}>
							{data.sectionOrder.map((section) => (
								<SortableItem 
									key={section} 
									id={section}
									className="flex items-center mt-2 bg-white p-2 rounded dark:bg-neutral-950"
									gripIcon={<GripVertical className="mr-2 cursor-move" />}
								>
									<span className="capitalize">{section}</span>
								</SortableItem>
							))}
						</SortableContext>
					</DndContext>
				</div>
				<div>
					<Label htmlFor="font">Font</Label>
					<Select
						value={data.font}
						onValueChange={handleSelectChange('font')}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select a font" />
						</SelectTrigger>
						<SelectContent>
							{fonts.map((font) => (
								<SelectItem key={font} value={font}>{font}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div>
					<Label htmlFor="themeColor">Theme Color</Label>
					<Input
						id="themeColor"
						type="color"
						value={data.themeColor}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<Label htmlFor="template">Template</Label>
					<Select
						value={data.template}
						onValueChange={handleSelectChange('template')}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select a template" />
						</SelectTrigger>
						<SelectContent>
							{templates.map((template) => (
								<SelectItem key={template} value={template}>{template}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</ScrollArea>
  )
}