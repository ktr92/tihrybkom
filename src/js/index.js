
function initFE() {
  productSlider();
  progressSliderInit();
  brandSliderInit();
  newsSliderInit();
  lazyLoadSrc('img');
  lazyLoadSrc('iframe', 'https://www.youtube.com/embed/', '?rel=0&amp;amp;showinfo=0;amp;autoplay=0"');
  detailsliderInit();
  closeByOutsideSelect()
  closeByClickOutside('.mainmenu', '.mainmenubtn')
  closeByClickOutside('.catalogpage__aside', '.js-mobilefilter')
  
};


function detailsliderInit() {
  const swiper = new Swiper(".detailswiperpreview", {
      spaceBetween: 10,
      scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true,
      },
      slidesPerView: "auto",
      mousewheel: true,
      direction: 'vertical',
      freeMode: true,
      watchSlidesProgress: true,

  });
  const swiper2 = new Swiper(".detailswiper", {

      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
      },
      thumbs: {
          swiper: swiper,
      },
      pagination: {
          el: ".detailslider-pagination",
          clickable: true
      },

  });

  $(function () {
    $(".zoom-box").each(function () {
      $(this).zoom()
    })
  })
}

function lazyLoadSrc(selector, prevalue = '', postvalue = '') {
  const callback = (entries, observer) => {
    entries.forEach(entry => {
      const img = entry.target
      if (entry.intersectionRatio > 0) {
        if (!img.getAttribute('src')) {
            img.setAttribute('src', prevalue + img.dataset.src + postvalue)
              
          observer.unobserve(img)
        }
      }
    })
  }
  const target = document.querySelectorAll(selector)
  const options = {
    threshold: 0.4
  }
  let obs = new IntersectionObserver(callback, options)
  target.forEach(item => {
    obs.observe(item)

  })
}

function brandSliderInit() {
  if (document.querySelector("[data-myslider-wrapper='slider_brands']")) {
    const slider = new Myslider("[data-myslider-wrapper='slider_brands']", {
      slideSize: 466,
      gap: 40,
      prevArrow: '[data-myslider-prev]',
      nextArrow: '[data-myslider-next]',
      responsive: [
        {
          width: 992,
          slideSize: 333
        },
        {
          width: 480,
          slideSize: 236
        }
      ]
    })
  
  }
  


}
function newsSliderInit() {
  if (document.querySelector("[data-myslider-wrapper='slider_news']")) {

  const slider = new Myslider("[data-myslider-wrapper='slider_news']", {
    slideSize: 742,
    gap: 19,
    responsive: [
      {
        width: 992,
        slideSize: 444
      },
      {
        width: 480,
        slideSize: 300
      }
    ]
  })
}



}
function productSlider() {
  if (document.querySelector("[data-myslider-wrapper='slider_products']")) {

  const slider = new Myslider("[data-myslider-wrapper='slider_products']", {
    slidesCount: 3,
    gap: 20,
    prevArrow: '[data-prev]',
    nextArrow: '[data-next]',
    responsive: [
      {
        width: 1023,
        slidesCount: 2
      },
      {
        width: 480,
        slidesCount: 0
      }
    ]
  })
}

}

function progressSliderInit() {
  if (document.querySelector("[data-myslider-wrapper='slider_aboutblock']")) {

  const slider = new Myslider("[data-myslider-wrapper='slider_aboutblock']", {
    slideHeight: 711,
    prevArrow: '[data-prev]',
    nextArrow: '[data-next]',
    progressBar: {
      barcurrent: '[data-barcurrent]',
      bartotal: '[data-bartotal]',
      barline: '[data-barline]',
      bar: '[data-bar]',
      barscroll: '[data-barscroll]',
    },
    responsive: [
      {
        width: 992,
        slideHeight: 444
      },
      {
        width: 480,
        slideHeight: 222
      }
     
    ]
  });
}
}

