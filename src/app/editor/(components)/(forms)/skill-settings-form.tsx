import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCVBuilder } from "../cv-builder-context"
import { Switch } from "@/components/ui/switch"
import { FieldsetAccordion } from "@/components/fieldset-accordion"

export function SkillSettingsForm() {
	const { data, setData } = useCVBuilder()

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <FieldsetAccordion title="SKILL RATING SETTINGS" data-tutorial-target="skill-rating-settings">
			<div className="flex gap-5">
				<div className="flex-1">
					<Label htmlFor="skillRatingHeight">Rating Height</Label>
					<div className="flex gap-2">
						<Input
							id="skillRatingHeight"
							name="skillRatingHeight"
							type="range"
							min={3}
							max={10}
							step={1}
							className="p-0"
							value={data.skillRatingHeight}
							onChange={handleInputChange}
						/>
						<div className="w-[50px] bg-gray-100 rounded-md flex items-center justify-center">
							{data.skillRatingHeight}
						</div>
					</div>
				</div>
				<div className="flex-1">
					<Label htmlFor="skillRatingRadius">Rating Radius</Label>
					<div className="flex gap-2">
						<Input
							id="skillRatingRadius"
							name="skillRatingRadius"
							type="range"
							min={0}
							max={10}
							step={1}
							className="p-0"
							value={data.skillRatingRadius}
							onChange={handleInputChange}
						/>
						<div className="w-[50px] bg-gray-100 rounded-md flex items-center justify-center">
							{data.skillRatingRadius}
						</div>
					</div>
				</div>
			</div>
			<div className="flex gap-5">
				<div className="flex-1">
					<Label htmlFor="skillRatingTrackColor">Rating Track Color</Label>
					<Input
						id="skillRatingTrackColor"
						name="skillRatingTrackColor"
						type="color"
						className="p-1"
						value={data.skillRatingTrackColor}
						onChange={handleInputChange}
					/>
				</div>
				<div className="flex-1">
					<div className="flex items-center space-x-2 mt-6">
						<Switch
							id="skillRatingBlock"
							checked={data.skillRatingBlock || data.skillSplit}
							disabled={data.skillSplit}
							onCheckedChange={() => setData(prev => ({...prev, skillRatingBlock: !prev.skillRatingBlock}))}
						/>
						<Label htmlFor="skillRatingBlock">Rating is under the Skill?</Label>
					</div>
				</div>
			</div>
		</FieldsetAccordion>
  )
}