import { createContext, useContext } from "react";

export type TSkill = {
	id: string;
	name: string;
	rating: number;
}

export type TOtherSection = {
	id: string;
	title: string;
	keyPoints: { id: string; text: string }[];
}

export type TWorkExperience = {
	id: string;
	startDate: string;
	endDate: string;
	currentRole: boolean;
	showMonth: boolean;
	jobTitle: string;
	companyName: string;
	keyPoints: { id: string; text: string }[];
}

export type TCVData = {
	name: string;
	currentTitle: string;
	email: string;
	phone: string;
	address: string;
	website: string;
	linkedin: string;
	summary: string;
	skills: TSkill[];
	otherSections: TOtherSection[];
	workExperiences: TWorkExperience[];
	photo: string | null;
	font: string;
	themeColor: string;
	template: string;
	showIcons: boolean;
	showRatings: boolean;
	skillSplit: boolean;
	skillRatingBlock: boolean;
	skillRatingHeight: number;
	skillRatingRadius: number;
	skillRatingTrackColor: string;
	photoRadius: number;
	photoSize: number;
	primaryBGColor: string;
	secondaryBGColor: string;
	primaryTextColor: string;
	secondaryTextColor: string;
	textColor: string;
	textSize: number;
	reverse: boolean;
	displaySecondarySection: boolean;
};

export type TShowPanel = {
	showLeft: boolean;
	showRight: boolean;
	width: number;
	isDragging: boolean;
}

type TCVBuilderContext = {
	data: TCVData;
	setData: React.Dispatch<React.SetStateAction<TCVData>>;
	panel: TShowPanel;
	setPanel: React.Dispatch<React.SetStateAction<TShowPanel>>;

};

export const CVBuilderContext = createContext<TCVBuilderContext | null>(null);

export const useCVBuilder = () => {
	const context = useContext(CVBuilderContext);
	if (!context) {
		throw new Error("useCVBuilder must be used within a CVBuilderContextProvider");
	}
	return context;
}