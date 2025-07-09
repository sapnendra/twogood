function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);
  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function logoAnimation() {
  gsap.to(".logo svg", {
    transform: "translateY(-131%)",
    duration: 0.5,
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top -15%",
      end: "top -5%",
      scrub: 1.2,
    },
  });
}

function cursorAnimation() {
  document.addEventListener("mousemove", (dets) => {
    gsap.to("#cursor", {
      left: dets.x,
      top: dets.y,
    });
  });

  let child = document.querySelectorAll(".child");

  child.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      gsap.to("#cursor", {
        transform: "translate(-50%, -50%) scale(1)",
      });
    });
    item.addEventListener("mouseleave", () => {
      gsap.to("#cursor", {
        transform: "translate(-50%, -50%) scale(0)",
      });
    });
  });

  console.log(child);
}

function navAnimation() {
  gsap.from(".navitem li", {
    y: -30,
    opacity: 0,
    duration: 0.2,
    delay: 0.5,
    stagger: 0.1,
  });
}

function vidconAnimation() {
  let vidcon = document.querySelector("#video-container");
  let playbtn = document.querySelector("#play");

  vidcon.addEventListener("mouseenter", () => {
    gsap.to(playbtn, {
      opacity: 1,
      scale: 1,
    });
  });
  vidcon.addEventListener("mouseleave", () => {
    gsap.to(playbtn, {
      opacity: 0,
      scale: 0,
    });
  });

  vidcon.addEventListener("mousemove", (dets) => {
    gsap.to(playbtn, {
      left: dets.x,
      top: dets.y,
      duration: 0.3,
      transform: "translate(-50%, -50%)",
      ease: "power3.out",
    });
  });
}

function loadingAnimation() {
  gsap.from("#page1 span", {
    y: 50,
    opacity: 0,
    duration: 0.4,
    delay: 0.4,
    stagger: 0.25,
  });
  gsap.from("#page1 #video-container", {
    scale: 0.9,
    opacity: 0,
    duration: 0.4,
    delay: 1.2,
  });
}
locomotiveAnimation();
vidconAnimation();
loadingAnimation();
navAnimation();
cursorAnimation();
logoAnimation();
