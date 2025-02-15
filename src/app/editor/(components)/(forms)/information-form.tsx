import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { useCVBuilder } from "../cv-builder-context"
import { CVSkillsField } from "../(fields)/skills-field"
import { CVWorkExperienceField } from "../(fields)/work-experience-field"
import { CVOtherSectionField } from "../(fields)/other-section-field"
import { FieldsetAccordion } from "@/components/fieldset-accordion"
import { Button } from "@/components/ui/button"

export function CVInformationForm() {
	const { data, setData } = useCVBuilder()

	const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const img = new window.Image();
				img.onload = () => {
					const targetSize = 500; // Desired square width and height

					// Create a canvas and set its dimensions to square
					const canvas = document.createElement("canvas");
					canvas.width = targetSize;
					canvas.height = targetSize;
					const ctx = canvas.getContext("2d");

					if (ctx) {
						// Determine the shorter dimension and center-crop the image
						const shorterSide = Math.min(img.naturalWidth, img.naturalHeight);
						const sourceX = (img.naturalWidth - shorterSide) / 2;
						const sourceY = (img.naturalHeight - shorterSide) / 2;
						
						// Draw the centered square section to the canvas
						ctx.drawImage(
							img,
							sourceX,
							sourceY,
							shorterSide, // width of the source area
							shorterSide, // height of the source area
							0,
							0,
							targetSize,
							targetSize
						);
						// Get the data URL of the cropped image
						const croppedDataUrl = canvas.toDataURL("image/png", 1); // Set quality as needed
						setData(prev => ({ ...prev, photo: croppedDataUrl }));
					}
				};
				img.src = reader.result as string;
			};
			reader.readAsDataURL(file);
		} else {
			setData(prev => ({ ...prev, photo: null }));
		}
	};

	const handleRemovePhoto = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		setData(prev => ({ ...prev, photo: null }));
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <ScrollArea className="h-full w-full">
			<div className="space-y-3">
				<FieldsetAccordion title="BASIC INFORMATION" data-tutorial-target="personal-info">
					<div className="space-y-3">
							<div>
								<div className="w-full @md:w-[50%] flex flex-col mb-3 relative">
									<input type="file" id="photo" onChange={handlePhotoUpload} accept="image/*" className="z-[1px] absolute opacity-0 w-full h-full cursor-pointer inset-0" />
									{data.photo ? (
										<div className="flex flex-col items-center gap-3 p-3 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-gray-500">
											<img src={data.photo} alt="CV Profile" className="max-w-auto h-24 object-cover rounded-lg" />
											<div className="flex gap-3">
												<Button>Change Photo</Button>
												<Button variant="danger" className="position-relative z-[1]" onClick={handleRemovePhoto}>Remove Photo</Button>
											</div>
										</div>
									) : (
										<label htmlFor="photo" className="flex flex-col p-3 items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-gray-500">
											<p className="text-gray-600 text-sm">Drag and drop a photo here or click to select</p>
										</label>
									)}
								</div>
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
							<div className="flex flex-wrap gap-3">
								<div className="w-full @md:flex-1">
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
								<div className="w-full @md:flex-1">
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
							<div className="flex flex-wrap gap-3">
								<div className="w-full @md:flex-1">
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
								<div className="w-full @md:flex-1">
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
					</div>
				</FieldsetAccordion>
				<CVSkillsField />
				<CVWorkExperienceField />
				<CVOtherSectionField />
			</div>
    </ScrollArea>
  )
}