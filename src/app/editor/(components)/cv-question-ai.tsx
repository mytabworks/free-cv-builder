import { useCVBuilder } from "./cv-builder-context";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { extractChat } from "@/lib/extract-chat";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export function CVQuestionAI() {
  const { setData } = useCVBuilder();

  const requestChat = useMutation({
    mutationFn: async (data: {full_name: string, prompt: string}) => {
      const { data: response } = await axios.post('/api/ai', {
        full_name: data.full_name,
        prompt: data.prompt
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    },
    onSuccess: (data) => {
      const parsed = JSON.parse(extractChat(data) || `{ name: ${formData.jobTitle}, currentTitle: ${formData.jobTitle} }`)

      if(parsed.toString() === '[object Object]') {
        return setData(prev => ({ 
          ...prev, 
          ...parsed, 
          workExperiences: [
            ...(parsed.workExperiences || []), 
            ...prev.workExperiences.slice(0).map((experience, index) => ({ 
              ...experience,
              jobTitle: `${index === 0 ? 'Senior' : index === 1 ? 'Mid' : 'Junior'} ${formData.jobTitle}`,
              companyName: `${formData.jobTitle} - Company ${index + 1}`,
            }))
          ],
          otherSections: prev.otherSections.map((section) => ({ 
            ...section,
            keyPoints: section.keyPoints.map((point, pointIndex) => ({ 
              ...point,
              text: section.title === "Education" 
                ? `${pointIndex === 0 ? "Master" : "Bachelor"} of Science in ${formData.jobTitle}` 
                : `Certified ${formData.jobTitle}, 202${pointIndex}` ,
            }))
          })),
        }));
      }
      setData(prev => ({ ...prev, name: formData.fullName, currentTitle: formData.jobTitle, summary: formData.summary }));
    },
    onError: () => {
      setData(prev => ({ ...prev, name: formData.fullName, currentTitle: formData.jobTitle, summary: formData.summary }));
    }
  })

  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    summary: '',
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    ;(window as unknown as { gtag: Function }).gtag?.('event', 'engage_question', {
      'ai-engager': formData.fullName + " - " + formData.jobTitle,
    });

    requestChat.mutate({
      full_name: formData.fullName,
      prompt: `I am a ${formData.jobTitle}, and ${formData.summary}`
    })
  };

  const handleSkip = () => {
    ;(window as unknown as { gtag: Function }).gtag?.('event', 'engage_question', {
      'ai-engager': 'skipped',
    });
    setData(prev => ({...prev, name: "John Doe"}))
  }

  return (
    <div className="min-h-screen py-8  bg-gradient-to-r from-emerald-100 to-teal-400">
      <h1 className="text-3xl font-bold text-center mb-3 mx-3">Could you share a bit about yourself?</h1>
      <p className="text-center mb-5 mx-3">You need to fill in all the fields, to help us get a better idea of who you are.</p>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg px-4 py-5 sm:p-8 mx-3">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="fullName" >
                Full Name
              </Label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                disabled={requestChat.isPending}
              />
            </div>
            <div>
              <Label htmlFor="jobTitle" >
                Job Title
              </Label>
              <Input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Software Engineer"
                required
                disabled={requestChat.isPending}
              />
            </div>
            <div>
              <Label htmlFor="summary" >
                Summary
              </Label>
              <Textarea
                id="summary"
                name="summary"
                rows={4}
                value={formData.summary}
                onChange={handleChange}
                placeholder="Briefly describe yourself and your skills"
                required
                disabled={requestChat.isPending}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={requestChat.isPending}
            >
              {requestChat.isPending ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting
                </span>
              ) : (
                "Submit"
              )}
            </Button>
            <Button
              type="button"
              className="w-full"
              variant="secondary"
              onClick={handleSkip}
              disabled={requestChat.isPending}
            >
              Skip
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
