const A4_HEIGHT = 1040;

interface Skill {
  name: string;
  rating: number;
}

interface Education {
  points: string[];
}

interface WorkExperience {
  position?: string;
  company?: string;
  year?: string;
  points: string[];
}

export interface PageData {
  name?: string;
  title?: string;
  contacts?: string;
  website?: string;
  linkedin?: string;
  address?: string;
  summary?: string;
  photo?: string | null;
  skillRating?: boolean;
  skills?: Skill[];
  education?: string[];
  workExperiences?: WorkExperience[];
}

export class PageRenderer {
  private maxHeight: number;
  private container: HTMLElement | null;
  private DOM: Document;

  constructor(DOM: Document, maxHeight: number = A4_HEIGHT) {
    this.maxHeight = maxHeight;
    this.container = DOM.getElementById('container');
    this.DOM = DOM
  }

  private checkSectionOverflow(element: HTMLElement): boolean {
    return element.clientHeight > this.maxHeight;
  }

  private createElement(
    tagName: string,
    className?: string | null,
    innerHTML?: string | null,
    appendTo?: HTMLElement | Element
  ): HTMLElement {
    const element = this.DOM.createElement(tagName);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    if (appendTo) appendTo.appendChild(element);
    return element;
  }

  private createPageElement(pageNum: number): HTMLElement {
    let pageElement = this.DOM.querySelector<HTMLElement>(`.page[data-page="${pageNum}"]`);
    if (pageElement) return pageElement;

    pageElement = this.createElement('div', 'page');
    pageElement.setAttribute('data-page', pageNum.toString());

    const secondaryElement = this.createElement('div', 'secondary', null, pageElement);
    this.createElement('div', 'secondary-content', null, secondaryElement);

    const primaryElement = this.createElement('div', 'primary', null, pageElement);
    this.createElement('div', 'primary-content', null, primaryElement);

    this.container?.appendChild(pageElement);

    return pageElement;
  }

  private renderSkill(pageElement: HTMLElement, data: PageData, pageNum: number): void {
    const secondaryContent = pageElement.querySelector('.secondary-content') as HTMLElement;
    if (!Array.isArray(data.skills) || data.skills.length === 0 || !secondaryContent) return;

    let section = pageElement?.querySelector('[list-section-type="skills"]')

    if(!section) {
      section = this.createElement('div', 'list-section', null, secondaryContent);
      section.setAttribute('list-section-type', 'skills')
      if(!this.DOM.querySelector('[list-section-type="skills"] > .list-section-title')) {
        this.createElement('h3', 'list-section-title', 'SKILLS', section);
      }
    }

    const contentElement = this.createElement('div', 'list-section-content', null, section);
    if (data.skills.length > 20) {
      const half = Math.ceil(data.skills.length / 2);
      Array.from({ length: 2 }).forEach((_, i) => {
        const list = this.createElement('ul', null, null, contentElement);
        data.skills!.slice(i * half, (i + 1) * half).forEach(point => {
          this.createElement('li', null, point.name, list);
        });
      });
    } else {
      const list = this.createElement('ul', null, null, contentElement);
      data.skills.forEach((point, index, array) => {
        this.createElement('li', null, point.name, list)

        if (this.checkSectionOverflow(secondaryContent)) {
          if (index === 0) {
            section.remove()
          }

          this.renderPages({
            skills: index === 0 ? array : array.slice(index, array.length)
          }, pageNum + 1)
          
          array.splice(0)
        }
      });
    }
  }

  private renderEducation(pageElement: HTMLElement, data: PageData, pageNum: number): void {
    const secondaryContent = pageElement.querySelector('.secondary-content') as HTMLElement;
    if (!Array.isArray(data.education) || !secondaryContent) return;

    let section = pageElement?.querySelector('[list-section-type="education"]')

    if(!section) {
      section = this.createElement('div', 'list-section', null, secondaryContent);
      section.setAttribute('list-section-type', 'education')
      if(!this.DOM.querySelector('[list-section-type="education"] > .list-section-title')) {
        this.createElement('h3', 'list-section-title', 'EDUCATION', section);
      }
    }

    const contentElement = this.createElement('div', 'list-section-content', null, section);
    const list = this.createElement('ul', null, null, contentElement);
    data.education.forEach((point, index, array) => {
      this.createElement('li', null, point, list)

      if (this.checkSectionOverflow(secondaryContent)) {
        if (index === 0) {
          section.remove()
        }

        this.renderPages({
          education: index === 0 ? array : array.slice(index, array.length)
        }, pageNum + 1)
        
        array.splice(0)
      }
    });
  }

