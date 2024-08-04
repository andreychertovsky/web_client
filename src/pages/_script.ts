import "@justinribeiro/lite-youtube";
import TouchSweep from "touchsweep";

import homeStyles from "@/pages/_styles.module.css";
import findStyles from "@/pages/_ui/find/styles.module.css";
import heroStyles from "@/pages/_ui/hero/styles.module.css";
import marketsStyles from "@/pages/_ui/markets/styles.module.css";
import uploadStyles from "@/pages/_ui/upload/styles.module.css";

import { scrollToEvent } from "@/entities/scroll";

import { SECTIONS } from "@/shared/config";

const handleURLHash = (hash: string) => () => {
  const url = new URL(window.location.href);

  if (url.pathname === "/" && url.hash === `#${hash}`) {
    scrollToEvent.broadcast({ scrollTo: hash });
  }
};

document.addEventListener("DOMContentLoaded", handleURLHash(SECTIONS.FAQ));





















window.history.scrollRestoration = "manual";
const touchThreshold = 20;
const touchSweepInstance = new TouchSweep(window, {}, touchThreshold);

let isMobile = window.innerWidth <= 960;
window.addEventListener("resize", () => {
  let newIsMobile = window.innerWidth <= 960;
  if (newIsMobile !== isMobile) window.location.reload();
  isMobile = newIsMobile;
});

HTMLVideoElement.prototype.playBackwards = function () {
  this.pause();

  let video = this;
  let fps = 50;
  let intervalRewind = setInterval(function () {
    if (video.currentTime <= 0) {
      clearInterval(intervalRewind);
      video.pause();
    } else {
      video.currentTime -= 1 / fps;
    }
  }, 1000 / fps);
};

let currentSection: "hero" | "find" | "upload" | "markets" = "hero";

const homeDesktopAnimationElements = {
  hero: document.querySelector(".home__hero"),
  find: document.querySelector(".home__find"),
  upload: document.querySelector(".home__upload"),
  markets: document.querySelector(".home__markets"),
};

let lastScrollTime = 0;

const resetLastScrollTime = (delay: number = 0) => {
  lastScrollTime = Date.now() + delay;
};

const wait = async (delay) => {
  return new Promise((res) => setTimeout(res, delay));
};

function element(selector: string) {
  return document.body.querySelector(selector);
}

function elements(selector: string) {
  return Array.from(document.body.querySelectorAll(selector));
}

function addClassHide(...elements: (Element | null)[]) {
  elements.forEach((el) => el?.classList.add("hide"));
}

function removeClassHide(...elements: (Element | null)[]) {
  elements.forEach((el) => el?.classList.remove("hide"));
}

function addClassActive(...elements: (Element | null)[]) {
  elements.forEach((el) => el?.classList.add("active"));
}

function removeClassActive(...elements: (Element | null)[]) {
  elements.forEach((el) => el?.classList.remove("active"));
}

function enableScroll() {
  document.body.classList.add("enabledScroll");
  document.documentElement.classList.add("enabledScroll");
}

function disableScroll() {
  document.body.classList.remove("enabledScroll");
  document.documentElement.classList.remove("enabledScroll");
}

const cards = Array.from(document.querySelectorAll("." + heroStyles.card));
let cardsAnimateInterval: ReturnType<typeof setInterval>;
let isCardsAnimating = true;

async function toggleActive(card: Element, delay: number) {
  if (!isCardsAnimating) return removeClassActive(card);
  await wait(delay);

  if (!isCardsAnimating) return removeClassActive(card);
  addClassActive(card);

  await wait(2000);
  removeClassActive(card);
}

function animateCars() {
  cards.forEach((card, index) => {
    const delay = index * 1000;
    toggleActive(card, delay);
  });
}

function startCardsIntervalAnimation() {
  isCardsAnimating = true;
  animateCars();

  cardsAnimateInterval = setInterval(() => {
    if (!isCardsAnimating) return;
    animateCars();
  }, 5000);
}

function stopAnimatingCars() {
  isCardsAnimating = false;

  clearInterval(cardsAnimateInterval);
  removeClassActive(...cards);
}

