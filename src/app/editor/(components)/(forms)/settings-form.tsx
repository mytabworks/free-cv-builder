import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCVBuilder } from "../cv-builder-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { googleFonts } from "@/lib/page-renderer"
import { Switch } from "@/components/ui/switch"
import { SkillSettingsForm } from "./skill-settings-form"
import { FieldsetAccordion } from "@/components/fieldset-accordion"

export function CVSettingsForm() {
	const { data, setData } = useCVBuilder()

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

	const handleGeneralTextColor = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value, primaryTextColor: value, secondaryTextColor: value }))
  }

	const handleSelectChange = (name: string) => (value: string) => {
    setData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <ScrollArea className="h-full">
			<FieldsetAccordion title="SETTINGS">
				<div>
					<form 
						className="flex items-center mb-5" 
						onSubmit={(e) => {
							e.preventDefault()
							const file = (e as any).target?.[0]?.files[0]
							
							if(file) {
								const reader = new FileReader()
								reader.onloadend = () => {
									const imported = JSON.parse(reader.result as string)
									console.log(imported)
									setData(prev => ({ ...prev, ...imported }))
								}
								reader.readAsText(file)
							}
						}}
					>
						<Input
							type="file"
							accept=".json"
							className="mr-2"
							required
						/>
						<Button type="submit">Import Data</Button>
					</form>
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
								<SelectItem key={template.value} value={template.value}>{template.label}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex gap-5">
					<div className="flex-1">
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
					<div className="flex-1">
						<Label htmlFor="textSize">General Text Size</Label>
						<div className="flex gap-2">
							<Input
								id="textSize"
								name="textSize"
								type="range"
								min={12}
								max={30}
								step={1}
								className="p-0"
								value={data.textSize}
								onChange={handleInputChange}
							/>
							<div className="w-[50px] bg-slate-100 rounded-md flex items-center justify-center text-sm">
								{data.textSize}
							</div>
						</div>
					</div>
				</div>
				<div className="flex gap-5">
					<div className="flex-1">
						<Label htmlFor="themeColor">Theme Color</Label>
						<Input
							id="themeColor"
							name="themeColor"
							type="color"
							className="p-1"
							value={data.themeColor}
							onChange={handleInputChange}
						/>
					</div>
					<div className="flex-1">
						<Label htmlFor="textColor">General Text Color</Label>
						<Input
							id="textColor"
							name="textColor"
							type="color"
							className="p-1"
							value={data.textColor}
							onChange={handleGeneralTextColor}
						/>
					</div>
				</div>
				<div className="flex gap-5">
					<div className="flex-1">
						<Label htmlFor="primaryBGColor">Primary Section BG Color</Label>
						<Input
							id="primaryBGColor"
							name="primaryBGColor"
							type="color"
							className="p-1"
							value={data.primaryBGColor}
							onChange={handleInputChange}
						/>
					</div>
					<div className="flex-1">
						<Label htmlFor="primaryTextColor">Primary Section Text Color</Label>
						<Input
							id="primaryTextColor"
							name="primaryTextColor"
							type="color"
							className="p-1"
							value={data.primaryTextColor}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="flex gap-5">
					<div className="flex-1">
						<Label htmlFor="secondaryBGColor">Secondary Section BG Color</Label>
						<Input
							id="secondaryBGColor"
							name="secondaryBGColor"
							type="color"
							className="p-1"
							value={data.secondaryBGColor}
							onChange={handleInputChange}
						/>
					</div>
					<div className="flex-1">
						<Label htmlFor="secondaryTextColor">Secondary Section Text Color</Label>
						<Input
							id="secondaryTextColor"
							name="secondaryTextColor"
							type="color"
							className="p-1"
							value={data.secondaryTextColor}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="flex gap-5">
					<div className="flex-1">
						<Label htmlFor="photoSize">Photo Size</Label>
						<div className="flex gap-2">
							<Input
								id="photoSize"
								name="photoSize"
								type="range"
								min={50}
								max={100}
								step={5}
								className="p-0"
								value={data.photoSize}
								onChange={handleInputChange}
							/>
							<div className="w-[50px] bg-slate-100 rounded-md flex items-center justify-center text-sm">
								{data.photoSize}%
							</div>
						</div>
					</div>
					<div className="flex-1">
						<Label htmlFor="photoRadius">Photo Radius</Label>
						<div className="flex gap-2">
							<Input
								id="photoRadius"
								name="photoRadius"
								type="range"
								min={0}
								max={50}
								step={5}
								className="p-0"
								value={data.photoRadius}
								onChange={handleInputChange}
							/>
							<div className="w-[50px] bg-slate-100 rounded-md flex items-center justify-center text-sm">
								{data.photoRadius}%
							</div>
						</div>
					</div>
				</div>
				<div className="flex-1">
					<div className="flex items-center space-x-2 mt-5">
						<Switch
							id="reverse-row"
							checked={data.reverse}
							onCheckedChange={() => setData(prev => ({...prev, reverse: !prev.reverse}))}
						/>
						<Label htmlFor="reverse-row">Reverse Row</Label>
					</div>
				</div>
			</FieldsetAccordion>
			{data.showRatings && <SkillSettingsForm />}
		</ScrollArea>
  )
}

const fonts = [...googleFonts, 'Arial', 'Helvetica', 'Times New Roman', 'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact'];
const templates = [
	{
		label: 'Customize',
		value: 'customize'
	},
	{
		label: 'Cyberpunk',
		value: 'cyberpunk'
	},
	{
		label: 'Classic',
		value: 'classic'
	},
	{
		label: 'Creative',
		value: 'creative'
	},
	{
		label: 'Flat design',
		value: 'flatdesign'
	},
	{
		label: 'Neumorphism',
		value: 'neumorphism'
	},
	{
		label: 'Modern',
		value: 'modern'
	},
	{
		label: 'Minimalist',
		value: 'minimalist'
	},
	{
		label: 'Professional',
		value: 'professional'
	}
];