  private renderWorkExperience(pageElement: HTMLElement, data: PageData, pageNum: number): void {
    const primaryContent = pageElement.querySelector('.primary-content') as HTMLElement;
    if (!Array.isArray(data.workExperiences) || !primaryContent) return;

    this.createElement('div', 'segment-breaker', 'WORK EXPERIENCE', primaryContent);

    const workExperienceSection = this.createElement('div', 'work-experience-section', null, primaryContent);

    data.workExperiences.forEach((experience, index, array) => {
      const workExperience = this.createElement('div', 'work-experience', null, workExperienceSection);
      if (experience.position) {
        const positionElement = this.createElement('h3', 'work-experience-position', null, workExperience);
        this.createElement('span', 'work-experience-position-name', experience.position, positionElement);
        this.createElement('span', 'work-experience-position-year', experience.year, positionElement);
      }

      if (experience.company) {
        this.createElement('h4', 'work-experience-company', experience.company, workExperience);
      }

      if (this.checkSectionOverflow(primaryContent)) {
        this.renderPages({ workExperiences: array.slice(index) }, pageNum + 1);
        workExperience.remove();
        array.splice(0);
        return;
      }

      if (Array.isArray(experience.points)) {
        const contentElement = this.createElement('ul', 'work-experience-content', null, workExperience);
        experience.points.forEach((point, pointIndex, pointArray) => {
          const item = this.createElement('li', null, point, contentElement)
          if (this.checkSectionOverflow(primaryContent)) {

            if (pointIndex === 0) {
              this.renderPages({
                workExperiences: array.slice(index, array.length)
              }, pageNum + 1)

              workExperience.remove()
              return array.splice(0)
            }

            this.renderPages({
              workExperiences: [
                {
                  points: pointArray.slice(pointIndex, pointArray.length)
                },
                ...array.slice(index + 1, array.length)
              ]
            }, pageNum + 1)

            item.remove()
            array.splice(0)
            pointArray.splice(0)
          }
        });
      }
    });
  }

  private renderIntro(pageElement: HTMLElement, data: PageData): void {
    const primaryContent = pageElement.querySelector('.primary-content') as HTMLElement;
    if (!primaryContent) return;

    if (data.name) this.createElement('h2', 'primary-content-intro', data.name, primaryContent);
    if (data.title) this.createElement('h2', 'primary-content-title', data.title, primaryContent);
    if (data.contacts) this.createElement('h4', 'primary-content-subtitle', data.contacts, primaryContent);
    if (data.website) this.createElement('h5', 'primary-content-other', data.website, primaryContent);
    if (data.linkedin) this.createElement('h5', 'primary-content-other', data.linkedin, primaryContent);
    if (data.address) this.createElement('h5', 'primary-content-other', data.address, primaryContent);
    if (data.summary) {
      this.createElement('h5', 'primary-content-summary', 'SUMMARY', primaryContent);
      this.createElement('p', 'primary-content-summary-content', data.summary, primaryContent);
    }

    const secondaryContent = pageElement.querySelector('.secondary-content') as HTMLElement;
    if (!secondaryContent) return;

    if (data.photo) {
      const photoElement = this.createElement('img', 'photo', null, secondaryContent) as HTMLImageElement;
      photoElement.src = data.photo;
    }
    
  }

  public renderPages(data: PageData, pageNum: number): void {
    const pageElement = this.createPageElement(pageNum);
    this.renderIntro(pageElement, data);
    this.renderSkill(pageElement, data, pageNum);
    this.renderEducation(pageElement, data, pageNum);
    this.renderWorkExperience(pageElement, data, pageNum);
  }

  public importGoogleFonts(font: string): void {
    if(!googleFonts.includes(font)) return;

    const link = this.DOM.head.querySelector('link[data-google-font]') ?? this.createElement('link', null, null, this.DOM.head!);
    link.setAttribute('data-google-font', font);
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', `https://fonts.googleapis.com/css?family=${font}&display=swap`);
  }

  public renderStyle(style: string): void {

    this.createElement('style', null, style, this.container!);
  }

  public refresh() {
    if(this.container) {
      this.container.innerHTML = ""
    }
  }
}

export const googleFonts = [
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Merriweather",
  "Playfair Display",
  "Source Sans Pro",
  "Raleway",
  "Nunito",
  "Oswald",
  "Ubuntu"
]