startCardsIntervalAnimation();

const hero = {
  elements: {
    heading: element("." + heroStyles.heading),
    actions: element("." + heroStyles.actions),
    video: element("." + heroStyles.video),
    cards: elements("." + heroStyles.card),
  },

  async show(isUp = false) {
    removeClassHide(...Object.values(this.elements).flat());
    this.elements.video?.classList.remove("upload");
    this.elements.video?.classList.remove("icons");
    element("." + heroStyles.right)?.classList.remove("upload");

    await wait(1200);
    startCardsIntervalAnimation();
  },

  hide(isUp = false) {
    stopAnimatingCars();
    addClassHide(...Object.values(this.elements).flat());
    this.elements.video?.classList.remove("hide");
    this.elements.video?.classList.add("upload");
    this.elements.video?.classList.add("icons");
  },
};

const video = element("." + heroStyles.video + " video") as HTMLVideoElement;

const upload = {
  elements: {
    heading: element("." + uploadStyles.heading),
    supportingText: element("." + uploadStyles.supportingText),
    logo: element("." + heroStyles.logo),
    upload: element("." + uploadStyles.upload),
  },

  async show(isUp = false) {
    if (isUp) {
      removeClassHide(...Object.values(this.elements));
      element("." + heroStyles.video)?.classList.add("icons");
      video.playBackwards();
      await wait(800);
    }
    stopAnimatingCars();
    addClassActive(...Object.values(this.elements));
  },

  async hide(isUp = false) {
    if (isUp) {
      return removeClassActive(...Object.values(this.elements));
    }

    element("." + heroStyles.video)?.classList.remove("icons");
    addClassHide(...Object.values(this.elements));
    await wait(800);
    removeClassActive(...Object.values(this.elements));
  },
};

const find = {
  elements: {
    heading: element("." + findStyles.heading),
    supportingText: element("." + findStyles.supportingText),
  },

  async show(isUp = false) {
    if (isUp) {
      removeClassHide(...Object.values(this.elements));
      await wait(800);
    }

    addClassActive(...Object.values(this.elements));
    video.play();
    await wait(800);
  },

  hide(isUp = false) {
    if (isUp) {
      return removeClassActive(...Object.values(this.elements));
    }

    addClassHide(...Object.values(this.elements));
  },
};

const markets = {
  elements: {
    heading: element("." + marketsStyles.heading),
    linkSearch: element("." + marketsStyles.linkSearch),
    slider: element("." + marketsStyles.slider),
  },

  async show(isUp = false) {
    addClassActive(...Object.values(this.elements));

    element("." + heroStyles.video)?.classList.add("hide");
    await wait(800);
    element("." + heroStyles.video)?.classList.remove("upload");
  },

  async hide(isUp = false) {
    if (isUp) {
      removeClassActive(...Object.values(this.elements));

      await wait(800);

      element("." + heroStyles.video)?.classList.remove("hide");
      element("." + heroStyles.video)?.classList.add("upload");

      return;
    }

    addClassHide(...Object.values(this.elements));
  },
};

const heroEl = homeDesktopAnimationElements.hero as HTMLElement;
const uploadEl = homeDesktopAnimationElements.upload as HTMLElement;
const findEl = homeDesktopAnimationElements.find as HTMLElement;
const marketsEL = homeDesktopAnimationElements.markets as HTMLElement;