function dropdownInit() {
  $("[data-dropdownclick]").on("click", function (e) {
    $(this).toggleClass("active")
    e.preventDefault()
    let dropdown = $(this).data("dropdownclick")
    $("[data-dropdown].active")
      .not($(`[data-dropdown=${dropdown}]`))
      .removeClass("active")
    $("[data-dropdownclick].active")
      .not($(`[data-dropdownclick=${dropdown}]`))
      .removeClass("active")
    $(`[data-dropdown=${dropdown}]`).toggleClass("active")
    // $(`[data-toggleactive=${dropdown}]`).toggleClass("active")
  })
}
$(document).ready(function () {

  document.querySelectorAll('[data-toggle="password"]').forEach(item => {
    item.addEventListener('click', event => {

        let inp = item.previousElementSibling
        if (inp.type === "password") {
            inp.type = "text";
        } else {
            inp.type = "password";
        }
    })
  })




  $('.js-mobilefilter').on('click', function(e) {
    e.preventDefault()
    $(this).toggleClass('active')
    $('.catalogpage__aside').toggleClass('active')
})
  

  $("[data-click='scrolltop']").click(function() {
    $("html, body").animate({scrollTop: 0}, 400);
 });
  $(function() {
    $(window).scroll(function() {
        if($(window).scrollTop() >= 200 && $(window).scrollTop() <= ($(document).height() - 500)) {
            $('#scrolltop').addClass('active');
        } else {
            $('#scrolltop').removeClass('active');
        }
    });
});

  const video = document.querySelector('[data-videobutton]')

  if (video) {
    video.addEventListener('click', event => {
      event.stopPropagation()
      const VIDEO_ID = event.target.getAttribute('data-videobutton')
      $(`iframe[data-videoid='${VIDEO_ID}']`)[0].src += "&autoplay=1"
      event.target.style.display = 'none'
    })
  }
 
  $("a.scrollTo").click(function () {

    var destination = $($(this).attr("href")).offset().top - 30;
    $("html:not(:animated),body:not(:animated)").animate({
      scrollTop: destination
    }, 1100);
    return false;
  });

  
  $(document).on('click', "[data-toggleclass]", (e) => {
    e.stopPropagation()
    e.preventDefault()
    $(e.target).addClass('active')
  })

 /*  $(function() {
    $("iframe[data-src]").each(function() {
        $(this).Lazy();
    })
  }); */
 
  new WOW().init();

  $(".limitheight__button").on("click", function (e) {
    e.preventDefault()
    $(this).hide()
    $(this).closest('.limitheight').toggleClass("active")
  })
  $("[data-toggleclick='mainmenu']").on("click", function (e) {
    e.preventDefault()
    $(".jsbackdrop").toggleClass("active")
    $(this).toggleClass("active")
    $("[data-toggle='mainmenu']").toggleClass("active")
    $('#header').toggleClass('active')
    $('[data-toggle="headersearch"]').toggleClass("active")
  })
  $("[data-toggleclick='hiddentext']").on("click", function (e) {
    e.preventDefault()
    $(this).toggleClass("active")
    $("[data-toggle='hiddentext']").slideToggle()
    $('[data-toggle="hiddentext"]').toggleClass("active")
  })

  $("[data-toggleclick='headersearch']").on("click", function (e) {
    e.preventDefault()
    $('[data-toggle="headersearch"]').toggleClass("active")

  })
  $("[data-toggle='menuitems'").on("click", function (e) {
    e.preventDefault()
    $(this).siblings("li:not(.active)").toggleClass("active")
    $(this).remove()
  })
  $(".jscatalog .js-toggler").on("click", function (e) {
    $(this).closest(".jscatalog").toggleClass("active")
    $(this)
      .closest(".jscatalog")
      .siblings(".mobilemenu__level2")
      .toggleClass("active")
  })
  $(".mobilemenu__level2 .js-toggler").on("click", function (e) {
    $(this).closest(".mobilemenu__content").toggleClass("active")
    $(this)
      .closest(".mobilemenu__item")
      .find(".mobilemenu__level3")
      .slideToggle()
  })

 /*  $(".menubutton").on("click", function (e) {
    $(this).toggleClass("active")
    $(".mobilemenu").toggleClass("active")
    $(".jsbackdrop").toggleClass("active")
    $(".mobilemenu__level2").removeClass("active")
    $(".mobilemenu__content").removeClass("active")
  }) */
  $(".jsbackdrop").on("click", function (e) {
    $(this).removeClass("active")
    $(".mobilemenu").removeClass("active")
    $(".menubutton").removeClass("active")
    $(".mobilemenu__level2").removeClass("active")
    $(".mobilemenu__content").removeClass("active")
  })
  $(".haederbanner__close").on("click", function (e) {
    e.preventDefault()
    $(this).closest(".haederbanner").hide()
  })

  $('.cardrating').each(function() {
    $(this).find('span.stars-active').css('width', $(this).find('.cardrating__value').text() * 20.5);
});

  $(".reviewsblock__rating").each(function () {
    $(this)
      .find("span.stars-active")
      .css("width", $(this).find(".reviewsblock__value").text() * 24.4)
  })

    $("input[type=tel]").mask("7 (999) 999-99-99")
  
    lightbox.option({
    resizeDuration: 0,
  })

  function incrementValue(e) {
    e.preventDefault()
    var fieldName = $(e.target).data("field")
    var parent = $(e.target).closest("div")
    var currentVal = parseInt(
      parent.find("input[name=" + fieldName + "]").val(),
      10
    )

    if (!isNaN(currentVal)) {
      parent.find("input[name=" + fieldName + "]").val(currentVal + 1)
    } else {
      parent.find("input[name=" + fieldName + "]").val(1)
    }
  }

  function decrementValue(e) {
    e.preventDefault()
    var fieldName = $(e.target).data("field")
    var parent = $(e.target).closest("div")
    var currentVal = parseInt(
      parent.find("input[name=" + fieldName + "]").val(),
      10
    )

    if (!isNaN(currentVal) && currentVal > 1) {
      parent.find("input[name=" + fieldName + "]").val(currentVal - 1)
    } else {
      parent.find("input[name=" + fieldName + "]").val(1)
    }
  }

  $(".quantity").on("click", ".quantity-plus", function (e) {
    incrementValue(e)
  })

  $(".quantity").on("click", ".quantity-minus", function (e) {
    decrementValue(e)
  })
  ;(function ($) {
    $(function () {
      $("[data-tabsbutton]").on("click", "li span:not(.active) ", function (e) {
        e.preventDefault()
        $(this)
          .addClass("active")
          .parent().siblings().find('span').removeClass("active")
        $(this).closest("[data-tabs]").find("[data-tabscontent]").removeClass("active")
          .eq($(this).parent().index())
          .addClass("active")
      })
    })
  })(jQuery)
  ;(function ($) {
    $(function () {
      $("[data-headertabs]").on("click", "li:not(.active)", function () {
        $(this)
          .addClass("active")
          .siblings()
          .removeClass("active")
          .closest("[data-tabs]")
          .find("[data-contenttabs]")
          .removeClass("active")
          .eq($(this).index())
          .addClass("active")
      })
    })
  })(jQuery)
  ;(function ($) {
    $(function () {
      $(".sitetabs__header ul").on("click", "li:not(.active)", function () {
        $(this)
          .addClass("active")
          .siblings()
          .removeClass("active")
          .closest("div.sitetabs")
          .find("div.sitetabs__content")
          .removeClass("active")
          .eq($(this).index())
          .addClass("active")
      })
    })
  })(jQuery)
 /*  menuInit()
  $(window).resize() */
})

