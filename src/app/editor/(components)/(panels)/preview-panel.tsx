import { useEffect, useRef, useState } from "react";
import { useCVBuilder } from "../cv-builder-context";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { PageData, PageRenderer } from "@/lib/page-renderer";
import { isAppBrowser, isIOSMobile, isMobile, isSafari } from "@/lib/is-mobile";
import { buymeacoffee } from "@/constants/variables";

export function CVPreviewPanel() {
	const { data } = useCVBuilder()
	const [ready, setReady] = useState(false)

	const ref = useRef<HTMLIFrameElement>(null);

	const handleDownload = () => {
		if(isIOSMobile()) {
			alert("iOS Devices is not supported yet, please use a desktop browser Chrome/Edge/Firefox/Opera or android devices with updated Chrome/Edge")
			return alert("You can export/download your CV-data to a JSON file, and then import the JSON file to use it in desktop/android browser Chrome/Edge")
		}

		if(isAppBrowser()) {
			return alert("Please open this link in a standard browser like Chrome or Edge. It may not work properly in social media browsers.")
		}

		if(isMobile()) {
			alert("Note! In the next pop-up, please set Paper Size to (A4 / ISO A4), and change Printer to (Save as PDF)")
		}

		if(isSafari()) {
			alert("Please consider using a other desktop browser like Chrome/Edge/Firefox/Opera for better output")
			alert("You can export/download your CV-data to a JSON file, and then import the JSON file to use it in other desktop browser like Chrome/Edge/Firefox/Opera")
		}

		ref.current?.contentWindow?.print();
	}

	const handleChangeTemplate = () => {
		const cleanup = setTimeout(() => {
			setReady(true)
		}, 1000)

		return () => {
			clearTimeout(cleanup)
			setReady(false)
			setStartScalingDown(false)
		}
	}

	useEffect(handleChangeTemplate, [data.template])

	const handleFrameRender = () => {
    if(!ready || !ref.current?.contentWindow?.document) return;

		const renderer = new PageRenderer(
			ref.current?.contentWindow?.document, 
			{ 
				displaySecondarySection: data.displaySecondarySection,
				reverse: data.reverse
			}
		)

		const collection: PageData = {
			name: data.name,
			title: data.currentTitle,
			email: data.email,
			contact: data.phone,
			website: data.website,
			linkedin: data.linkedin,
			address: data.address,
			summary: data.summary,
			photo: data.photo,
			showIcons: data.showIcons,
			showRatings: data.showRatings,
			skillRatingBlock: data.skillRatingBlock,
			skillSplit: data.skillSplit,
			skills: data.skills?.map((item) => ({
				name: item.name,
				rating: item.rating
			})),
			sections: data.otherSections?.map((item) => ({
				title: item.title.toUpperCase(),
				points: item.keyPoints.map((point) => point.text)
			})).filter((item) => item.title),
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
				--skill-rating-height: ${data.skillRatingHeight}px;
				--skill-rating-radius: ${data.skillRatingRadius}px;
				--skill-rating-track-color: ${data.skillRatingTrackColor};
			}
		`)

		renderer.renderPages(collection, 1)

  }

	useEffect(handleFrameRender, [data, ready]);

	const handleReAlignmentAfterFontAndTemplateChange = () => {
		const cleanup = setTimeout(handleFrameRender, 2000)

		return () => {
			clearTimeout(cleanup)
		}
	}

	useEffect(handleReAlignmentAfterFontAndTemplateChange, [data.template, data.font]);

	const [startScalingDown, setStartScalingDown] = useState(false)

	const handleScaleDownTrigger = () => {
		if(!ready) return;
		const frameWindow = ref.current?.contentWindow

		if(!frameWindow) return;

		const media = frameWindow?.matchMedia('(max-width: 210mm)')

		const handler = () => {
			setStartScalingDown(media.matches)
			if(!media.matches) {
				frameWindow.document.body.style.zoom = ""
			}
		}

		handler()

		media?.addEventListener('change', handler)

		return () => {
			media?.removeEventListener('change',handler)
		}
	}

	useEffect(handleScaleDownTrigger, [ready])

	const handleScaleDown = () => {
		if(!startScalingDown) return;

		const frameWindow = ref.current?.contentWindow

		if(!frameWindow) return;

		const handler = () => {
			frameWindow.document.body.style.zoom = (frameWindow.innerWidth / 794).toString()
		}

		handler()

		frameWindow?.addEventListener('resize', handler)

		return () => {
			frameWindow?.removeEventListener('resize', handler)
		}
	}

	useEffect(handleScaleDown, [startScalingDown])

  return (
		<div className="h-[calc(100%-40px)] md:h-full flex flex-col px-3 md:px-2">
			<div className="flex justify-between flex-wrap mb-3 mx-auto w-full max-w-[210mm] gap-3">
				<a
					href={buymeacoffee}
					target="_blank"
					rel="noopener noreferrer"
					className="bg-white text-emerald-600 py-2.5 px-5 md:py-1 rounded-full text-sm md:text-lg font-bold shadow-md hover:bg-gray-200 transition-all duration-200"
				>
					Buy me a Coffee ☕
				</a>
				<Button onClick={handleDownload}><DownloadIcon /> Download PDF</Button>
			</div>
			<iframe ref={ref} key={data.template} src={`/templates/${data.template}.html`} className="h-full" />
		</div>
  )
}