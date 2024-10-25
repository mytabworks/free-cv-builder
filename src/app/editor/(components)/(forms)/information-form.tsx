import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { useCVBuilder } from "../cv-builder-context"
import { CVSkillsField } from "../(fields)/skills-field"
import { CVWorkExperienceField } from "../(fields)/work-experience-field"
import { CVOtherSectionField } from "../(fields)/other-section-field"
import { FieldsetAccordion } from "@/components/fieldset-accordion"

export function CVInformationForm() {
	const { data, setData } = useCVBuilder()

	const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setData(prev => ({ ...prev, photo: reader.result as string }))
      }
      reader.readAsDataURL(file)
    } else {
			setData(prev => ({ ...prev, photo: null }))
		}
  }

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <ScrollArea className="h-full w-full">
			<div className="space-y-6">
				<FieldsetAccordion title="BASIC INFORMATION">
					<div>
						<Input
							id="photo"
							type="file"
							accept="image/*"
							onChange={handlePhotoUpload}
							placeholder="Upload a photo"
						/>
					</div>
					<div>
						<Label htmlFor="name">Full Name</Label>
						<Input
							id="name"
							name="name"
							value={data.name}
							onChange={handleInputChange}
							placeholder="John Doe"
						/>
					</div>
					<div>
						<Label htmlFor="currentTitle">Current Job Title</Label>
						<Input
							id="currentTitle"
							name="currentTitle"
							value={data.currentTitle}
							onChange={handleInputChange}
							placeholder="John Doe"
						/>
					</div>
					<div className="flex gap-5">
						<div className="flex-1">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								value={data.email}
								onChange={handleInputChange}
								placeholder="johndoe@example.com"
							/>
						</div>
						<div className="flex-1">
							<Label htmlFor="phone">Mobile Number</Label>
							<Input
								id="phone"
								name="phone"
								value={data.phone}
								onChange={handleInputChange}
								placeholder="+1 234 567 8900"
							/>
						</div>
					</div>
					<div className="flex gap-5">
						<div className="flex-1">
							<Label htmlFor="email">Website</Label>
							<Input
								id="website"
								name="website"
								type="website"
								value={data.website}
								onChange={handleInputChange}
								placeholder="https://portfolio.com"
							/>
						</div>
						<div className="flex-1">
							<Label htmlFor="linkedin">LinkedIn</Label>
							<Input
								id="linkedin"
								name="linkedin"
								value={data.linkedin}
								onChange={handleInputChange}
								placeholder="https://www.linkedin.com/in/username/"
							/>
						</div>
					</div>
					<div>
						<Label htmlFor="address">Address</Label>
						<Input
							id="address"
							name="address"
							value={data.address}
							onChange={handleInputChange}
							placeholder="Sydney, Australia"
						/>
					</div>
					<div>
						<Label htmlFor="summary">Professional Summary</Label>
						<Textarea
							id="summary"
							name="summary"
							value={data.summary}
							onChange={handleInputChange}
							placeholder="Brief overview of your professional background and goals"
							rows={4}
						/>
					</div>
				</FieldsetAccordion>
				<CVSkillsField />
				<CVWorkExperienceField />
				<CVOtherSectionField />
			</div>
    </ScrollArea>
  )
}