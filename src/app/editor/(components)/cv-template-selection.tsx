import { templateWithImages } from "@/constants/templates";
import { useCVBuilder } from "./cv-builder-context";

export function CVTemplateSelection() {
  const { setData } = useCVBuilder();

  const handleTemplateSelection = (templateId: string): React.MouseEventHandler<HTMLElement> => (event) => {
    event.stopPropagation()
    setData(prev => ({ ...prev, template: templateId }));
    ;(window as unknown as { gtag: Function }).gtag?.('event', 'engage_select_template', {
      'template': templateId,
    });
  };

  return (
    <div className="min-h-screen py-10 bg-gradient-to-r from-emerald-100 to-teal-400">
      <h1 className="text-3xl font-bold text-center mb-3">Choose a Template</h1>
      <p className="text-center mb-5">Don{"'"}t worry you can always change it later on settings</p>
      <div className="px-3 overflow-y-auto max-h-[calc(100vh-175px)]">
        <div className="grid gap-3 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto justify-center">
          {templateWithImages.map((template) => (
            <div
              key={template.id}
              className="cursor-pointer relative group overflow-hidden rounded-sm shadow-md hover:shadow-lg transition duration-300 bg-white"
              onClick={handleTemplateSelection(template.id)}
            >
              <img
                src={template.imageUrl}
                alt={template.title}
                className="w-full h-full"
              />
              {/* Overlay and Select Button */}
              <div className="absolute inset-0 bg-emerald-900 bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded" onClick={handleTemplateSelection(template.id)}>
                  SELECT
                </button>
              </div>
              {/* Template Title */}
              <div className="absolute bottom-0 left-0 w-full text-center bg-emerald-950 bg-opacity-70 text-white py-2 text-lg font-semibold">
                {template.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
