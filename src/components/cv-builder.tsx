"use client";

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Star, Plus, Trash2, GripVertical, ChevronLeft, ChevronRight } from "lucide-react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import * as Separator from "@radix-ui/react-separator"
import classNames from "classnames"

interface Skill {
  id: string;
  name: string;
  rating?: number;
}

interface WorkExperience {
  id: string;
  startDate: string;
  endDate: string;
  jobTitle: string;
  companyName: string;
  keyPoints: { id: string; text: string }[];
}

interface Education {
  id: string;
  details: string;
}

interface CVSettings {
  sectionOrder: ('skills' | 'workExperience' | 'education')[];
  font: string;
  themeColor: string;
  template: string;
}

const SortableItem = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact'];
const templates = ['Classic', 'Modern', 'Minimalist', 'Creative', 'Professional'];

export function CVBuilder() {
  const [cvData, setCVData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    skills: [] as Skill[],
    workExperience: [] as WorkExperience[],
    education: [] as Education[],
    photo: null as string | null,
  })

  const [cvSettings, setCVSettings] = useState<CVSettings>({
    sectionOrder: ['skills', 'workExperience', 'education'],
    font: 'Arial',
    themeColor: '#10b981', // Emerald 500 color
    template: 'Classic',
  })

  const [skillInput, setSkillInput] = useState('')
  const [showRatings, setShowRatings] = useState(false)
  const [newEducation, setNewEducation] = useState('')
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCVData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value)
  }

  const addSkill = () => {
    if (skillInput.trim()) {
      const newSkill: Skill = {
        id: Date.now().toString(),
        name: skillInput.trim(),
        rating: showRatings ? 5 : undefined
      }
      setCVData(prevData => ({
        ...prevData,
        skills: [...prevData.skills, newSkill]
      }))
      setSkillInput('')
    }
  }

  const removeSkill = (skillId: string) => {
    setCVData(prevData => ({
      ...prevData,
      skills: prevData.skills.filter(skill => skill.id !== skillId)
    }))
  }

  const updateSkillRating = (skillId: string, rating: number) => {
    setCVData(prevData => ({
      ...prevData,
      skills: prevData.skills.map(skill => 
        skill.id === skillId ? { ...skill, rating } : skill
      )
    }))
  }

  const toggleRatings = () => {
    setShowRatings(prev => !prev)
    setCVData(prevData => ({
      ...prevData,
      skills: prevData.skills.map(skill => ({
        ...skill,
        rating: !showRatings ? 5 : undefined
      }))
    }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCVData(prevData => ({ ...prevData, photo: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      startDate: '',
      endDate: '',
      jobTitle: '',
      companyName: '',
      keyPoints: [],
    }
    setCVData(prevData => ({
      ...prevData,
      workExperience: [...prevData.workExperience, newExperience]
    }))
  }

  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: string) => {
    console.log(id, field, value)
    setCVData(prevData => ({
      ...prevData,
      workExperience: prevData.workExperience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const addKeyPoint = (expId: string) => {
    setCVData(prevData => ({
      ...prevData,
      workExperience: prevData.workExperience.map(exp =>
        exp.id === expId ? { ...exp, keyPoints: [...exp.keyPoints, { id: Date.now().toString(), text: "''" }] } : exp
      )
    }))
  }

  const updateKeyPoint = (expId: string, pointId: string, value: string) => {
    setCVData(prevData => ({
      ...prevData,
      workExperience: prevData.workExperience.map(exp =>
        exp.id === expId ? {
          ...exp,
          keyPoints: exp.keyPoints.map(point => point.id === pointId ? { ...point, text: value } : point)
        } : exp
      )
    }))
  }

  const removeKeyPoint = (expId: string, pointId: string) => {
    setCVData(prevData => ({
      ...prevData,
      workExperience: prevData.workExperience.map(exp =>
        exp.id === expId ? {
          ...exp,
          keyPoints: exp.keyPoints.filter(point => point.id !== pointId)
        } : exp
      )
    }))
  }

  const removeWorkExperience = (id: string) => {
    setCVData(prevData => ({
      ...prevData,
      workExperience: prevData.workExperience.filter(exp => exp.id !== id)
    }))
  }

  const addEducation = () => {
    if (newEducation.trim()) {
      setCVData(prevData => ({
        ...prevData,
        education: [...prevData.education, { id: Date.now().toString(), details: newEducation.trim() }]
      }))
      setNewEducation('')
    }
  }

  const updateEducation = (id: string, details: string) => {
    setCVData(prevData => ({
      ...prevData,
      education: prevData.education.map(edu => edu.id === id ? { ...edu, details } : edu)
    }))
  }

  const removeEducation = (id: string) => {
    setCVData(prevData => ({
      ...prevData,
      education: prevData.education.filter(edu => edu.id !== id)
    }))
  }

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    const { active, over } = event;

    if (active.id !== over?.id) {
      const getItems = (type: string) => {
        switch (type) {
          case 'skills':
            return cvData.skills;
          case 'workExperience':
            return cvData.workExperience;
          case 'education':
            return cvData.education;
          case 'sectionOrder':
            return cvSettings.sectionOrder;
          default:
            return [];
        }
      };

      const setItems = (type: string, newItems: any[]) => {
        switch (type) {
          case 'skills':
            setCVData(prev => ({ ...prev, skills: newItems }));
            break;
          case 'workExperience':
            setCVData(prev => ({ ...prev, workExperience: newItems }));
            break;
          case 'education':
            setCVData(prev => ({ ...prev, education: newItems }));
            break;
          case 'sectionOrder':
            setCVSettings(prev => ({ ...prev, sectionOrder: newItems }));
            break;
        }
      };

      const type = active.data.current?.type || event.active.data.current?.type;
      const items = getItems(type);
      const oldIndex = items.findIndex((item: any) => item.id === active.id);
      const newIndex = items.findIndex((item: any) => item.id === over?.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(type, newItems);
    }
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (isDragging) {
      const containerWidth = window.innerWidth;
      const newLeftPanelWidth = (e.clientX / containerWidth) * 100;
      setLeftPanelWidth(Math.min(Math.max(newLeftPanelWidth, 20), 80));
    }
  };

  return (
    <div className={classNames("min-h-screen bg-white flex flex-col md:flex-row dark:bg-neutral-950", { "select-none": isDragging })} onMouseMove={handleDrag}>
      {/* Left side - Tabs */}
      {showLeftPanel && (
        <div className="w-full md:w-[50%]" style={{ width: `${leftPanelWidth}%` }}>
          <Tabs defaultValue="cv-info" className="w-full">
            <TabsList className="w-full bg-emerald-100 p-1 rounded-lg">
              <TabsTrigger
                value="cv-info"
                className="w-1/2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-md transition-all"
              >
                CV Information
              </TabsTrigger>
              <TabsTrigger
                value="cv-settings"
                className="w-1/2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-md transition-all"
              >
                CV Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="cv-info">
              <ScrollArea className="h-[calc(100vh-100px)] p-6 ">
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="photo">Photo</Label>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={cvData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={cvData.email}
                      onChange={handleInputChange}
                      placeholder="johndoe@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={cvData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      name="summary"
                      value={cvData.summary}
                      onChange={handleInputChange}
                      placeholder="Brief overview of your professional background and goals"
                      rows={4}
                    />
                  
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label htmlFor="skills">Skills</Label>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="show-ratings"
                          checked={showRatings}
                          onCheckedChange={toggleRatings}
                        />
                        <Label htmlFor="show-ratings">Show Ratings</Label>
                      </div>
                    </div>
                    <div className="flex items-center mb-2">
                      <Input
                        id="skills"
                        value={skillInput}
                        onChange={handleSkillInputChange}
                        placeholder="Add a skill"
                        className="mr-2"
                      />
                      <Button type="button" onClick={addSkill}>Add</Button>
                    </div>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                      <SortableContext items={cvData.skills.map(s => s.id)} strategy={verticalListSortingStrategy}>
                        {cvData.skills.map(skill => (
                          <SortableItem key={skill.id} id={skill.id}>
                            <div className="flex items-center mb-2">
                              <GripVertical className="mr-2 cursor-move" />
                              <Badge variant="secondary" className="text-sm flex items-center flex-grow">
                                {skill.name}
                                {showRatings && (
                                  <span className="ml-1 flex items-center">
                                    <Star className="w-3 h-3 fill-primary mr-1" />
                                    {skill.rating}
                                  </span>
                                )}
                              </Badge>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeSkill(skill.id)}
                                className="ml-2"
                              >
                                <X size={14} />
                              </Button>
                            </div>
                            {showRatings && (
                              <Slider
                                min={1}
                                max={10}
                                step={1}
                                value={[skill.rating || 5]}
                                onValueChange={([value]) => updateSkillRating(skill.id, value)}
                                className="mb-4"
                              />
                            )}
                          </SortableItem>
                        ))}
                      </SortableContext>
                    </DndContext>
                  </div>
                  <div>
                    <Label>Work Experience</Label>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                      <SortableContext items={cvData.workExperience.map(exp => exp.id)} strategy={verticalListSortingStrategy}>
                        {cvData.workExperience.map((exp, index) => (
                          <SortableItem key={exp.id} id={exp.id}>
                            <Card className="mt-4">
                              <CardContent className="pt-6">
                                <div className="flex items-center mb-4">
                                  <GripVertical className="mr-2 cursor-move" />
                                  <h3 className="text-lg font-semibold flex-grow">Work Experience {index + 1}</h3>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeWorkExperience(exp.id)}
                                  >
                                    Remove
                                  </Button>
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
                                  <div>
                                    <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                                    <Input
                                      id={`end-date-${exp.id}`}
                                      type="date"
                                      value={exp.endDate}
                                      onChange={(e) => updateWorkExperience(exp.id, "endDate", e.target.value)}
                                    />
                                  </div>
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
                                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                    <SortableContext items={exp.keyPoints.map(kp => kp.id)} strategy={verticalListSortingStrategy}>
                                      {exp.keyPoints.map((point) => (
                                        <SortableItem key={point.id} id={point.id}>
                                          <div className="flex items-center mt-2">
                                            <GripVertical className="mr-2 cursor-move" />
                                            <Input
                                              value={point.text}
                                              onChange={(e) => updateKeyPoint(exp.id, point.id, e.target.value)}
                                              placeholder="Key achievement or responsibility"
                                            />
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="icon"
                                              onClick={() => removeKeyPoint(exp.id, point.id)}
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        </SortableItem>
                                      ))}
                                    </SortableContext>
                                  </DndContext>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addKeyPoint(exp.id)}
                                    className="mt-2"
                                  >
                                    <Plus className="h-4 w-4 mr-2" /> Add Key Point
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </SortableItem>
                        ))}
                      </SortableContext>
                    </DndContext>
                    <Button
                      type="button"
                      onClick={addWorkExperience}
                      className="mt-4"
                    >
                      Add Work Experience
                    </Button>
                  </div>
                  <div>
                    <Label>Education</Label>
                    <div className="flex items-center mt-2">
                      <Input
                        value={newEducation}
                        onChange={(e) => setNewEducation(e.target.value)}
                        placeholder="Add education (e.g., BS in Computer Science, XYZ University)"
                      />
                      <Button
                        type="button"
                        onClick={addEducation}
                        className="ml-2"
                      >
                        Add
                      </Button>
                    </div>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                      <SortableContext items={cvData.education.map(edu => edu.id)} strategy={verticalListSortingStrategy}>
                        {cvData.education.map((edu) => (
                          <SortableItem key={edu.id} id={edu.id}>
                            <div className="flex items-center mt-2">
                              <GripVertical className="mr-2 cursor-move" />
                              <Input
                                value={edu.details}
                                onChange={(e) => updateEducation(edu.id, e.target.value)}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeEducation(edu.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </SortableItem>
                        ))}
                      </SortableContext>
                    </DndContext>
                  </div>
                  <Button type="submit">Save CV</Button>
                </form>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="cv-settings">
              <ScrollArea className="h-[calc(100vh-100px)] p-6 bg-emerald-50">
                <div className="space-y-6">
                  <div>
                    <Label>Section Order</Label>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                      <SortableContext items={cvSettings.sectionOrder} strategy={verticalListSortingStrategy}>
                        {cvSettings.sectionOrder.map((section) => (
                          <SortableItem key={section} id={section}>
                            <div className="flex items-center mt-2 bg-white p-2 rounded dark:bg-neutral-950">
                              <GripVertical className="mr-2 cursor-move" />
                              <span className="capitalize">{section}</span>
                            </div>
                          </SortableItem>
                        ))}
                      </SortableContext>
                    </DndContext>
                  </div>
                  <div>
                    <Label htmlFor="font">Font</Label>
                    <Select
                      value={cvSettings.font}
                      onValueChange={(value) => setCVSettings(prev => ({ ...prev, font: value }))}
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
                      value={cvSettings.themeColor}
                      onChange={(e) => setCVSettings(prev => ({ ...prev, themeColor: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="template">Template</Label>
                    <Select
                      value={cvSettings.template}
                      onValueChange={(value) => setCVSettings(prev => ({ ...prev, template: value }))}
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
            </TabsContent>
          </Tabs>
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col space-y-2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowLeftPanel(!showLeftPanel)}
            className="bg-emerald-100 hover:bg-emerald-200"
          >
            {showLeftPanel ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowRightPanel(!showRightPanel)}
            className="bg-emerald-100 hover:bg-emerald-200"
          >
            {showRightPanel ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </Separator.Root>

      {/* Right side - Preview */}
      {showRightPanel && (
        <div className="w-full md:w-[50%]" style={{ width: `${100 - leftPanelWidth}%` }}>
          <div className="p-6 bg-white h-full">
            <h2 className="text-2xl font-bold mb-6 text-emerald-700">CV Preview</h2>
            <ScrollArea className="h-[calc(100vh-100px)] border border-neutral-200 border-emerald-200 rounded-md p-4 dark:border-neutral-800">
              <div className="space-y-6" style={{ fontFamily: cvSettings.font, color: cvSettings.themeColor }}>
                {cvData.photo && (
                  <div className="flex justify-center">
                    <img src={cvData.photo} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
                  </div>
                )}
                <div>
                  <h1 className="text-3xl font-bold">{cvData.name || 'Your Name'}</h1>
                  <p>{cvData.email}</p>
                  <p>{cvData.phone}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Professional Summary</h2>
                  <p>{cvData.summary}</p>
                </div>
                {cvSettings.sectionOrder.map((section) => (
                  <div key={section}>
                    {section === 'skills' && (
                      <div>
                        <h2 className="text-xl font-semibold">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                          {cvData.skills.map(skill => (
                            <Badge key={skill.id} variant="secondary" className="text-sm flex items-center">
                              {skill.name}
                              {showRatings && skill.rating && (
                                <span className="ml-1 flex items-center">
                                  <Star className="w-3 h-3 fill-primary mr-1" />
                                  {skill.rating}
                                </span>
                              )}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {section === 'workExperience' && (
                      <div>
                        <h2 className="text-xl font-semibold">Work Experience</h2>
                        {cvData.workExperience.map((exp) => (
                          <div key={exp.id} className="mt-4">
                            <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                            <p className="text-neutral-500 dark:text-neutral-400">{exp.companyName}</p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">{exp.startDate} - {exp.endDate}</p>
                            <ul className="list-disc list-inside mt-2">
                              {exp.keyPoints.map((point) => (
                                <li key={point.id}>{point.text}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                    {section === 'education' && (
                      <div>
                        <h2 className="text-xl font-semibold">Education</h2>
                        <ul className="list-disc list-inside">
                          {cvData.education.map((edu) => (
                            <li key={edu.id}>{edu.details}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  )
}