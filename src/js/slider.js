/*** 
 * slidesCount: number - показать определнное количество слайдов одинаковой длины
 * slideSize: number - показывать слайды определенной ширины
 * slideHeight: number - показать слайды определенной высоты, разной ширины
 * ***/

class Myslider {
  constructor(selector, settings) {
    this.settings = settings
    this.$root = document.querySelector(selector)
    this.sliderID = this.$root.dataset.mysliderWrapper

    this.$container = this.$root.querySelector(`[data-myslider-container='${this.sliderID}']`)
    this.$slider =  this.$root.querySelector(`[data-myslider-slider='${this.sliderID}']`)
    this.slides = this.$root.querySelectorAll(`[data-myslider-slide='${this.sliderID}']`)

    this.screen = window.screen.width

    // если задана высота
    if (this.settings.slideHeight) {
      this.slideHeight = this.settings.slideHeight
      this.slidesVisible = 0
      this.isCustomwidth = 0
      this.slideWIdth = null
      this.isFixed = 1
      this.slideStep = []
      

    }

    // если задана ширина
    if (this.settings.slideSize) {
      this.slidesVisible = 0
      this.isCustomwidth = 1
      this.slideHeight = 0
      this.slideWIdth = this.settings.slideSize
      this.isFixed = 1
      this.slideStep = this.slideWIdth
    }

    // если задано количество слайдов
    if (this.settings.slidesCount) {
      this.slidesVisible = this.settings.slidesCount
      this.isCustomwidth = 0
      this.slideHeight = 0
      this.slideWIdth = this.$container.offsetWidth / this.slidesVisible
      this.isFixed = false
      this.slideStep = this.slideWIdth

    }

    this.activeId = 0
    this.position = this.$slider.style.left

    this.slidesCount =  this.slides.length
    this.sectionCount = this.slidesCount ? Math.ceil(this.slidesCount / this.slidesVisible) : 1
    this.responsive = settings.responsive ?? null
    this.gap = settings.gap ?? 0

    // навигация
    this.$next = this.$root.querySelector(`[data-myslider-next='${this.sliderID}']`)
    this.$prev = this.$root.querySelector(`[data-myslider-prev='${this.sliderID}']`)
    this.$dots = this.$root.querySelector(`[data-myslider-dots='${this.sliderID}']`)
    this.$current = this.$root.querySelector(`[data-myslider-barcurrent='${this.sliderID}']`)
    this.$total = this.$root.querySelector(`[data-myslider-bartotal='${this.sliderID}']`)
    this.$bline = this.$root.querySelector(`[data-myslider-barline='${this.sliderID}']`)
    if (this.$total) {
      this.$total.innerHTML = this.slides.length
    }
    this.dotsItems = null
    this.off = false
    
    this.sliderInit()
  }

  isNumber(value) {
    return typeof value === 'number';
  }

  turnOff() {
    this.off = true

    this.$slider.style.flexWrap = 'wrap'
    this.$slider.style.width = 'unset'
    if (this.$next) {
      this.$next.style.display = 'none'
    }
    if (this.$prev) {
      this.$prev.style.display = 'none'
    }
    if (this.$dots) {
      this.$dots.style.display = 'none'
    }
    this.slides.forEach($slide => {
      $slide.style.width = 'unset'
    })
  }
  turnOn() {
    this.off = false

    this.$slider.style.flexWrap = 'none'
    if (this.$next) {
      this.$next.style.display = 'block'
    }
    if (this.$prev) {
      this.$prev.style.display = 'block'
    }
    if (this.$dots) {
      this.$dots.style.display = 'block'
    }

  }

  sliderInit() {
    window.addEventListener('resize', () => {
      this.activateSlide(0)
      this.sizeInit()
    })
    
    if (this.$next && this.$prev) {
      this.arrowsInit()
    }
    if (this.$dots) {
      this.dotsInit()
    }
    if (this.responsive && this.responsive.length > 0) {
      this.responsive.unshift({width: this.screen, slidesCount: this.settings.slidesCount ?? 1})
    }
    this.activateSlide(0)
    this.sizeInit()
    this.initSwipe()

    this.$slider.classList.add('slider-active')
  }

  arrowsInit() {
    this.$next.addEventListener('click', () => {
      this.activateSlide(this.activeId + 1)
    });

    this.$prev.addEventListener('click', () => {
      this.activateSlide(this.activeId - 1)
    });
  }
  
  sizeInitCustom() {
    this.slideStep = []

    let index = 0

    this.$slider.style.height =  `${this.slideHeight}px`

    let totalWidth = 0

    this.slides.forEach($slide => {
      let $content = $slide.children[0]
     
      if ($content) {
        $content.style.height = '100%';
        $content.style.maxWidth = 'max-content';
        totalWidth += $content.width
        $slide.dataset.mysliderid = index
        $slide.dataset.width = $content.width
      }
      this.$slider.style.width = `${totalWidth}px`
      this.slideStep.push($slide.offsetWidth)
      index++
  })
}