function hideText() {
  $('.detailparam__text').each(function() {
    if ($(this) && $(this).height() > 20) {
      $(this).addClass('detailparam__text_large')
      $(this).on("click", function (e) {
        e.preventDefault()
        $(this).toggleClass("active")
      })
    }
  })
  
  
}

function mainSliderInit() {
  $(".mainslider__slider").slick({
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
     autoplay: true,
    autoplaySpeed: 3000,
  })
}
function gallerySliderInit() {
  $("[data-slider='fullgallery']").slick({
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1, dots: true,
        }
 
      },
    ],
  })
}
function videoSliderInit() {
  $("[data-slider='videoslider']").each(function () {
    $(this).slick({
      dots: false,
      arrows: true,
      fade: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: $(this)
        .closest("[data-slidercontainer]")
        .find(".sliderarrows__right"),
      prevArrow: $(this)
        .closest("[data-slidercontainer]")
        .find(".sliderarrows__left"),
      responsive: [
        {
          breakpoint: 1023,
          settings: "unslick",
        },
      ],
      /*  autoplay: true,
    autoplaySpeed: 3000, */
    })
  })
}
function blogSliderInit() {
  $("[data-slider='blogslider']").each(function () {
    $(this).slick({
      dots: false,
      arrows: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: $(this)
        .closest("[data-slidercontainer]")
        .find(".sliderarrows__right"),
      prevArrow: $(this)
        .closest("[data-slidercontainer]")
        .find(".sliderarrows__left"),
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            variableWidth: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            variableWidth: true,
          },
        },
      ],
      /*  autoplay: true,
    autoplaySpeed: 3000, */
    })
  })
} 

function videoPopup() {
  $("[data-ytlink]").click(function () {
    var $this = $(this)
    var $iframe = $(
      '<iframe frameborder="0" allow="autoplay; encrypted-media" class="iframe" id="Overlayvideo" allowfullscreen="true">'
    )
      .attr("src", $this.data("ytlink"))
      .css({ width: 400, height: 300 })
    var $title = ""
    $("#video-view").html($title).append($iframe)
    $('#modal_video').modal('show')
   /*  $("#video-popup").show() */
  })
  $("#video-close").click(function () {
    $("#video-view").html("")
   /*  $("#video-popup").hide() */
  })
}



