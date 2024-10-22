import { useEffect, useMemo, useRef, useState } from "react";
import { useCVBuilder } from "../cv-builder-context";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { PageData, PageRenderer } from "@/lib/page-renderer";

export function CVPreviewPanel() {
	const { data } = useCVBuilder()
	const [ready, setReady] = useState(false)
	const [htmlContent, setHtmlContent] = useState('');

	const ref = useRef<HTMLIFrameElement>(null);

	const onDownload = () => {
		ref.current?.contentWindow?.print();
	}

	const onLoad = () => {
		setReady(true)
	}

	useEffect(() => {
    const fetchHtml = async () => {
      const response = await fetch('/templates/modern.html');
      const text = await response.text();
      setHtmlContent(text);
    };

    fetchHtml();
  }, []);

	useEffect(() => {
    if(!ready || !ref.current?.contentWindow?.document) return;

		const renderer = new PageRenderer(ref.current?.contentWindow?.document)

		const collection: PageData = {
			name: data.name,
			summary: data.summary,
			photo: data.photo,
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

		renderer.reset()

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
			<iframe ref={ref} srcDoc={htmlContent} onLoad={onLoad} className="h-full" />
		</div>
  )
}