import { useEffect, useMemo, useRef, useState } from "react";
import { useCVBuilder } from "../cv-builder-context";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { PageData, PageRenderer } from "@/lib/page-renderer";

export function CVPreviewPanel() {
	const { data } = useCVBuilder()
	const [ready, setReady] = useState(false)

	const ref = useRef<HTMLIFrameElement>(null);

	const onDownload = () => {
		ref.current?.contentWindow?.print();
	}

	useEffect(() => {
		const cleanup = setTimeout(() => {
			setReady(true)
		}, 1000)

		return () => {
			clearTimeout(cleanup)
			setReady(false)
		}
	}, [data.template])

	useEffect(() => {
    if(!ready || !ref.current?.contentWindow?.document) return;

		const renderer = new PageRenderer(ref.current?.contentWindow?.document)

		const websiteSection = data.website || data.linkedin ? `${data.website || ''}${data.linkedin ? `${data.website ? ' | ' : ''}${data.linkedin}` : ''}` : ''
		const collection: PageData = {
			name: data.name,
			title: data.currentTitle,
			contacts: `${data.email || ''}${data.phone ? `${data.email ? ' | ' : ''}${data.phone}` : ''}`,
			website: websiteSection.length <= 65 ? websiteSection : data.website,
			linkedin: websiteSection.length <= 65 ? '' : data.linkedin,
			address: data.address,
			summary: data.summary,
			photo: data.photo,
			showRatings: data.showRatings,
			skillRatingBlock: data.skillRatingBlock,
			skillSplit: data.skillSplit,
			skills: data.skills?.map((item) => ({
				name: item.name,
				rating: item.rating
			})),
			education: data.education.map((item) => item.details),
			workExperiences: data.workExperiences?.map((item) => ({
				position: item.jobTitle,
				year: item.startDate && (item.endDate || item.currentRole) ? (
					`${item.startDate ? new Date(item.startDate).toLocaleDateString('en-US', { year: 'numeric', month: item.showMonth ? 'short' : undefined }) : ''} - ${item.currentRole ? "Present" : item.endDate ? new Date(item.endDate).toLocaleDateString('en-US', { year: 'numeric', month: item.showMonth ? 'short' : undefined }) : ''}`
				) : '',
				company: item.companyName,
				points: item.keyPoints.map((point) => point.text)
			}))
		}

		renderer.refresh()

		renderer.importGoogleFonts(data.font)

		renderer.renderStyle(`
			:root {
				--theme-color: ${data.themeColor};
				--text-font: '${data.font}';
				--text-color: ${data.textColor};
				--text-font-size: ${data.textSize}px;
				--primary-text-color: ${data.primaryTextColor};
				--secondary-text-color: ${data.secondaryTextColor};
				--secondary-bg-color: ${data.secondaryBGColor};
				--primary-bg-color: ${data.primaryBGColor};
				--photo-radius: ${data.photoRadius}%;
				--photo-size: ${data.photoSize}%;
				--page-row: ${data.reverse ? 'row-reverse' : 'row'};
			}
		`)

		renderer.renderPages(collection, 1)

  }, [data, ready]);

  return (
		<div className="h-full flex flex-col">
			<div className="flex justify-between mb-3 mx-auto w-[210mm] pr-2">
				<a
					href="https://ko-fi.com/yourkofiusername"
					target="_blank"
					rel="noopener noreferrer"
					className="bg-white text-emerald-600 py-1 px-5 rounded-full text-sm md:text-lg font-bold shadow-md hover:bg-gray-200 transition-all duration-200"
				>
					Buy me a Ko-Fi ☕
				</a>
				<Button onClick={onDownload}><DownloadIcon /> Download PDF</Button>
			</div>
			<iframe ref={ref} key={data.template} src={`/templates/${data.template}.html`} className="h-full" />
		</div>
  )
}