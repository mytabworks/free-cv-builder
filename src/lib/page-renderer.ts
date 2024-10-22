const A4_HEIGHT = 1000;

interface Skill {
  name: string;
  rating: number;
}

interface Education {
  points: string[];
}

interface WorkExperience {
  position: string;
  company: string;
  year: string;
  points: string[];
}

export interface PageData {
  skillRating?: boolean;
  skills?: Skill[];
  education?: string[];
  workExperiences?: WorkExperience[];
  name?: string;
  title?: string;
  subtitle?: string;
  summary?: string;
  photo?: string | null;
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
    console.log(element.clientHeight, element)
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

    const sideElement = this.createElement('div', 'side', null, pageElement);
    this.createElement('div', 'side-content', null, sideElement);

    const mainElement = this.createElement('div', 'main', null, pageElement);
    this.createElement('div', 'main-content', null, mainElement);

    this.container?.appendChild(pageElement);

    return pageElement;
  }

  private renderSkill(pageElement: HTMLElement, data: PageData, pageNum: number): void {
    const sideContent = pageElement.querySelector('.side-content') as HTMLElement;
    if (!Array.isArray(data.skills) || !sideContent) return;

    let section = pageElement?.querySelector("[list-section-type='skills']")

    if(!section) {
      section = this.createElement('div', 'list-section', null, sideContent);
      section.setAttribute('list-section-type', 'skills')
      this.createElement('h3', 'list-section-title', "SKILLS", section);
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

        if (this.checkSectionOverflow(sideContent)) {
          
          if (index === 0) {
            this.renderPages({
              skills: array
            }, pageNum + 1)
            section.remove()
            return array.splice(0)
          }

          this.renderPages({
            skills: array.slice(index, array.length)
          }, pageNum + 1)
        }
      });
    }
  }

  private renderEducation(pageElement: HTMLElement, data: PageData, pageNum: number): void {
    const sideContent = pageElement.querySelector('.side-content') as HTMLElement;
    if (!Array.isArray(data.education) || !sideContent) return;

    let section = pageElement?.querySelector("[list-section-type='education']")

    if(!section) {
      section = this.createElement('div', 'list-section', null, sideContent);
      section.setAttribute('list-section-type', 'education')
      if(!this.DOM.querySelector(`[list-section-type='education']`)) {
        this.createElement('h3', 'list-section-title', "EDUCATION", section);
      }
    }

    const contentElement = this.createElement('div', 'list-section-content', null, section);
    const list = this.createElement('ul', null, null, contentElement);
    data.education.forEach((point, index, array) => {
      this.createElement('li', null, point, list)

      if (this.checkSectionOverflow(sideContent)) {
        
        
        if (index === 0) {
          this.renderPages({
            education: array
          }, pageNum + 1)

          section.remove()
          return array.splice(0)
        }

        this.renderPages({
          education: array.slice(index, array.length)
        }, pageNum + 1)
      }
    });
  }

  private renderWorkExperience(pageElement: HTMLElement, data: PageData, pageNum: number): void {
    const mainContent = pageElement.querySelector('.main-content') as HTMLElement;
    if (!Array.isArray(data.workExperiences) || !mainContent) return;

    this.createElement('div', 'segment-breaker', '<span>WORK EXPERIENCE</span>', mainContent);

    const workExperienceSection = this.createElement('div', 'work-experience-section', null, mainContent);

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

      if (this.checkSectionOverflow(mainContent)) {
        this.renderPages({ workExperiences: array.slice(index) }, pageNum + 1);
        workExperience.remove();
        array.splice(0);
        return;
      }

      if (Array.isArray(experience.points)) {
        const contentElement = this.createElement('ul', 'work-experience-content', null, workExperience);
        experience.points.forEach(point => this.createElement('li', null, point, contentElement));
      }
    });
  }

  private renderIntro(pageElement: HTMLElement, data: PageData): void {
    const mainContent = pageElement.querySelector('.main-content') as HTMLElement;
    if (!mainContent) return;

    if (data.name) this.createElement('h2', 'main-content-intro', data.name, mainContent);
    if (data.title) this.createElement('h2', 'main-content-title', data.title, mainContent);
    if (data.subtitle) this.createElement('h4', 'main-content-subtitle', data.subtitle, mainContent);
    if (data.summary) {
      this.createElement('h5', 'main-content-summary', 'SUMMARY', mainContent);
      this.createElement('p', 'main-content-summary-content', data.summary, mainContent);
    }

    const sideContent = pageElement.querySelector('.side-content') as HTMLElement;
    if (!sideContent) return;

    if (data.photo) {
      const photoElement = this.createElement('img', 'photo', null, sideContent) as HTMLImageElement;
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

  public reset() {
    if(this.container) {
      this.container.innerHTML = ""
    }
  }
}