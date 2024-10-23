"use client";

import React, { useEffect, useState } from "react"
import classNames from "classnames"
import { CVBuilderContext, TCVData } from "./cv-builder-context";
import { CVFormPanel } from "./(panels)/form-panel";
import * as Separator from "@radix-ui/react-separator"
import { CVPreviewPanel } from "./(panels)/preview-panel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/components/link";

export function CVBuilder() {
  // const [data, setData] = useState<TCVData>({
  //   name: '',
  //   currentTitle: '',
  //   email: '',
  //   phone: '',
  //   address: '',
  //   website: '',
  //   linkedin: '',
  //   summary: '',
  //   skills: [],
  //   workExperiences: [],
  //   education: [],
  //   photo: null,
  //   sectionOrder: ['skills', 'workExperiences', 'education'],
  //   font: 'Arial',
  //   themeColor: '#10b981',
  //   template: 'classic',
  //   showRatings: false,
  //   textColor: '#5f5f62',
  //   textSize: 13,
  //   primaryTextColor: '#5f5f62',
  //   secondaryTextColor: '#5f5f62',
  //   secondaryBGColor: '#f0f4f8',
  //   primaryBGColor: '#ffffff',
  //   photoRadius: 50,
  //   photoSize: 75,
  //   reverse: false
  // })

  const [data, setData] = useState<TCVData>(defaultData)

  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    
  }

  useEffect(() => {
    let newLeftPanelWidth = leftPanelWidth;
    const handleMouseUp = () => {
      setIsDragging(false)

      if(newLeftPanelWidth === 20) {
        setLeftPanelWidth(50)
        setShowLeftPanel(false)
        return;
      }
  
      if(newLeftPanelWidth === 80) {
        setLeftPanelWidth(50)
        setShowRightPanel(false)
        return;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const containerWidth = window.innerWidth;
        newLeftPanelWidth = Math.min(Math.max((e.clientX / containerWidth) * 100, 20), 80)
        setLeftPanelWidth(newLeftPanelWidth);

        if(!showLeftPanel || !showRightPanel) {
          setShowLeftPanel(true)
          setShowRightPanel(true)
        }
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, showLeftPanel, showRightPanel]);

  return (
    <CVBuilderContext.Provider value={{ data, setData }}>
      <div 
        className={classNames("flex flex-col md:flex-row dark:bg-neutral-950", { 
          "select-none relative after:content-[''] after:absolute after:inset-0": isDragging
        })} 
      >
        {/* Left side - Tabs */}
        {showLeftPanel && (
          <div className={`bg-slate-50 p-6 ${showRightPanel ? 'w-full md:w-[50%]' : 'w-full'}`} style={{ width: showRightPanel ? `${leftPanelWidth}%` : '100%' }}>
            <header className="mb-5">
              <Link to="/">
                <h1 className="text-lg md:text-2xl font-bold text-emerald-600">Free CV Builder</h1>
              </Link>
            </header>
            <CVFormPanel />
          </div>
        )}

        {/* Resizer */}
        <Separator.Root
          className="z-[1] bg-slate-100 hover:bg-blue-500 active:bg-blue-500 relative data-[orientation=horizontal]:h-[5px] data-[orientation=horizontal]:w-[100vw] data-[orientation=vertical]:h-[calc(100vh)] data-[orientation=vertical]:w-[5px] cursor-col-resize"
          decorative
          orientation="vertical"
          onMouseDown={handleDragStart}
        >
          {/* Toggle buttons */}
          <div className={classNames("absolute top-1/2 transform -translate-y-1/2 flex flex-col space-y-2", {
            "left-1/2 -translate-x-1/2 ": showLeftPanel && showRightPanel,
            "left-1": !showLeftPanel && showRightPanel,
            "right-1": showLeftPanel && !showRightPanel,
          })}>
            {showRightPanel && (
              <Button
                size="icon"
                onClick={() => setShowLeftPanel(!showLeftPanel)}
              >
                {showLeftPanel ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            )}
            {showLeftPanel && (
              <Button
                size="icon"
                onClick={() => setShowRightPanel(!showRightPanel)}
              >
                {showRightPanel ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </Separator.Root>
        
        {/* Right side - Preview */}
        {showRightPanel && (
          <div className={`py-6 ${showLeftPanel ? 'w-full md:w-[50%]' : 'w-full'}`} style={{ width: showLeftPanel ? `${100 - leftPanelWidth}%` : '100%' }}>
            <CVPreviewPanel />
          </div>
        )}
      </div>
    </CVBuilderContext.Provider>
  )
}

const defaultData = {
  "name": "John Doe",
  "currentTitle": "Software Engineer",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "address": "Manila, Philippines",
  "website": "https://portfolio.com",
  "linkedin": "https://www.linkedin.com/in/username",
  "summary": "Dynamic and results-oriented software developer with over 5 years of experience in building scalable web applications. Proficient in both front-end and back-end technologies, with a strong background in JavaScript and Python. Adept at collaborating in agile teams to deliver high-quality software solutions that meet customer needs. Committed to continuous learning and adapting to new challenges in a fast-paced environment.",
  "skills": [
    {
      "id": "1",
      "name": "JavaScript",
      "rating": 5
    },
    {
      "id": "2",
      "name": "React",
      "rating": 4
    },
    {
      "id": "3",
      "name": "Node.js",
      "rating": 4
    },
    {
      "id": "4",
      "name": "Python",
      "rating": 4
    },
    {
      "id": "5",
      "name": "SQL",
      "rating": 4
    },
    {
      "id": "6",
      "name": "CSS",
      "rating": 5
    },
    {
      "id": "7",
      "name": "GraphQL",
      "rating": 3
    }
  ],
  "workExperiences": [
    {
      "id": "1",
      "startDate": "2020-01-01",
      "endDate": "2023-10-01",
      "currentRole": true,
      "showMonth": true,
      "jobTitle": "Senior Software Engineer",
      "companyName": "Tech Solutions Inc.",
      "keyPoints": [
        { "id": "1", "text": "Led a team of developers in creating web applications." },
        { "id": "2", "text": "Improved application performance by 30%." },
        { "id": "3", "text": "Implemented CI/CD pipelines for faster deployment." },
        { "id": "4", "text": "Mentored junior developers and conducted code reviews." }
      ]
    },
    {
      "id": "2",
      "startDate": "2018-05-01",
      "endDate": "2019-12-31",
      "currentRole": false,
      "showMonth": true,
      "jobTitle": "Software Developer",
      "companyName": "Web Innovations LLC",
      "keyPoints": [
        { "id": "1", "text": "Developed responsive web designs." },
        { "id": "2", "text": "Collaborated with designers and stakeholders." },
        { "id": "3", "text": "Optimized SQL queries for better performance." },
        { "id": "4", "text": "Participated in Agile methodology for project management." }
      ]
    },
    {
      "id": "3",
      "startDate": "2017-06-01",
      "endDate": "2018-04-30",
      "currentRole": false,
      "showMonth": true,
      "jobTitle": "Junior Developer",
      "companyName": "StartUp Hub",
      "keyPoints": [
        { "id": "1", "text": "Assisted in the development of e-commerce platforms." },
        { "id": "2", "text": "Fixed bugs and implemented new features." },
        { "id": "3", "text": "Engaged in client meetings to gather requirements." }
      ]
    }
  ],
  "education": [
    {
      "id": "1",
      "details": "Bachelor of Science in Computer Science, University of Technology, 2018"
    },
    {
      "id": "2",
      "details": "Certification in Full Stack Development, Coding Academy, 2019"
    },
    {
      "id": "3",
      "details": "Advanced JavaScript Training, Online Course, 2021"
    }
  ],
  "photo": "https://img.freepik.com/free-photo/cute-cartoon-kid-posing-portrait_23-2151870575.jpg?t=st=1729495496~exp=1729499096~hmac=c0f4e1d57bd84bb393d4fe15d44c19c6830c41adc3fb248bdd70fb2b2d76f08d&w=996",
  "sectionOrder": ["skills", "workExperiences", "education"] as const,
  "font": "Arial",
  "themeColor": "#0070f3",
  "template": "customize",
  "showRatings": true,
  "textColor": '#5f5f62',
  "textSize": 13,
  "primaryTextColor": '#5f5f62',
  "secondaryTextColor": '#5f5f62',
  "secondaryBGColor": '#f0f4f8',
  "primaryBGColor": '#ffffff',
  "photoRadius": 50,
  "photoSize": 75,
  "reverse": false
}