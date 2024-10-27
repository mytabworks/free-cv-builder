const A4_HEIGHT = 1040;

interface Skill {
  name: string;
  rating: number;
}

interface Section {
  title: string;
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
  showRatings?: boolean;
  skillSplit?: boolean;
  skillRatingBlock?: boolean;
  skills?: Skill[];
  sections?: Section[];
  workExperiences?: WorkExperience[];
}

export class PageRenderer {
  private displaySecondarySection: boolean;
  private maxHeight: number;
  private container: HTMLElement | null;
  private DOM: Document;

  constructor(DOM: Document, { 
    maxHeight = A4_HEIGHT,
    displaySecondarySection = true
  }: { maxHeight?: number, displaySecondarySection?: boolean } = {}) {
    this.displaySecondarySection = displaySecondarySection;
    this.maxHeight = maxHeight;
    this.container = DOM.getElementById('container');
    this.DOM = DOM
  }

  private isPageOverflow(element: HTMLElement): boolean {
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

    this.container?.appendChild(pageElement);

    if(this.displaySecondarySection) {
      const secondaryElement = this.createElement('div', 'secondary', null, pageElement);
      this.createElement('div', 'secondary-content', null, secondaryElement);
  
      const primaryElement = this.createElement('div', 'primary', null, pageElement);
      this.createElement('div', 'primary-content', null, primaryElement);
      return pageElement;
    }

    return this.createElement('div', 'single-container', null, pageElement);

  }

  private renderSkill(pageElement: HTMLElement, data: PageData, pageNum: number): void {
    const container = this.displaySecondarySection 
      ? pageElement.querySelector<HTMLElement>('.secondary-content') 
      : pageElement.querySelector<HTMLElement>('.single-container-content[data-single-type="experience"] > .narrower-content')
      
    if (!Array.isArray(data.skills) || data.skills.length === 0 || !container) return;
      
    const baseOverflow = pageNum !== 1 || this.displaySecondarySection 
      ? container
      : pageElement

    let section = pageElement?.querySelector('[data-list-section-type="fcv-skills"]')

    if(!section) {
      section = this.createElement('div', 'list-section', null, container);
      section.setAttribute('data-list-section-type', 'fcv-skills')
      if(!this.DOM.querySelector('[data-list-section-type="fcv-skills"] > .list-section-title')) {
        this.createElement('h3', 'list-section-title', 'SKILLS', section);
      }
    }

    const contentElement = this.createElement('div', 'list-section-content', null, section);
    if (!data.skillSplit) {
      const collectedCutSkills: Skill[] = []
      const half = Math.ceil(data.skills.length / 2);
      Array.from({ length: 2 }).forEach((_, i) => {
        const list = this.createElement('ul', null, null, contentElement);
        data.skills!.slice(i * half, (i + 1) * half).forEach((point, index, array) => {
          const item = this.createElement('li', null, point.name, list)

          if(data.showRatings) {
            item.innerHTML = ''
            const rating = `${point.rating/10*100}%`
            const rate = this.createElement('span', 'skill-name skill-block', point.name, item)
            const progress = this.createElement('div', 'skill-progress', null, rate)
            const bar = this.createElement('div', 'skill-progress-bar', null, progress)
            bar.style.width = rating
          }

          if (this.isPageOverflow(baseOverflow)) {
            if (index === 0) {
              section.remove()
            } else {
              item.remove()
            }
            
            const cutItems = index === 0 ? array : array.slice(index, array.length)

            collectedCutSkills.push(...cutItems)

            array.splice(0)
          }
        });
      });

      if(collectedCutSkills.length > 0) {
        this.renderPages({
          skills: collectedCutSkills,
          showRatings: data.showRatings,
          skillSplit: data.skillSplit,
          skillRatingBlock: data.skillRatingBlock,
        }, pageNum + 1)
      }

    } else {
      const list = this.createElement('ul', null, null, contentElement);
      data.skills.forEach((point, index, array) => {
        const item = this.createElement('li', null, point.name, list)

        if(data.showRatings) {
          item.innerHTML = ''
          const rating = `${point.rating/10*100}%`
          const rate = this.createElement('span', `skill-name${data.skillRatingBlock ? ' skill-block' : ''}`, point.name, item)
          const progress = this.createElement('div', 'skill-progress', null, rate)
          const bar = this.createElement('div', 'skill-progress-bar', null, progress)
          bar.style.width = rating
        }

        if (this.isPageOverflow(baseOverflow)) {
          if (index === 0) {
            section.remove()
          } else {
            item.remove()
          }

          this.renderPages({
            skills: index === 0 ? array : array.slice(index, array.length),
            showRatings: data.showRatings,
            skillSplit: data.skillSplit,
            skillRatingBlock: data.skillRatingBlock,
          }, pageNum + 1)
          
          array.splice(0)
        }
      });
    }
  }

