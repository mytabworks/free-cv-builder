import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCVBuilder } from "../cv-builder-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { SkillSettingsForm } from "./skill-settings-form"
import { FieldsetAccordion } from "@/components/fieldset-accordion"
import { downloadData } from "@/lib/download-data"
import { LayoutSelectionField } from "../(fields)/layout-selection-field"
import { DownloadIcon, Import } from "lucide-react"
import { templates } from "@/constants/templates"
import { fonts } from "@/constants/fonts"
import { gtag } from "@/lib/g-tag"

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

	const handleExport = () => {
		downloadData(data, `${data.name.toLowerCase().replaceAll(" ", "-")}-cv-data.json`)
		gtag?.('event', 'engage_export', {
			'active_user': data.name,
		});
	}

  return (
    <ScrollArea className="h-full">
			<FieldsetAccordion title="SETTINGS">
				<div className="space-y-3">
					<div>
						<form 
							className="flex flex-wrap @md:flex-nowrap gap-3 items-center" 
							onSubmit={(e) => {
								e.preventDefault()
								gtag?.('event', 'engage_import', {
									'active_user': data.name,
								});
								const input = (e.target as HTMLFormElement)?.[0] as HTMLInputElement
								const file = input?.files?.[0]
								
								if(file) {
									const reader = new FileReader()
									reader.onloadend = () => {
										const imported = JSON.parse(reader.result as string)
										setData(prev => ({ ...prev, ...imported }))
									}
									reader.readAsText(file)
								}
							}}
						>
							<Input
								type="file"
								accept=".json"
								className="w-full"
								required
							/>
							<div className="flex w-full @md:w-auto gap-3">
								<Button 
									type="submit" 
									className="w-full @md:w-50"
									data-tutorial-target="import"
									>
									<Import /> Import Data
								</Button>
								<Button 
									type="button" 
									onClick={handleExport}
									className="w-full @md:w-50"
									data-tutorial-target="export"
								>
									<DownloadIcon /> Download Data
								</Button>
							</div>
						</form>
					</div>
					<div className="flex gap-3">
						<div data-tutorial-target="template" className="flex-1">
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
						<div data-tutorial-target="size" className="flex-1">
							<Label htmlFor="size">Paper Size</Label>
							<Select
								value="A4"
								disabled
								// onValueChange={handleSelectChange('font')}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select a paper size" />
								</SelectTrigger>
								<SelectContent>
									{['A4'].map((size) => (
										<SelectItem key={size} value={size}>{size}</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<LayoutSelectionField 
						value={data.displaySecondarySection ? data.reverse ? 'right' : 'left' : 'top'}
						onChange={(layout) => {

							const layoutData = {
								reverse: layout === 'right',
								displaySecondarySection: layout !== 'top',
								photoSize: layout !== 'top' ? data.photoSize : 100
							}

							setData(prev => ({ 
								...prev, 
								...layoutData 
							}))
						}}
					/>
					<div className="flex gap-3">
						<div data-tutorial-target="font" className="flex-1">
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
					<div className="flex gap-3">
						<div data-tutorial-target="theme-color" className="flex-1">
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
					{(["cyberpunk", "creative", "neumorphism", "minimalist"].includes(data.template) === false
					|| (["creative"].includes(data.template) === true && data.displaySecondarySection === true))
					&& (
						<div className="flex gap-3">
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
					)}
					{["cyberpunk", "creative", "flatdesign", "minimalist", "neumorphism"].includes(data.template) === false && (
						<div className="flex gap-3">
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
					)}
					<div className="flex gap-3" data-tutorial-target="photo">
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
									disabled={!data.displaySecondarySection}
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
					<div className="flex gap-3">
						<div className="flex-1">
							<div className="flex items-center space-x-2 mt-5">
								<Switch
									id="display-secondary-section"
									checked={!data.displaySecondarySection}
									onCheckedChange={() => 
										setData(prev => ({
											...prev, 
											displaySecondarySection: !prev.displaySecondarySection,
											photoSize: !prev.displaySecondarySection ? prev.photoSize : 100
										})
									)}
								/>
								<Label htmlFor="display-secondary-section">Remove Secondary Section</Label>
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
					</div>
					<div className="flex gap-3">
						<div className="flex-1">
							<div className="flex items-center space-x-2 mt-5">
								<Switch
									id="show-icon"
									checked={data.showIcons}
									onCheckedChange={() => setData(prev => ({...prev, showIcons: !prev.showIcons}))}
								/>
								<Label htmlFor="show-icon">Show Icons</Label>
							</div>
						</div>
					</div>
				</div>
			</FieldsetAccordion>
			{data.showRatings && <SkillSettingsForm />}
		</ScrollArea>
  )
}
