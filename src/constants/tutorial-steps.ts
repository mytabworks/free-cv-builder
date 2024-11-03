export const tutorialSteps = [
  { target: null, content: 'Welcome to the Free CV Builder!' },
  { target: 'personal-info', content: 'Start by filling in your personal information.' },
  { target: 'skills', content: 'Add your skills and optionally rate them.' },
  { target: 'work-experience', content: 'Enter your work experiences.' },
  { target: 'other-section', content: 'Add your educational background, certifications, achievements, and other sections.' },
  { target: 'cv-settings', content: 'Click CV Settings tab to customize your CV appearance.', interactionRequired: true },
  { target: 'template', content: 'Change the template to see how it looks.' },
  { target: 'layout', content: 'Change the layout to see how it looks.' },
  { target: 'font', content: 'Change the font to see how it looks.' },
  { target: 'theme-color', content: 'Change the theme color to see how it looks.' },
  { target: 'photo', content: 'Change the photo size and radius to see how the photo looks.' },
  { target: 'skill-rating-settings', content: 'Change the skill rating settings to see how it looks.' },
  { target: 'preview', content: 'Preview your CV in real-time as you make changes.' },
  { target: 'download', content: 'If you are happy with your CV, you can download it as a PDF.' },
  { target: 'export', content: 'Download your CV data to a JSON file so you can update it later.' },
  { target: 'import', content: 'Import your previous CV data from a JSON file to continue editing.' },
];

export const tutorialStepsMobile = [...tutorialSteps];

tutorialStepsMobile.splice(12, 1, { target: 'preview-button', content: 'Click to go to the preview screen.', interactionRequired: true });
tutorialStepsMobile.splice(14, 0, { target: 'preview', content: 'Preview your CV in real-time as you make changes.' });
tutorialStepsMobile.splice(15, 0, { target: 'back-button', content: 'Back to the editing forms.', interactionRequired: true });