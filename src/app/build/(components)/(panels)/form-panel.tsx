import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CVInformationForm } from "../(forms)/information-form";
import { CVSettingsForm } from "../(forms)/settings-form";

export function CVFormPanel() {

  return (
		<Tabs defaultValue="cv-info" className="w-full">
			<TabsList className="w-full bg-emerald-100 p-1 rounded-lg">
				<TabsTrigger
					value="cv-info"
					className="w-1/2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-md transition-all"
				>
					CV Information
				</TabsTrigger>
				<TabsTrigger
					value="cv-settings"
					className="w-1/2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-md transition-all"
				>
					CV Settings
				</TabsTrigger>
			</TabsList>
			<TabsContent value="cv-info">
				<CVInformationForm />
			</TabsContent>
			<TabsContent value="cv-settings">
				<CVSettingsForm />
			</TabsContent>
		</Tabs>
  )
}