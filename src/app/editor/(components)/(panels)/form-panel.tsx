import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CVInformationForm } from "../(forms)/information-form";
import { CVSettingsForm } from "../(forms)/settings-form";

export function CVFormPanel() {

  return (
		<Tabs defaultValue="cv-info" className="w-full">
			<TabsList className="rounded-none w-full bg-neutral-200 px-1">
				<TabsTrigger
					value="cv-info"
					className="w-1/2 data-[state=active]:bg-neutral-900 data-[state=active]:text-white data-[state=active]:shadow-slate-500 rounded-sm transition-all"
				>
					CV Information
				</TabsTrigger>
				<TabsTrigger
					value="cv-settings"
					className="w-1/2 data-[state=active]:bg-neutral-900 data-[state=active]:text-white data-[state=active]:shadow-slate-500 rounded-sm transition-all"
				>
					CV Settings
				</TabsTrigger>
			</TabsList>
			<TabsContent value="cv-info" className="h-[calc(100vh-152px)]">
				<CVInformationForm />
			</TabsContent>
			<TabsContent value="cv-settings" className="h-[calc(100vh-152px)]">
				<CVSettingsForm />
			</TabsContent>
		</Tabs>
  )
}