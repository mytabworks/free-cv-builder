import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useCVBuilder } from "../cv-builder-context";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export function CVPreviewPanel() {
	const { data } = useCVBuilder()

  return (
		<div className="p-6 bg-white h-full">
			<h2 className="text-2xl font-bold mb-6 text-emerald-700">CV Preview</h2>
			<ScrollArea className="h-[calc(100vh-100px)] border border-neutral-200 border-emerald-200 rounded-md p-4 dark:border-neutral-800">
				<div className="space-y-6" style={{ fontFamily: data.font, color: data.themeColor }}>
					{data.photo && (
						<div className="flex justify-center">
							<img src={data.photo} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
						</div>
					)}
					<div>
						<h1 className="text-3xl font-bold">{data.name || 'Your Name'}</h1>
						<p>{data.email}</p>
						<p>{data.phone}</p>
					</div>
					<div>
						<h2 className="text-xl font-semibold">Professional Summary</h2>
						<p>{data.summary}</p>
					</div>
					{data.sectionOrder.map((section) => (
						<div key={section}>
							{section === 'skills' && (
								<div>
									<h2 className="text-xl font-semibold">Skills</h2>
									<div className="flex flex-wrap gap-2">
										{data.skills.map(skill => (
											<Badge key={skill.id} variant="secondary" className="text-sm flex items-center">
												{skill.name}
												{data.showRatings && skill.rating && (
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
									{data.workExperience.map((exp) => (
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
										{data.education.map((edu) => (
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
  )
}