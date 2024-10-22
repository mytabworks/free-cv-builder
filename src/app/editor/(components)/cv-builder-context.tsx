import { createContext, useContext } from "react";

export type TSkill = {
	id: string;
	name: string;
	rating: number;
}

export type TWorkExperience = {
	id: string;
	startDate: any;
	endDate: any;
	currentRole: boolean;
	showMonth: boolean;
	jobTitle: string;
	companyName: string;
	keyPoints: { id: string; text: string }[];
}

export type TEducation = {
	id: string;
	details: string;
}

export type TCVData = {
	name: string;
	email: string;
	phone: string;
	summary: string;
	skills: TSkill[];
	workExperiences: TWorkExperience[];
	education: TEducation[];
	photo: string | null;
	sectionOrder: ('skills' | 'workExperiences' | 'education')[];
	font: string;
	themeColor: string;
	template: string;
	showRatings: boolean;
};

type TCVBuilderContext = {
    data: TCVData;
    setData: React.Dispatch<React.SetStateAction<TCVData>>;
};

export const CVBuilderContext = createContext<TCVBuilderContext | null>(null);

export const useCVBuilder = () => {
	const context = useContext(CVBuilderContext);
	if (!context) {
		throw new Error("useCVBuilder must be used within a CVBuilderContextProvider");
	}
	return context;
}