function productSliderInit() {
  $("[data-slider='productslider']").each(function () {
    $(this).slick({
      dots: false,
      arrows: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      /*   autoplay: true,
      autoplaySpeed: 3000, */
     
      nextArrow: $(this)
        .closest("[data-slidercontainer]")
        .find(".sliderarrows__right"),
      prevArrow: $(this)
        .closest("[data-slidercontainer]")
        .find(".sliderarrows__left"),
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },

        {
          breakpoint: 1023,
          settings: {
            variableWidth: true,
            swipe: true,
            nextArrow: $(this)
              .closest(".container")
              .find(".blockheader .sliderarrows__right"),
            prevArrow: $(this)
              .closest(".container")
              .find(".blockheader .sliderarrows__left"),

          },
         
        },
      ],
    })
  })
  $(".catalogrelated .productslider__slider ").each(function () {
    $(this).slick({
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      /*   autoplay: true,
      autoplaySpeed: 3000, */
     swipe: true,
     variableWidth: true,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },

        {
          breakpoint: 1023,
          settings: {
            variableWidth: true,
            swipe: true,
            slidesToShow: 2,

          },
         
        },
      ],
    })
  })
  /*  $("[data-slider='productslider3']").each(function () {
    $(this).slick({
      dots: false,
      arrows: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
     
      swipe: false,
      nextArrow: $(this)
        .closest("[data-slidercontainer]")
        .find(".sliderarrows__right"),
      prevArrow: $(this)
        .closest("[data-slidercontainer]")
        .find(".sliderarrows__left"),
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },

        {
          breakpoint: 1023,
          settings: {
            variableWidth: true,
            nextArrow: $(this)
              .closest(".container")
              .find(".blockheader .sliderarrows__right"),
            prevArrow: $(this)
              .closest(".container")
              .find(".blockheader .sliderarrows__left"),
          },
        },
      ],
    })
  }) */
  $(".productslider__modalslider").each(function () {
    $(this).slick({
      dots: false,
      arrows: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,

      autoplay: true,
      autoplaySpeed: 3000,
      swipe: false,
      nextArrow: $(this).closest(".productslider").find(".sliderarrows__right"),
      prevArrow: $(this).closest(".productslider").find(".sliderarrows__left"),
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    })
  })
}