  private renderSection(pageElement: HTMLElement, data: PageData, pageNum: number): void {
    const container = this.displaySecondarySection 
      ? pageElement.querySelector<HTMLElement>('.secondary-content') 
      : pageElement.querySelector<HTMLElement>('.single-container-content[data-single-type="experience"] > .narrower-content')

    if (!Array.isArray(data.sections) || data.sections.length === 0 || !container) return;

    const baseOverflow = pageNum !== 1 || this.displaySecondarySection 
      ? container
      : pageElement

    data.sections.forEach((section, index, array) => {
      const sectionElement = this.createElement('div', 'list-section', null, container);
      sectionElement.setAttribute('data-list-section-type', section.title)
      if(!this.DOM.querySelector(`[data-list-section-type="${section.title}"] > .list-section-title`)) {
        this.createElement('h3', 'list-section-title', section.title, sectionElement);
      }

      const contentElement = this.createElement('div', 'list-section-content', null, sectionElement);
      if (this.isPageOverflow(baseOverflow)) {
        sectionElement.remove();
        this.renderPages({ sections: array.slice(index) }, pageNum + 1);
        array.splice(0);
        return;
      }

      if (Array.isArray(section.points)) {
        const list = this.createElement('ul', null, null, contentElement);
        section.points.forEach((point, pointIndex, pointArray) => {
          const item = this.createElement('li', null, point, list)

          if (this.isPageOverflow(baseOverflow)) {
            if (pointIndex === 0) {
              sectionElement.remove()

              this.renderPages({
                sections: array.slice(index, array.length)
              }, pageNum + 1)
              
              pointArray.splice(0)
              return array.splice(0)
            }

            this.renderPages({
              sections: [
                {
                  title: section.title,
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

  private renderWorkExperience(pageElement: HTMLElement, data: PageData, pageNum: number): void {
    const container = this.displaySecondarySection 
      ? pageElement.querySelector<HTMLElement>('.primary-content') 
      : pageElement.querySelector<HTMLElement>('.single-container-content[data-single-type="experience"] > .wider-content')

    if (!Array.isArray(data.workExperiences) || !container) return;

    const baseOverflow = pageNum !== 1 || this.displaySecondarySection 
      ? container
      : pageElement

    this.createElement('div', 'segment-breaker', 'WORK EXPERIENCE', container);

    const workExperienceSection = this.createElement('div', 'work-experience-section', null, container);

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

      if (this.isPageOverflow(baseOverflow)) {
        workExperience.remove();
        this.renderPages({ workExperiences: array.slice(index) }, pageNum + 1);
        array.splice(0);
        return;
      }

      if (Array.isArray(experience.points)) {
        const contentElement = this.createElement('ul', 'work-experience-content', null, workExperience);
        experience.points.forEach((point, pointIndex, pointArray) => {
          const item = this.createElement('li', null, point, contentElement)
          if (this.isPageOverflow(baseOverflow)) {

            if (pointIndex === 0) {
              workExperience.remove()
              this.renderPages({
                workExperiences: array.slice(index, array.length)
              }, pageNum + 1)

              pointArray.splice(0)
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

    if(!this.displaySecondarySection) {
      const singleContainer = this.createElement('div', 'single-container-content', null, pageElement);
      singleContainer.setAttribute('data-single-type', 'intro');
      const narrowerContent = this.createElement('div', 'narrower-content', null, singleContainer);

      if (data.photo) {
        const photoElement = this.createElement('img', 'photo', null, narrowerContent) as HTMLImageElement;
        photoElement.src = data.photo;
      }

      const widerContent = this.createElement('div', 'wider-content', null, singleContainer);

      if (data.name) this.createElement('h2', 'primary-content-intro', data.name, widerContent);
      if (data.title) this.createElement('h2', 'primary-content-title', data.title, widerContent);
      if (data.contacts) this.createElement('h4', 'primary-content-subtitle', data.contacts, widerContent);
      if (data.website) this.createElement('h5', 'primary-content-other', data.website, widerContent);
      if (data.linkedin) this.createElement('h5', 'primary-content-other', data.linkedin, widerContent);
      if (data.address) this.createElement('h5', 'primary-content-other', data.address, widerContent);

      if (data.summary) {
        this.createElement('h5', 'primary-content-summary', 'SUMMARY', pageElement);
        this.createElement('p', 'primary-content-summary-content', data.summary, pageElement);
      }
      return;
    }

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

    if(pageNum === 1) {
      this.renderIntro(pageElement, data);
    }

    if(!this.displaySecondarySection) {
      const experienceSingle = this.createElement('div', 'single-container-content', null, pageElement);
      experienceSingle.setAttribute('data-single-type', 'experience');
      this.createElement('div', 'wider-content', null, experienceSingle);
      this.createElement('div', 'narrower-content', null, experienceSingle);
    }

    this.renderSkill(pageElement, data, pageNum);
    this.renderSection(pageElement, data, pageNum);
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