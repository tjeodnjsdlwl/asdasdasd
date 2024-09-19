$(function () {
    // window.scroll
    let lastScroll = 0;
    $(window).scroll(function () {
        // header
        const curr = $(this).scrollTop();
        const identityOffsetTop = $(".sc-identity").offset().top;
        const groundOffsetBottom = $(".sc-ground").offset().top + $(".sc-identity").innerHeight();

        if (curr > lastScroll || curr < identityOffsetTop) {
            $(".btn-top").addClass("hide");
        } else if (curr < groundOffsetBottom) {
            $(".btn-top").removeClass("hide");
        }
        // 내려갈 때 감추기
        // 올라올 때 identity 이전이면 감추기

        // 올라올 때 보이기
        // 내려갈 때 ground 넘어가면 보이기

        lastScroll = curr;
    });

    // ----- eventHandler -----
    $(".btn-top").click(function () {
        gsap.to(window, {
            scrollTo: 0,
        });
    });

    $(".btn-select").click(function () {
        console.log("dd");
        $(".lang-list").toggleClass("on");
    });

    // ----- ScrollTrigger -----
    // sc-intro
    const introText = $(".sc-intro .text");
    const introTextTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".sc-intro",
            start: "0% 0%",
            end: "100% 100%",
            scrub: 0,
            onUpdate: function (self) {
                $(".sc-intro").css("--progress", self.progress);
            },
            toggleClass: {
                targets: ".sc-intro .scroll-btn",
                className: "active",
            },
        },
    });
    introTextTl
        .to(introText[0], {
            opacity: 1,
        })
        .to(introText[0], {
            opacity: 0,
            onStart: function () {
                $("#header").addClass("show");
            },
            onReverseComplete: function () {
                $("#header").removeClass("show");
            },
        })
        .to(introText[1], { opacity: 1 })
        .to(introText[1], { opacity: 0 })
        .to(introText[2], { opacity: 1 }, "<1")
        .to(introText[2], { opacity: 0 })
        .to(introText[3], { opacity: 1 });

    // sc-identity
    const identityBg = $(".sc-identity .bg-wrap");
    const identityIntroText = $(".sc-identity .intro .text");
    const identityTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".sc-identity",
            start: "0% 0%",
            end: "100% 100%",
            scrub: 0,
        },
    });
    identityTl
        .to(".sc-identity .intro", { opacity: 1 }, "bg3")
        .to(identityBg[2], { "--opacity": 0.6 }, "bg3")
        .to(identityIntroText[0], { xPercent: 100 }, "moveText")
        .to(identityIntroText[2], { xPercent: -100 }, "moveText")
        .to(identityBg[2], { "--opacity": 0 }, "moveText")
        .to(".sc-identity .intro", { opacity: 0 })
        .to(identityBg[2], { height: 0 })
        .to(identityBg[1], { height: 0 })
        .to(".sc-identity .desc", 1.5, { opacity: 1 }, "bg1")
        .to(identityBg[0], { "--opacity": 0.4 }, "bg1");

    // sc-user
    ScrollTrigger.create({
        trigger: ".sc-user",
        start: "0% 50px",
        onEnter: function () {
            $("body").removeClass("dark");
        },
        onLeaveBack: function () {
            $("body").addClass("dark");
        },
    });

    // group-move1
    const userMoveTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".sc-user .group-move",
            start: `0% 100%-=218px`,
            end: "100% 100%",
            scrub: 0,
        },
    });
    userMoveTl
        .to($(".sc-user .desc span")[0], { xPercent: -172 }, "same")
        .to($(".sc-user .desc span")[2], { xPercent: 134 }, "same")
        .to(".sc-user .group-move", { "--width": "21.8%" }, "same");

    //sc-posibility
    ScrollTrigger.create({
        trigger: "[data-theme='dark']",
        start: "0% 50%",
        end: "100% 50%",
        toggleClass: {
            targets: "body",
            className: "dark",
        },
    });

    gsap.to(".sc-posibility .inner .content-wrap", {
        xPercent: -100,
        x: function () {
            return $(window).width();
        },
        ease: "none",
        scrollTrigger: {
            trigger: ".sc-posibility",
            start: "0% 0%",
            end: "100% 100%",
            scrub: 0,
            invalidateOnRefresh: true,
        },
    });

    // sc-role
    const roleLine = gsap.timeline({
        scrollTrigger: {
            trigger: ".sc-role",
            start: "0% 0%",
            end: "100% 30%",
            scrub: 0,
        },
    });
    roleLine
        .from(".sc-role .content2 .line1", { xPercent: -50 }, "transX")
        .from(".sc-role .content2 .line2", { xPercent: -50 }, "transX")
        .from(".sc-role .content2 .line3", { xPercent: 50 }, "transX")
        .set(".sc-role .content2", { "--opacity": "1", delay: 1 })
        .from(".sc-role .content2 .title", { opacity: 0 });

    // sc-service
    const serviceSlideItem = $(".sc-service .card-item");
    ScrollTrigger.create({
        trigger: ".sc-role .content2",
        start: "0% 0%",
        end: "100% 100%",
        onEnter: function () {
            serviceSlideItem.eq(0).addClass("on");
            serviceSlideItem.eq(1).addClass("on");
        },
    });

    const service1Tl1 = gsap.timeline({
        ease: "none",
        scrollTrigger: {
            trigger: ".sc-service .sticky1-wrap .sticky-cont",
            start: "0% 0%",
            end: "100% 100%",
            scrub: 0,
            invalidateOnRefresh: true,
        },
    });

    service1Tl1
        .to(".sc-service .content1", {
            x: function () {
                return $(".sc-service .content1 .group-title").innerWidth() * -1;
            },
            onStart: function () {
                return serviceSlideItem.eq(2).addClass("on");
            },
        })
        .to(
            ".sc-service .content1 .card-item",
            {
                xPercent: (idx) => {
                    return -100 * idx;
                },
                x: (idx) => {
                    return -40 * idx;
                },
            },
            ">-=30%"
        )
        .addLabel("ci")
        .to(".sc-service .content1 .lock .off", 0.18, { autoAlpha: 0 }, "ci-=0.5")
        .to(".sc-service .content1 .lock .on", { autoAlpha: 1 }, "ci-=0.35")
        .to(".sc-service .content1 .lock .on", 0.1, {
            autoAlpha: 0,
        });

    ScrollTrigger.create({
        animation: gsap.to(".sc-service .content2 .card-text .text", 0.2, { opacity: 1 }, ">-0.5"),
        trigger: ".sc-service .content2",
        start: "0% 0%",
        end: "100% 100%",
        scrub: 0,
        onUpdate: function (self) {
            gsap.set(".sc-service .content2 .card-text .text", {
                opacity: self.progress * 2,
            });
        },
        onEnter: function () {
            $(".sc-service .content1 .group-slide .card-item").hide();
            gsap.set(".sc-service .content2 .card-text", { autoAlpha: 1 });
        },
        onLeaveBack: function () {
            $(".sc-service .content1 .group-slide .card-item").show();
            gsap.set(".sc-service .content2 .card-text", { autoAlpha: 0 });
        },
        onLeave: function () {
            gsap.set(".sc-service .content2 .card-text", { autoAlpha: 0 });
            gsap.set(".sc-service .content3 .card-text", { autoAlpha: 1 });
        },
        onEnterBack: function () {
            gsap.set(".sc-service .content3 .card-text", { autoAlpha: 0 });
            gsap.set(".sc-service .content2 .card-text", { autoAlpha: 1 });
        },
    });

    const service1Tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".sc-service .content3",
            start: "0% 0%",
            end: "100% 100%",
            scrub: 0,
            invalidateOnRefresh: true,
            onEnter: function () {
                $(".sc-service .content3 .card-item").addClass("on");
            },
        },
    });

    service1Tl2
        .to(".sc-service .content3 .card-item", {
            xPercent: function (idx) {
                return -100 * idx;
            },
            x: function (idx) {
                return -40 * idx;
            },
        })
        .to(".sc-service .content3 .group-text .text", { opacity: 1 })
        .set(".sc-service .content3 .group-text .colorful", { opacity: 1 }, "<50%");

    // group-move2
    const marketMoveTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".sc-market .group-move",
            start: `0% 70%`,
            end: "100% 80%",
            scrub: 0,
        },
    });
    marketMoveTl
        .to($(".sc-market .desc span")[0], { xPercent: -114 }, "same")
        .to($(".sc-market .desc span")[2], { xPercent: 120 }, "same")
        .to(".sc-market .group-move", { "--width": "21.8%" }, "same");

    // sc-future
    const futureCardItem = $(".sc-future .card-item");
    ScrollTrigger.create({
        trigger: ".sc-future",
        start: "0% 20%",
        end: "100% 100%",
        onEnter: function () {
            futureCardItem.eq(0).addClass("on");
            futureCardItem.eq(1).addClass("on");
        },
    });

    ScrollTrigger.create({
        animation: gsap.to(".sc-future .inner1", {
            xPercent: -100,
            x: function () {
                return $(window).innerWidth();
            },
        }),
        trigger: ".sc-future",
        start: "0% 0%",
        end: "100% 100%",
        scrub: 0,
        invalidateOnRefresh: true,
        onEnter: function () {
            futureCardItem.eq(2).addClass("on");
        },
        onToggle: function (self) {
            gsap.to(".sc-future .down", {
                opacity: self.isActive ? 1 : 0,
            });
        },
        onUpdate: function (self) {
            const idx = self.progress >= 0.7 ? 1 : 0;
            $(".sc-future .text span").removeClass("active").eq(idx).addClass("active");
        },
    });

    // sc-creator
    const creatorTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".sc-creator .sticky1-wrap",
            start: "0% 0%",
            end: "100% 100%",
            scrub: 0,
        },
    });
    creatorTl
        .to(".sc-creator .content1 .group-creator", { opacity: 1 })
        .to(".sc-creator .content1 .scroll", { opacity: 1 })
        .to(".sc-creator .content1 .group-creator", 0.3, { opacity: 0 }, "hidden")
        .to(".sc-creator .content1 .scroll", 0.3, { opacity: 0 }, "hidden");

    ScrollTrigger.create({
        trigger: ".sc-creator .content2",
        start: "0% 20%",
        end: "100% 100%",
        onEnter: function () {
            $(".sc-creator .content2 .card-item").eq(0).addClass("on");
        },
    });

    ScrollTrigger.create({
        animation: gsap.to(".sc-creator .content2 .inner2", {
            xPercent: -100,
            x: function () {
                return $(window).innerWidth();
            },
        }),
        trigger: ".sc-creator .sticky2-wrap",
        start: "0% 0%",
        end: "100% 100%",
        scrub: 0,
        invalidateOnRefresh: true,
    });

    // marquee
    ScrollTrigger.create({
        trigger: "#footer",
        start: "100% 100%",
        end: "100% 100%",
        onEnter: function () {
            gsap.set(".marquee", { yPercent: -100 });
        },
        onLeaveBack: function () {
            gsap.to(".marquee", { yPercent: 0 });
        },
    });

    ScrollTrigger.create({
        trigger: ".sc-ground",
        start: "100% 100%",
        markers: true,
        invalidateOnRefresh: true,
        onEnter: function () {
            $(".btn-top").addClass("end");
            gsap.set(".btn-top", {
                top: function () {
                    return (
                        $("#container").innerHeight() - $(".marquee").innerHeight() - $(".btn-top").innerHeight() - 40
                    );
                },
            });
        },
        onLeaveBack: function () {
            $(".btn-top").removeClass("end");
            gsap.set(".btn-top", { top: "inherit" });
        },
    });
});