  sizeInit() {
    let index = 0

      if (window.innerWidth < this.responsive[1].width && this.responsive && this.responsive.length) {
        this.responsive.forEach((size, index) => {

          if (size.width > window.innerWidth) {
            if (size.slidesCount === 0 && !this.off) {
              this.turnOff()
              return;
            } else {
              this.turnOn()
            }

            if (size.slideHeight) {
              this.slideHeight = size.slideHeight
              this.sizeInitCustom()
              return;
            }

            if (size.slidesCount) {
              if (size.width > window.innerWidth) {
                this.screen = size.width
                this.slidesVisible = size.slidesCount
                this.slideWIdth = window.innerWidth / size.slidesCount
              }
            }
            if (size.slideSize) {
              this.slideWIdth = size.slideSize
            }
  
           
           
          }

          
        })
      }

      if (this.slideHeight) {
        this.sizeInitCustom()
        return;
      }
      
    /*   if (!this.isFixed) {
        this.slideWIdth = this.$slider.offsetWidth / this.slidesVisible
      }  */
   
      if (!this.off) {
        this.slideStep = this.slideWIdth
        this.$slider.style.width = `${this.slideWIdth * this.slidesCount}px`
        this.slides.forEach($slide => {
         
          $slide.dataset.mysliderid = index
  
          if (this.slideHeight) {
            $slide.style.height = this.slideHeight
          } else {
            $slide.style.maxWidth =   `${this.slideWIdth}px`
            $slide.style.minWidth =   `${this.slideWIdth}px`
          }
          index++
        })
      }
    

   
    
  }

  dotsInit() {
  
    for (let i = 0; i < this.sectionCount; i++) {
      this.$dots.insertAdjacentHTML('beforeend', `<div class="myslider__dots__button" data-mysliderdot="${i * (this.slidesVisible)}" data-myslider-dotid='${this.sliderID}'></div>`)
    }
    const dots = this.$root.querySelectorAll(`[data-myslider-dotid='${this.sliderID}']`)
    dots[0].classList.add('active')

    dots.forEach(el => {
      el.addEventListener('click', (e) => {
        const id = +e.target.dataset.mysliderdot
        if (id < this.slidesCount - (this.slidesVisible - 1)) {
          this.activateSlide(id)

        } else {
          this.activateSlide(this.slidesCount - this.slidesVisible)

        }
      })
    })

    this.dotsItems = dots
  }

  activateDot(dots, id) {
    const activeDot = this.$root.querySelector(`[data-mysliderdot="${id}"][data-myslider-dotid='${this.sliderID}']`)
    if (activeDot) {
      dots.forEach(dot => {
        dot.classList.remove('active')
      })
      activeDot.classList.add('active')
    }
  } 



  activateSlide(n) {
    if (!this.slideHeight) {
      const limit = this.slidesVisible ? this.slidesCount - (this.slidesVisible - 1) : this.slides.length
      if (n < 0) {
        this.position = (this.slideWIdth + this.gap) * (this.slidesCount - this.slidesVisible)
        this.$slider.style.left = -this.position + 'px'
        this.activeId = this.slidesCount - this.slidesVisible
       } else {
        if (n < limit) {
          this.position = (this.slideWIdth + this.gap) * n
          this.$slider.style.left = -this.position + 'px'
          this.activeId = n
         } else {
          this.$slider.style.left = 0
          this.activeId = 0
         }
       }
    } else {
      this.activateSlideCustom(n)
    }

    if (this.$current && this.$total) {
      this.$current.innerHTML = this.activeId + 1
      this.$bline.querySelector('[data-myslider-barscroll]').style.width = ((this.activeId + 1)) * (this.$bline.getBoundingClientRect().width / this.slides.length) + 'px'
    }

      
    this.activateDot(this.dotsItems, this.activeId)

  }
  
  activateSlideCustom(n) {
    if (n < 0) {
      this.position = 0
      this.slideStep.forEach((step, index) => {
        return this.position += step
      })
      this.$slider.style.left = -this.position + this.slideStep[this.slideStep.length - 1] + 'px'
      this.activeId = this.slideStep.length - 1
    } else {
      if (n < this.slidesCount) {
        this.position = 0
        this.slideStep.forEach((step, index) => {
          return this.position += Number(index < n) * step
        })
        this.$slider.style.left = -this.position + 'px'
        this.activeId = n
       } else {
        this.$slider.style.left = 0
        this.activeId = 0
       }
    }
  }


  initSwipe() {
       let initialX = null;
       let initialY = null;    

       const startTouch = (e) => {

         initialX = e.touches[0].clientX;
         initialY = e.touches[0].clientY;
       };     

       const moveTouch = (e) => {
         if (initialX === null) {
           return;
         } 

         if (initialY === null) {
           return;
         }  

         let currentX = e.touches[0].clientX;
         let currentY = e.touches[0].clientY;    
         let diffX = initialX - currentX;
         let diffY = initialY - currentY;
    
         if (Math.abs(diffX) > Math.abs(diffY)) {
           if (diffX > 0) {
            this.activateSlide(this.activeId + 1)
           } else {
            this.activateSlide(this.activeId - 1)
           }  
         } 
     
         initialX = null;
         initialY = null;
     
         e.preventDefault();
       };

       if (!this.off) {
        this.$slider.addEventListener("touchstart", startTouch, false);
        this.$slider.addEventListener("touchmove", moveTouch, false);
       } else {
        this.$slider.removeEventListener("touchstart", startTouch, false);
        this.$slider.removeEventListener("touchmove", moveTouch, false);
       }

   
  }

}


