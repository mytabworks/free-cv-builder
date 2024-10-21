import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, GripVertical, Plus, Check } from "lucide-react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { TWorkExperience, useCVBuilder } from "../cv-builder-context";
import { SortableItem } from "@/components/sortable-item";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"
import { ModalConfirm } from "@/components/ui/modal"
import { useMemo, useState } from "react"
import { Switch } from "@/components/ui/switch"

export function CVWorkExperienceField() {
  const { data: { workExperiences }, setData } = useCVBuilder()

	const hasCurrentRole = useMemo(() => workExperiences.some(exp => exp.currentRole), [workExperiences])

	const addWorkExperience = () => {
    const newExperience: TWorkExperience = {
      id: crypto.randomUUID(),
      startDate: '',
      endDate: '',
      jobTitle: '',
      companyName: '',
      keyPoints: [],
			currentRole: false,
			showMonth: false
    }

    setData(prev => ({
      ...prev,
      workExperiences: [...prev.workExperiences, newExperience]
    }))
  }

  const updateWorkExperience = (id: string, field: keyof TWorkExperience, value: string | boolean) => {
    setData(prev => ({
      ...prev,
      workExperiences: prev.workExperiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const addKeyPoint = (expId: string) => {
    setData(prev => ({
      ...prev,
      workExperiences: prev.workExperiences.map(exp =>
        exp.id === expId ? { 
					...exp, 
					keyPoints: [
						...exp.keyPoints, 
						{ 
							id: crypto.randomUUID(), 
							text: "" 
						}
					] 
				} : exp
      )
    }))
  }

  const updateKeyPoint = (expId: string, pointId: string, value: string) => {
    setData(prev => ({
      ...prev,
      workExperiences: prev.workExperiences.map(exp =>
        exp.id === expId ? {
          ...exp,
          keyPoints: exp.keyPoints.map(point => point.id === pointId ? { ...point, text: value } : point)
        } : exp
      )
    }))
  }

  const removeKeyPoint = (expId: string, pointId: string) => {
    setData(prev => ({
      ...prev,
      workExperiences: prev.workExperiences.map(exp =>
        exp.id === expId ? {
          ...exp,
          keyPoints: exp.keyPoints.filter(point => point.id !== pointId)
        } : exp
      )
    }))
  }

	const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

	const handleWEDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {

      const items = workExperiences
      const oldIndex = items.findIndex((item: any) => item.id === active.id);
      const newIndex = items.findIndex((item: any) => item.id === over?.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setData(prev => ({ ...prev, workExperiences: newItems }));
    }
  };

	const handleKeyPointDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

		if (active.id === over?.id && !over) return;

		const [expId, activePointId] = (active?.id as string).split('@')
		const [, overPointId] = (over?.id as string).split('@')

		if (activePointId === overPointId) return;

		const experience = workExperiences.find(exp => exp.id === expId)

		const items = experience?.keyPoints || []
		const oldIndex = items.findIndex((item: any) => item.id === activePointId);
		const newIndex = items.findIndex((item: any) => item.id === overPointId);

		const newItems = arrayMove(items, oldIndex, newIndex);

		setData(prev => ({
      ...prev,
      workExperiences: prev.workExperiences.map(exp =>
        exp.id === expId ? {
          ...exp,
          keyPoints: newItems
        } : exp
      )
    }))
  };

	const [remove, setRemove] = useState<string | null>(null);

  return (
    <fieldset className="space-y-2 border border-neutral-200 p-4 rounded-md bg-white">
			<Label>WORK EXPERIENCE</Label>
			<ModalConfirm
				show={remove !== null}
				title={(<div className="flex"><Trash2 className="mr-1" /> Remove Work Experience?</div>)}
				message="Are you sure you want to continue?"
				onConfirm={(confirm) => {
					if (confirm) {
						setData(prev => ({
							...prev,
							workExperiences: prev.workExperiences.filter(exp => exp.id !== remove)
						}))
					}

					setRemove(null)
				}}
			/>
			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleWEDragEnd}>
				<SortableContext items={workExperiences.map(exp => exp.id)} strategy={verticalListSortingStrategy}>
					{workExperiences.map((exp, index) => (
						<SortableItem 
							key={exp.id} 
							id={exp.id} 
							className="flex items-center mt-2"
						>
							<Card className="mt-4 w-full bg-zinc-50">
								<CardContent className="pt-6">
									<div className="flex items-center mb-4">
										<GripVertical className="mr-2 cursor-grab active:cursor-grabbing" />
										<div className="flex justify-between align-center gap-4 flex-1">
											<div>
												<h3 className="text-lg font-semibold flex-grow mb-0">{exp.jobTitle || `Work Experience ${index + 1}`}</h3>
												<span className="text-sm text-neutral-500 dark:text-neutral-400">{exp.companyName}</span>
											</div>
											<div className="flex items-center space-x-2">
												<span className="text-sm text-neutral-500 dark:text-neutral-400">
													{exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: exp.showMonth ? 'short' : undefined }) : ''}
													{" - "}
													{exp.currentRole ? "Present" : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: exp.showMonth ? 'short' : undefined }) : ''}
												</span>
											</div>
										</div>
										<Button
											type="button"
											variant="danger"
											size="sm"
											className="ml-2"
											onPointerDown={(e) => e.stopPropagation()}
											onClick={() => setRemove(exp.id)}
										>
											Remove
										</Button>
									</div>
									<div onPointerDown={(e) => e.stopPropagation()}>
										<div className="grid grid-cols-2 gap-4">
											<div className="flex items-center space-x-2 mb-3">
												<Switch
													id={`current-role-${exp.id}`}
													checked={exp.currentRole}
													disabled={hasCurrentRole && !exp.currentRole }
													onCheckedChange={(checked) => updateWorkExperience(exp.id, "currentRole", checked)}
												/>
												<Label htmlFor={`current-role-${exp.id}`}>Current Role</Label>
											</div>
											<div className="flex items-center space-x-2 mb-3">
												<Switch
													id={`show-month-${exp.id}`}
													checked={exp.showMonth}
													onCheckedChange={(checked) => updateWorkExperience(exp.id, "showMonth", checked)}
												/>
												<Label htmlFor={`show-month-${exp.id}`}>Show Month</Label>
											</div>
										</div>
										<div className="grid grid-cols-2 gap-4">
											<div>
												<Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
												<Input
													id={`start-date-${exp.id}`}
													type="date"
													value={exp.startDate}
													onChange={(e) => updateWorkExperience(exp.id, "startDate", e.target.value)}
												/>
											</div>
											{!exp.currentRole && (
												<div>
													<Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
													<Input
														id={`end-date-${exp.id}`}
														type="date"
														value={exp.endDate}
														onChange={(e) => updateWorkExperience(exp.id, "endDate", e.target.value)}
													/>
												</div>
											)}
										</div>
										<div className="mt-4">
											<Label htmlFor={`job-title-${exp.id}`}>Job Title</Label>
											<Input
												id={`job-title-${exp.id}`}
												value={exp.jobTitle}
												onChange={(e) => updateWorkExperience(exp.id, "jobTitle", e.target.value)}
												placeholder="Software Engineer"
											/>
										</div>
										<div className="mt-4">
											<Label htmlFor={`company-name-${exp.id}`}>Company Name</Label>
											<Input
												id={`company-name-${exp.id}`}
												value={exp.companyName}
												onChange={(e) => updateWorkExperience(exp.id, "companyName", e.target.value)}
												placeholder="Acme Inc."
											/>
										</div>
										<div className="mt-4">
											<Label>Key Points</Label>
											<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleKeyPointDragEnd}>
												<SortableContext items={exp.keyPoints.map(point => `${exp.id}@${point.id}`)} strategy={verticalListSortingStrategy}>
													{exp.keyPoints.map((point) => (
														<SortableItem 
															key={point.id} 
															id={`${exp.id}@${point.id}`}
															className="flex items-center mt-2"
															gripIcon={<GripVertical className="mr-2 cursor-grab active:cursor-grabbing" />}
														>
															<div className="flex items-center w-full" onPointerDown={(e) => e.stopPropagation()}>
																<Textarea
																	value={point.text}
																	onChange={(e) => updateKeyPoint(exp.id, point.id, e.target.value)}
																	placeholder="Key achievement or responsibility"
																	rows={2}
																/>
																<Button
																	type="button"
																	size="icon"
																	variant="hover-danger"
																	className="ml-2"
																	onClick={() => removeKeyPoint(exp.id, point.id)}
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
												onClick={() => addKeyPoint(exp.id)}
												className="mt-2"
											>
												<Plus /> Add Key Point
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						</SortableItem>
					))}
				</SortableContext>
			</DndContext>
			<div />
			<Button
				type="button"
				onClick={addWorkExperience}
				className="mt-4"
			>
				<Plus /> Add Work Experience
			</Button>
		</fieldset>   
  )
}