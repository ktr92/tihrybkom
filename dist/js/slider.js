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
    this.autoplay = settings.autoplay

    this.$container = this.$root.querySelector(
      `[data-myslider-container]`
    )
    this.$slider = this.$root.querySelector(
      `[data-myslider-slider]`
    )
    this.slides = this.$root.querySelectorAll(
      `[data-myslider-slide]`
    )
    this.screen = window.screen.width
    this.activeId = 0
    this.position = this.$slider.style.left
    this.slidesCount = this.slides.length
    this.sectionCount = this.slidesCount
    ? Math.ceil(this.slidesCount / this.slidesVisible)
    : 1

    this.responsive = settings.responsive ?? null

  this.gap = settings.gap ?? 0

    if (this.settings.slideHeight) {
      // если задана высота
      this.initByHeight()
      this.slideType = "height"

    } else if (this.settings.slideSize) {
      // если задана ширина
      this.initByWidth()
      this.slideType = "width"

    } else if (this.settings.slidesCount) {
      // если задано количество слайдов
      this.initByCount()
      this.slideType = "count"
    }

   

    // навигация
    this.$next = this.getFromRoot(this.settings.nextArrow)
    this.$prev = this.getFromRoot(this.settings.prevArrow)
    this.$dots = this.getFromRoot(this.settings.dots)

    if (this.settings.progressBar) {
      this.$current = this.getFromRoot(this.settings.progressBar.barcurrent)
      this.$total = this.getFromRoot( this.settings.progressBar.bartotal)
      this.$bline = this.getFromRoot( this.settings.progressBar.barline)      
      this.$barscroll = this.getFromRoot( this.settings.progressBar.barscroll)
      this.$bar = this.getFromRoot( this.settings.progressBar.barscroll)
      if (this.$total) {
        this.$total.innerHTML = this.slides.length
      }
    }
    console.log(this.$slider)

    this.dotsItems = null
    this.off = false
    this.sliderInit()
  }

  initByCount() {
    this.slidesVisible = this.settings.slidesCount
    this.isCustomwidth = 0
    this.slideHeight = 0
    this.slideWIdth = this.$container.offsetWidth / this.slidesVisible 
    if (this.gap && this.settings.slidesCount > 1) {
      this.slideWIdth -= this.gap
    }
    this.isFixed = false
    this.slideStep = this.slideWIdth
  }

  initByWidth() {
    this.slidesVisible = 0
    this.isCustomwidth = 1
    this.slideHeight = 0
    this.slideWIdth = this.settings.slideSize
    this.isFixed = 1
    this.slideStep = this.slideWIdth
  }

  initByHeight() {
    this.slideHeight = this.settings.slideHeight
    this.slidesVisible = 0
    this.isCustomwidth = 0
    this.slideWIdth = null
    this.isFixed = 1
    this.slideStep = []
    if (this.gap) {
      this.slides.forEach(item => {
        item.style.marginRight = this.gap + 'px'
      })
    }
  }

  getFromRoot(selector) {
    return this.$root.querySelector(selector) ?? document.querySelector(selector)
  }

  isNumber(value) {
    return typeof value === "number"
  }

  reInit(settings) {
    console.log(settings)

    if (settings.slidesCount === 0 && !this.off) {
      this.turnOff()
      return
    } else {
      this.turnOn()
    }

    if (settings.slideHeight) {
      this.slideHeight = settings.slideHeight
      this.sizeInitCustom()
      return
    }

    if (settings.slidesCount) {
      if (settings.width > window.innerWidth) {
        this.slidesVisible = settings.slidesCount
        this.slideWIdth = window.innerWidth / settings.slidesCount
      }
    }
    if (settings.slideSize) {
      this.slideWIdth = settings.slideSize
    }
  }

  turnOff() {
    this.off = true

    this.$slider.style.flexWrap = "wrap"
    this.$slider.style.width = "unset"
    if (this.$next) {
      this.$next.style.display = "none"
    }
    if (this.$prev) {
      this.$prev.style.display = "none"
    }
    if (this.$dots) {
      this.$dots.style.display = "none"
    }
    this.slides.forEach(($slide) => {
      $slide.style.width = "unset"
    })
  }
  turnOn() {
    this.off = false

    this.$slider.style.flexWrap = "none"
    if (this.$next) {
      this.$next.style.display = "block"
    }
    if (this.$prev) {
      this.$prev.style.display = "block"
    }
    if (this.$dots) {
      this.$dots.style.display = "block"
    }
  }

  sliderInit() {
    window.addEventListener("resize", () => {
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
      this.responsive.unshift({
        width: this.screen,
        slidesCount: this.settings.slidesCount ?? 1,
      })
    }
    this.activateSlide(0)
    this.sizeInit()
    this.initSwipe()
    console.log(this)

    if (this.autoplay) {
      const $this = this

      function autochange() {
        $this.activateSlide($this.activeId + 1)
      }
      setInterval(autochange, $this.autoplay)
    }

    this.$slider.classList.add("slider-active")
  }

 

  arrowsInit() {
    this.$next.addEventListener("click", () => {
      this.activateSlide(this.activeId + 1)
    })

    this.$prev.addEventListener("click", () => {
      this.activateSlide(this.activeId - 1)
    })
  }

  sizeInitCustom() {
    this.slideStep = []

    let index = 0

    this.$slider.style.height = `${this.slideHeight}px`

    let totalWidth = 0

    this.slides.forEach(($slide) => {
      let $content = $slide.children[0]

      if ($content) {
        $content.style.height = "100%"
        $content.style.maxWidth = "max-content"
        totalWidth += $content.width
        $slide.dataset.mysliderid = index
        $slide.dataset.width = $content.width
      }
      this.$slider.style.width = `${totalWidth}px` 
      this.slideStep.push($slide.offsetWidth  + this.gap)
      index++
    })
  }

  sizeInit() {
    let index = 0

    if (
      this.responsive && window.innerWidth < this.responsive[1].width &&
      this.responsive &&
      this.responsive.length
    ) {
      this.responsive.forEach((size, index) => {
        if (size.width > window.innerWidth) {
          this.screen = size.width
          this.reInit(size)
        }
      })
    }

    if (this.slideHeight) {
      this.sizeInitCustom()
      return
    }

    /*   if (!this.isFixed) {
        this.slideWIdth = this.$slider.offsetWidth / this.slidesVisible
      }  */

    if (!this.off) {
      this.slideStep = this.slideWIdth
      this.$slider.style.width = `${this.slideWIdth * this.slidesCount}px`
      this.slides.forEach(($slide) => {
        $slide.dataset.mysliderid = index

        if (this.slideHeight) {
          $slide.style.height = this.slideHeight
        } else {
          $slide.style.maxWidth = `${this.slideWIdth}px`
          $slide.style.minWidth = `${this.slideWIdth}px`
        }
        index++
      })
    }
  }

  dotsInit() {
    for (let i = 0; i < this.sectionCount; i++) {
      this.$dots.insertAdjacentHTML(
        "beforeend",
        `<div class="myslider__dots__button" data-mysliderdot="${
          i * this.slidesVisible
        }" data-myslider-dotid='${this.sliderID}'></div>`
      )
    }
    const dots = this.$root.querySelectorAll(
      `[data-myslider-dotid='${this.sliderID}']`
    )
    dots[0].classList.add("active")

    dots.forEach((el) => {
      el.addEventListener("click", (e) => {
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
    const activeDot = this.$root.querySelector(
      `[data-mysliderdot="${id}"][data-myslider-dotid='${this.sliderID}']`
    )
    if (activeDot) {
      dots.forEach((dot) => {
        dot.classList.remove("active")
      })
      activeDot.classList.add("active")
    }
  }

  activateSlide(n) {
    if (!this.slideHeight) {
      const limit = this.slidesVisible
        ? this.slidesCount - (this.slidesVisible - 1)
        : this.slides.length
      if (n < 0) {
        this.position =
          (this.slideWIdth + this.gap) * (this.slidesCount - this.slidesVisible)
        this.$slider.style.left = -this.position + "px"
        this.activeId = this.slidesCount - this.slidesVisible
      } else {
        if (n < limit) {
          this.position = (this.slideWIdth + this.gap / 2) * n
          this.$slider.style.left = -this.position + "px"
          this.activeId = n
          console.log(this.position)

        } else {
          this.$slider.style.left = 0
          this.activeId = 0
        }
      }
    } else {
      this.activateSlideCustom(n)
    }

    if (this.$current) {
      this.$current.innerHTML = this.activeId + 1
      if (this.$barscroll) {
        this.$barscroll.style.width =
        (this.activeId + 1) *
          (this.$bline.getBoundingClientRect().width / this.slides.length) +
        "px"
      }
    }
    this.activateDot(this.dotsItems, this.activeId)
  }

  activateSlideCustom(n) {
    if (n < 0) {
      this.position = 0
      this.slideStep.forEach((step, index) => {
        return (this.position += step)
      })
      this.$slider.style.left =
        -this.position + this.slideStep[this.slideStep.length - 1] + "px"
      this.activeId = this.slideStep.length - 1
    } else {
      if (n < this.slidesCount) {
        this.position = 0
        this.slideStep.forEach((step, index) => {
          return (this.position += Number(index < n) * step)
        })
        this.$slider.style.left = -this.position + "px"
        this.activeId = n
      } else {
        this.$slider.style.left = 0
        this.activeId = 0
      }
    }
  }

  initSwipe() {
    let initialX = null
    let initialY = null

    const startTouch = (e) => {
      initialX = e.touches[0].clientX
      initialY = e.touches[0].clientY
    }

    const moveTouch = (e) => {
      if (initialX === null) {
        return
      }

      if (initialY === null) {
        return
      }

      let currentX = e.touches[0].clientX
      let currentY = e.touches[0].clientY
      let diffX = initialX - currentX
      let diffY = initialY - currentY

      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          this.activateSlide(this.activeId + 1)
        } else {
          this.activateSlide(this.activeId - 1)
        }
      }

      initialX = null
      initialY = null

      e.preventDefault()
    }

    if (!this.off) {
      this.$slider.addEventListener("touchstart", startTouch, false)
      this.$slider.addEventListener("touchmove", moveTouch, false)
    } else {
      this.$slider.removeEventListener("touchstart", startTouch, false)
      this.$slider.removeEventListener("touchmove", moveTouch, false)
    }
  }
}