async function scroll(e) {
  if (isMobile) return;
  const isDown = e.deltaY > 0;
  if (Date.now() - lastScrollTime < 1100) return;

  if (isDown && currentSection === "hero") {
    resetLastScrollTime(800);

    hero.hide();
    await wait(800);
    upload.show();

    heroEl.style.pointerEvents = "none";
    uploadEl.style.pointerEvents = "auto";

    currentSection = "upload";
  } else if (isDown && currentSection === "upload") {
    resetLastScrollTime(3800);

    upload.hide();
    await wait(800);
    find.show();

    uploadEl.style.pointerEvents = "none";
    findEl.style.pointerEvents = "auto";

    currentSection = "find";
  } else if (isDown && currentSection === "find") {
    resetLastScrollTime(3500);

    find.hide();
    await wait(800);
    markets.show();

    findEl.style.pointerEvents = "none";
    marketsEL.style.pointerEvents = "auto";

    setTimeout(() => {
      if (currentSection !== "markets") return;

      addClassActive(element("." + marketsStyles.track));
      console.log("ENABLE SCOLL");
      enableScroll();
      video.currentTime = 0;
    }, 3500);

    currentSection = "markets";
  } else if (!isDown && currentSection === "find") {
    resetLastScrollTime(1300);

    find.hide(true);
    await wait(800);
    upload.show(true);

    video.playBackwards();
    uploadEl.style.pointerEvents = "auto";
    findEl.style.pointerEvents = "none";

    currentSection = "upload";
  } else if (!isDown && currentSection === "upload") {
    resetLastScrollTime(800);

    upload.hide(true);
    await wait(800);
    hero.show(true);

    video.currentTime = 0;
    heroEl.style.pointerEvents = "auto";
    uploadEl.style.pointerEvents = "none";

    currentSection = "hero";
  } else if (!isDown && currentSection === "markets" && window.scrollY === 0) {
    disableScroll();
    console.log("REMOVE SCROLL");
    resetLastScrollTime(2000);

    markets.hide(true);
    await wait(800);
    find.show(true);

    findEl.style.pointerEvents = "auto";
    marketsEL.style.pointerEvents = "none";
    removeClassActive(element("." + marketsStyles.track));

    currentSection = "find";
  }
}

window.addEventListener("wheel", scroll);
let currentMobileSection = "hero";
let lastScrollTimeMobile = 0;
























// mobile vertical slider
async function scrollMobile(e: any, swipeDirection: string = "") {
  if (Date.now() - lastScrollTimeMobile < 800) return;
  if (!isMobile) return;

  if (swipeDirection === "down" && currentMobileSection === "hero") {
    const scrollContainer = element(
      "." + homeStyles.scrollContainer,
    ) as Element;
    scrollContainer.style.transform = "translate3d(0,-100vh,0)";

    await wait(800);
    currentMobileSection = "upload";
  } else if (swipeDirection === "down" && currentMobileSection === "upload") {
    const scrollContainer = element(
      "." + homeStyles.scrollContainer,
    ) as Element;
    scrollContainer.style.transform = "translate3d(0,-200vh,0)";

    lastScrollTimeMobile = Date.now();

    await wait(800);
    currentMobileSection = "find";
  } else if (swipeDirection === "down" && currentMobileSection === "find") {
    const scrollContainer = element(
      "." + homeStyles.scrollContainer,
    ) as Element;
    scrollContainer.style.transform = "translate3d(0,-300vh,0)";

    lastScrollTimeMobile = Date.now();

    await wait(800);
    currentMobileSection = "markets";
    enableScroll();
  } else if (swipeDirection === "up" && currentMobileSection === "find") {
    const scrollContainer = element(
      "." + homeStyles.scrollContainer,
    ) as Element;
    scrollContainer.style.transform = "translate3d(0,-100vh,0)";

    lastScrollTimeMobile = Date.now();

    await wait(800);
    currentMobileSection = "upload";
  } else if (swipeDirection === "up" && currentMobileSection === "upload") {
    const scrollContainer = element(
      "." + homeStyles.scrollContainer,
    ) as Element;
    scrollContainer.style.transform = "translate3d(0,0,0)";

    lastScrollTimeMobile = Date.now();

    await wait(800);
    currentMobileSection = "hero";
  } else if (swipeDirection === "up" && currentMobileSection === "markets") {
    const pageY = window.scrollY;
    const y = marketsEL.getBoundingClientRect().top + pageY;

    if (y < pageY) return;

    const scrollContainer = element(
      "." + homeStyles.scrollContainer,
    ) as Element;
    scrollContainer.style.transform = "translate3d(0,-200vh,0)";

    disableScroll();
    lastScrollTimeMobile = Date.now();

    await wait(800);
    currentMobileSection = "find";
  }
}

window.addEventListener("swipeup", (e) => scrollMobile(e, "down"));
window.addEventListener("swipedown", (e) => scrollMobile(e, "up"));
