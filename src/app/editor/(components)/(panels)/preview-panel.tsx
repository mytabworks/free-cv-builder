import { useEffect, useRef, useState } from "react";
import { useCVBuilder } from "../cv-builder-context";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { PageData, PageRenderer } from "@/lib/page-renderer";
import { isAppBrowser, isIOSMobile, isMobile, isSafari } from "@/lib/is-mobile";
import { buymeacoffee } from "@/constants/variables";
import { gtag } from "@/lib/g-tag";

export function CVPreviewPanel() {
	const { data } = useCVBuilder()
	const [ready, setReady] = useState(false)

	const ref = useRef<HTMLIFrameElement>(null);

	const handleDownload = () => {
		if(isAppBrowser()) {
			gtag?.('event', 'engage_download', {
				'user': data.name,
				'device': 'social-media',
			});
			alert("Please open this link in a standard browser like Chrome or Edge. It may not work properly in social media browsers.")
			return;
		}
		
		if(isIOSMobile() || isSafari()) {
			gtag?.('event', 'engage_download', {
				'user': data.name,
				'device': 'iOS/Safari',
			});
			alert("Please consider using other Desktop browser like Chrome/Edge/Firefox/Opera for better output");
			;(ref.current?.contentWindow as unknown as { savePdf: (name: string, format: 'a4' | 'letter') => void })
				?.savePdf(data.name!.replaceAll(' ', '-').toLowerCase() + '-cv', 'a4');
			return;
		}

		if(isMobile()) {
			gtag?.('event', 'engage_download', {
				'user': data.name,
				'device': 'android',
			});
			alert("Note! In the next pop-up, please set Paper Size to (A4 / ISO A4), and change Printer to (Save as PDF)")
		} else {
			gtag?.('event', 'engage_download', {
				'user': data.name,
				'device': 'desktop',
			});
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
				frameWindow.document.body.style.transform = ""
				frameWindow.document.body.style.transformOrigin = ""
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

			const scale = frameWindow.innerWidth / 794

			if((isIOSMobile() || isSafari()) && scale < 0.7) {
				frameWindow.document.body.style.zoom = ""
				frameWindow.document.body.style.transform = `scale(${scale})`
				frameWindow.document.body.style.transformOrigin = `top left`
				return ;
			}

			frameWindow.document.body.style.transform = ""
			frameWindow.document.body.style.transformOrigin = ""
			frameWindow.document.body.style.zoom = scale.toString()
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
				>
					<img height={43} width={190} alt="Buy me a coffee" src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=mytabworks&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
				</a>
				<Button onClick={handleDownload} data-tutorial-target="download"><DownloadIcon /> Download PDF</Button>
			</div>
			<iframe data-tutorial-target="preview" ref={ref} key={data.template} src={`/templates/${data.template}.html`} className="h-full" />
		</div>
  )
}