import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDown, GripVertical, Star, X } from "lucide-react"
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { TSkill, useCVBuilder } from "../cv-builder-context";
import { SortableItem } from "@/components/sortable-item";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import * as Accordion from "@radix-ui/react-accordion";
import { randomUUID } from "@/lib/random-UUID";
import { useSensorDefault } from "@/hooks/use-sensor-default";
import { skillOptions } from "@/constants/skills-options";

export function CVSkillsField() {
  const { data: { skills, showRatings, skillSplit }, setData } = useCVBuilder()
  const [skillInput, setSkillInput] = useState('')
	const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value)
  }

  const addSkill = () => {
    if (skillInput.trim()) {
      const newSkill: TSkill = {
        id: randomUUID(),
        name: skillInput.trim(),
        rating: 5
      }
      setData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }))
      setSkillInput('')
    }
  }

  const removeSkill = (skillId: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== skillId)
    }))
  }

  const updateSkillRating = (skillId: string, rating: number) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === skillId ? { ...skill, rating } : skill
      )
    }))
  }

  const toggleSwitch = (name: 'showRatings' | 'skillSplit') => () => {
    setData(prev => ({
      ...prev,
      [name]: !prev[name],
			skillRatingBlock: name === 'skillSplit' && !prev[name] ? false : prev.skillRatingBlock,
    }))
  }

	const sensors = useSensorDefault()

	const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {

      const items = skills
      const oldIndex = items.findIndex((item: TSkill) => item.id === active.id);
      const newIndex = items.findIndex((item: TSkill) => item.id === over?.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setData(prev => ({ ...prev, skills: newItems }));
    }
  };

  return (
    <fieldset data-tutorial-target="skills" className="space-y-2 border border-neutral-300 hover:border-neutral-500 focus-within:border-neutral-500 p-4 rounded-md bg-white">
			<Accordion.Root type="single" defaultValue="default" collapsible className="w-full">
				<Accordion.Item value="default" className="w-full">
					<Accordion.Trigger asChild className="flex justify-between items-center group/accordion w-full hover:no-underline flex-wrap">
						<a href="#">
							<h2 className="text-xl">SKILLS</h2>
							<div className="flex gap-5">
								<div className="group-[[data-state='closed']]/accordion:hidden flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
									<Switch
										id="skill-split"
										checked={skillSplit}
										onCheckedChange={toggleSwitch('skillSplit')}
									/>
									<Label htmlFor="skill-split">Split Column</Label>
								</div>
								<div className="group-[[data-state='closed']]/accordion:hidden flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
									<Switch
										id="show-ratings"
										checked={showRatings}
										onCheckedChange={toggleSwitch('showRatings')}
									/>
									<Label htmlFor="show-ratings">Show Ratings</Label>
								</div>
								<Button
									type="button"
									variant="secondary"
									size="sm"
									className="ml-2"
								>
									<ChevronDown className="group-[[data-state='open']]/accordion:rotate-180 h-4 w-4" />
								</Button>
							</div>
						</a>
					</Accordion.Trigger>
					<Accordion.Content className="pt-3">
						<form 
							className="flex items-center mb-2" 
							onSubmit={(e) => {
								e.preventDefault()
								addSkill()
							}}
						>
							<Input
								value={skillInput}
								onChange={handleSkillInputChange}
								placeholder="Add a skill (e.g. MS Excel)"
								className="mr-2"
								required
								list="skill-auto"
							/>
							<datalist id="skill-auto">
								{skillOptions.map((each) => (
									<option key={each} value={each}>{each}</option>
								))}
							</datalist>
							<Button type="submit">Add</Button>
						</form>
						<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
							<SortableContext items={skills.map(item => item.id)} strategy={verticalListSortingStrategy}>
								{skills.map(item => (
									<SortableItem 
										key={item.id} 
										id={item.id} 
										className="flex items-center bg-slate-200 px-1 mb-2 rounded-md"
										gripIcon={<GripVertical className="mr-2 cursor-grab active:cursor-grabbing" />}
									>
										<div 
											className="flex items-center justify-between w-full px-2 py-1" 
											onPointerDown={(e) => e.stopPropagation()}
											onTouchStart={(e) => e.stopPropagation()}
										>
											<div 
												className="w-full"
											>
												<Badge variant="primary" className="text-sm inline-flex items-center flex-grow">
													{item.name}
													{showRatings && (
														<span className="ml-1 flex items-center">
															<Star className="w-3 h-3 fill-primary mr-1" />
															{item.rating}
														</span>
													)}
												</Badge>
												{showRatings && (
													<Slider
														min={1}
														max={10}
														step={1}
														value={[item.rating || 5]}
														onValueChange={([value]) => updateSkillRating(item.id, value)}
														className="mt-2 w-full"
													/>
												)}
											</div>
											<Button
												type="button"
												variant="hover-danger"
												className="ml-2"
												size="icon"
												onClick={() => removeSkill(item.id)}
											>
												<X size={14} />
											</Button>
										</div>
									</SortableItem>
								))}
							</SortableContext>
						</DndContext>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</fieldset>
  )
}