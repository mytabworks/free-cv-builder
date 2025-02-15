const A4_HEIGHT = 1120;
const CONTACT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z"/></svg>`
const EMAIL_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7 .3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2 .4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"/></svg>`
const LINKEDIN_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/></svg>`
const MARKER_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M172.3 501.7C27 291 0 269.4 0 192 0 86 86 0 192 0s192 86 192 192c0 77.4-27 99-172.3 309.7-9.5 13.8-29.9 13.8-39.5 0zM192 272c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80z"/></svg>`
const WEBSITE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"/></svg>`
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
  email?: string;
  contact?: string;
  website?: string;
  linkedin?: string;
  address?: string;
  summary?: string;
  photo?: string | null;
  showIcons?: boolean;
  showRatings?: boolean;
  skillSplit?: boolean;
  skillRatingBlock?: boolean;
  skills?: Skill[];
  sections?: Section[];
  workExperiences?: WorkExperience[];
}

export class PageRenderer {
  private reverse: boolean;
  private displaySecondarySection: boolean;
  private maxHeight: number;
  private container: HTMLElement | null;
  private DOM: Document;

  constructor(
    DOM: Document, 
    { 
      maxHeight = A4_HEIGHT,
      displaySecondarySection = true,
      reverse = false
    }: { 
      maxHeight?: number, 
      displaySecondarySection?: boolean ,
      reverse?: boolean
    } = {}
  ) {
    this.reverse = reverse;
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
    pageElement.setAttribute('data-page-type', this.displaySecondarySection ? 'double' : 'single');
    pageElement.setAttribute('data-reverse', this.reverse.toString());

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
    if (data.skillSplit) {
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
    this.DOM.title = data.name!.replaceAll(' ', '-').toLowerCase() + '-cv'
    const renderGeneric = (element: HTMLElement) => {
      if (data.name) this.createElement('h2', 'primary-content-intro', data.name, element);
      if (data.title) this.createElement('h2', 'primary-content-title', data.title, element);
      if (data.email) {
        const emailElement = this.createElement('h4', 'primary-content-subtitle', data.showIcons ? null : data.email, element);
        
        if(data.showIcons) {
          this.createElement('span', 'icon', null, emailElement).innerHTML = EMAIL_ICON;
          emailElement.append(data.email);
        }
      }
      
      if (data.contact) {
       const contactElement = this.createElement('h5', 'primary-content-other', data.showIcons ? null : data.contact, element);
        
        if(data.showIcons) {
          this.createElement('span', 'icon', null, contactElement).innerHTML = CONTACT_ICON;
          contactElement.append(data.contact);
        }
      }

      if (data.website) {
       const websiteElement = this.createElement('h5', 'primary-content-other', data.showIcons ? null : data.website, element);
        
        if(data.showIcons) {
          this.createElement('span', 'icon', null, websiteElement).innerHTML = WEBSITE_ICON;
          websiteElement.append(data.website);
        }
      }

      if (data.linkedin) {
        const linkedinElement = this.createElement('h5', 'primary-content-other', data.showIcons ? null : data.linkedin, element);
        
        if(data.showIcons) {
          this.createElement('span', 'icon', null, linkedinElement).innerHTML = LINKEDIN_ICON;
          linkedinElement.append(data.linkedin);
        }
      } 

      if (data.address) {
        const addressElement = this.createElement('h5', 'primary-content-other', data.showIcons ? null : data.address, element);
        
        if(data.showIcons) {
          this.createElement('span', 'icon', null, addressElement).innerHTML = MARKER_ICON;
          addressElement.append(data.address);
        }
      } 
    }

    if(!this.displaySecondarySection) {
      const singleContainer = this.createElement('div', 'single-container-content', null, pageElement);
      singleContainer.setAttribute('data-single-type', 'intro');
      const narrowerContent = this.createElement('div', 'narrower-content', null, singleContainer);

      if (data.photo) {
        const photoElement = this.createElement('img', 'photo', null, narrowerContent) as HTMLImageElement;
        photoElement.src = data.photo;
      }

      const widerContent = this.createElement('div', 'wider-content', null, singleContainer);

      renderGeneric(widerContent);

      if (data.summary) {
        this.createElement('h5', 'primary-content-summary', 'SUMMARY', pageElement);
        this.createElement('p', 'primary-content-summary-content', data.summary, pageElement);
      }
      return;
    }

    const primaryContent = pageElement.querySelector('.primary-content') as HTMLElement;
    if (!primaryContent) return;

    renderGeneric(primaryContent);

    if (data.summary) {
      this.createElement('h5', 'primary-content-summary', 'SUMMARY', primaryContent);
      this.createElement('p', 'primary-content-summary-content', data.summary, primaryContent);
    }

    const secondaryContent = pageElement.querySelector('.secondary-content') as HTMLElement;
    if (!secondaryContent) return;

    if (data.photo) {
      const photoElement = this.createElement('img', 'photo', null, secondaryContent) as HTMLImageElement;
      photoElement.src = data.photo;
    } else {
      const intro = pageElement.querySelector<HTMLElement>('.primary-content-intro')
      const title = pageElement.querySelector<HTMLElement>('.primary-content-title')
      
      if(intro) {
        secondaryContent.appendChild(intro)
        intro.style.margin = '10px 0 10px'
      }

      if(title) {
        secondaryContent.appendChild(title)
        title.style.marginBottom = '30px'
      }
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