function recipeSliderInit() {
  $(".recipeslider__slider").each(function () {
    $(this).slick({
      dots: false,
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 1,

      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      swipe: false,
      nextArrow: $(this).closest(".recipeslider").find(".sliderarrows__right"),
      prevArrow: $(this).closest(".recipeslider").find(".sliderarrows__left"),
      responsive: [
        {
          breakpoint: 1530,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    })
  })
}
function moreNewsSliderInit() {
  $(".morenews__slider").each(function () {
    $(this).slick({
      dots: false,
      arrows: true,
      slidesToShow: 3,
      slidesToScroll: 1,

      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      swipe: false,
      nextArrow: $(this)
        .closest(".morenewsslider")
        .find(".sliderarrows__right"),
      prevArrow: $(this).closest(".morenewsslider").find(".sliderarrows__left"),
      responsive: [
        {
          breakpoint: 1530,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    })
  })
}

function imgSliderInit() {
  $(".imgslider__slider").each(function () {
    $(this).slick({
      dots: false,
      arrows: true,
      slidesToShow: 6,
      slidesToScroll: 1,

      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      nextArrow: $(this).closest(".imgslider").find(".beyond-button-next"),
      prevArrow: $(this).closest(".imgslider").find(".beyond-button-prev"),
      responsive: [
        {
          breakpoint: 1530,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 767,
          settings: {
            dots: true,
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    })
  })
}

function fixElement(topDesktop, topMobile, elementId, className) {
  if (document.getElementById(elementId)) {
    if (window.innerWidth >= 1023) {
      if (topDesktop === 0) {
        document.getElementById(elementId).classList.add(className)
      } else {
        if (topDesktop) {
          window.addEventListener("scroll", (event) => {
            scroll = window.scrollY
            if (scroll >= topDesktop) {
              document.getElementById(elementId).classList.add(className)
            } else {
              document.getElementById(elementId).classList.remove(className)
            }
          })
        }
      }
    } else {
      if (topMobile === 0) {
        document.getElementById(elementId).classList.add(className)
      } else {
        if (topMobile) {
          window.addEventListener("scroll", (event) => {
            scroll = window.scrollY
            if (scroll >= topMobile) {
              document.getElementById(elementId).classList.add(className)
            } else {
              document.getElementById(elementId).classList.remove(className)
            }
          })
        }
      }
    }
  }
}

function blockSliderInit() {
  const blockslider = new Swiper(".blockslider__container", {
    pagination: {
      el: ".blockslider-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".blockslider-button-next",
      prevEl: ".blockslider-button-prev",
    },
  })
}

function mobileAccordeon() {
  if ($(window).width() < 1024) {
    $(".infobadge__main").on("click", function () {
      $(this).toggleClass("active")
      $(this).closest(".infobadge").find(".infobadge__accordeon").slideToggle()
    })
  }
}

function cardImagesSlider() {
  hoverSlider.init({})
}

function menuInit() {
  $("#dmenu").dmenu({
    menu: {
      align: "left",
    },
    item: {
      bg: false,
      border: false,
      subindicator: true,

      fit: [
        {
          items: null,
          fitter: "icon-hide",
          order: "all",
        },
        {
          items: null,
          fitter: "icon-only",
          order: "all",
        },
        {
          items: ":not(.dm-item_align-right)",
          fitter: "submenu",
          order: "rtl",
        },
        {
          items: ":not(.dm-item_align-right)",
          fitter: "hide",
          order: "rtl",
        },
      ],
    },
    submenu: {
      arrow: false,
      border: false,
      shadow: true,
    },
    subitem: {
      bg: true,
      border: false,
    },
  })
}

// close select

/**/

function closeByClickOutside(element, button) {
  $(document).click(function (event) {
    if (!$(event.target).closest(`${element},${button}`).length) {
      $(button).removeClass("active")
      $(element).removeClass("active")
    }
  })

  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      // escape key maps to keycode `27`
      $(button).removeClass("active")
      $(element).removeClass("active")
    }
  })
}
function closeByOutsideSelect() {
  $(document).click(function (event) {
    if (
      !$(event.target).closest(`.dropdown-select__list,.dropdown-select__title`)
        .length
    ) {
      $(".dropdown-select__list").hide()
    }
  })

  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      // escape key maps to keycode `27`
      $(".dropdown-select__list").hide()
    }
  })
}

function productListImgLisder() {
  if ($(window).width() < 1024) {
    $(".productcard__images_mobile .productcard__img").each(function (e) {
      $(this).slick({
        dots: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
      })
    })
  }
}



function quantityForm() {
  MathUtils = {
    roundToPrecision: function (subject, precision) {
      return +(+subject).toFixed(precision)
    },
  }

  function incrementValue(e, step) {
    var fieldName = e.data("field")
    var parent = e.closest("[data-quantity]")
    var currentVal = +parseFloat(
      parent.find("input[name=" + fieldName + "]").val()
    ).toFixed(1)
    if (!isNaN(currentVal)) {
      parent
        .find("input[name=" + fieldName + "]")
        .val(MathUtils.roundToPrecision(currentVal + step, 1))
    } else {
      parent.find("input[name=" + fieldName + "]").val(step)
    }
    parent.find("input[name=" + fieldName + "]").trigger("change")
  }

  function decrementValue(e, step) {
    var fieldName = e.data("field")
    var parent = e.closest("[data-quantity]")
    var currentVal = +parseFloat(
      parent.find("input[name=" + fieldName + "]").val()
    ).toFixed(1)
    if (!isNaN(currentVal) && currentVal > step) {
      parent
        .find("input[name=" + fieldName + "]")
        .val(MathUtils.roundToPrecision(currentVal - step, 1))
    } else {
      parent.find("input[name=" + fieldName + "]").val(step)
    }
    parent.find("input[name=" + fieldName + "]").trigger("change")
  }

  $(document).on("click", "[data-quantitybtn='plus']", function (e) {
    let step = +parseFloat(
      $(this).closest("[data-quantity]").find('[type="number"]').attr("step")
      ).toFixed(1)
    let btn = $(this).closest("[data-quantity]").find('[data-quantitybtn="plus"]')
    incrementValue(btn, step)
  })

  $(document).on("click", "[data-quantitybtn='minus']", function (e) {
    let step = +parseFloat(
    $(this).closest("[data-quantity]").find('[type="number"]').attr("step")
    ).toFixed(1)
    let btn = $(this).closest("[data-quantity]").find('[data-quantitybtn="minus"]')
    decrementValue(btn, step)
  })


}

window.addEventListener("load", function () {
  initFE()
})
