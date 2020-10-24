!(function (a) {
	"use strict"
	a(window).on("load", function () {
		a(".loader-inner").fadeOut(), a(".loader").delay(200).fadeOut("slow")
	})
	var s = a(".header"),
		e = s.offset()
	a(window).scroll(function () {
		a(this).scrollTop() > e.top + 50 && s.hasClass("default")
			? s.fadeOut("fast", function () {
					a(this)
						.removeClass("default")
						.addClass("switched-header")
						.fadeIn(200),
						a(".scroll-to-top").addClass("active")
			  })
			: a(this).scrollTop() <= e.top + 50 &&
			  s.hasClass("switched-header") &&
			  s.fadeOut("fast", function () {
					a(this)
						.removeClass("switched-header")
						.addClass("default")
						.fadeIn(100),
						a(".scroll-to-top").removeClass("active")
			  })
	}),
		a("a.scroll").smoothScroll({ speed: 800, offset: -180 }),
		a(".popup-image").magnificPopup({
			type: "image",
			fixedContentPos: !1,
			fixedBgPos: !1,
			mainClass: "mfp-no-margins mfp-with-zoom",
			image: { verticalFit: !0 },
			zoom: { enabled: !0, duration: 300 },
		}),
		a(".popup-youtube, .popup-vimeo").magnificPopup({
			disableOn: 700,
			type: "iframe",
			mainClass: "mfp-fade",
			removalDelay: 160,
			preloader: !1,
			fixedContentPos: !1,
		})
	var o = a(".video-cover .play-but")
	a(".video-cover").each(function () {
		a(this).find("iframe").length &&
			a(this)
				.find("iframe")
				.attr(
					"data-src",
					a(this).find("iframe").attr("src"),
					a(this).find("iframe").attr("src", "")
				)
	}),
		o.on("click", function () {
			var s = a(this).closest(".video-cover"),
				e = s.find("iframe")
			return (
				s.addClass("show-video"), e.attr("src", e.attr("data-src")), !1
			)
		}),
		new Instafeed({
			get: "user",
			userId: "13339175373",
			accessToken: "13339175373.95cbc68.b63a06b452874b6e8384eebc29a005ce",
			limit: 5,
			resolution: "standard_resolution",
			template:
				'<li><a class="hover-effect rounded-circle" target="_blank" href="{{link}}"><span class="hover-effect-container"><span class="hover-effect-icon hover-effect-icon-small"><span class="fa fa-heart hover-effect-icon-inner"></span></span></span></span><img class=" mw-100" src="{{image}}" /></a></li>',
		}).run(),
		a(".countdown")
			.countdown("2017/10/12")
			.on("update.countdown", function (s) {
				a(this).html(
					s.strftime(
						'<div class="col"><div class="card card-body countdown-shadow mb-4 mb-lg-0 p-3"><span class="counter text-primary mb-1 ">%D</span> <span class="label ">Day%!d</span></div></div> <div class="col"><div class="card card-body countdown-shadow mb-4 mb-lg-0 p-3"><span class="counter text-primary mb-1">%H</span> <span class="label">Hour%!H</span></div></div> <div class="col"><div class="card card-body countdown-shadow mb-4 mb-lg-0 p-3"><span class="counter text-primary mb-1">%M</span> <span class="label">Minute%!M</span></div></div> <div class="col"><div class="card card-body countdown-shadow p-3"><span class="counter text-primary mb-1">%S</span> <span class="label">Second%!S</span></div></div>'
					)
				)
			})
})(jQuery)
