import { scrollToEvent } from "@/entities/scroll";

import { SECTIONS } from "@/shared/config";

const handleURLHash = (hash: string) => () => {
  const url = new URL(window.location.href);

  if (url.pathname === "/" && url.hash === `#${hash}`) {
    scrollToEvent.broadcast({ scrollTo: hash });
  }
};

document.addEventListener("DOMContentLoaded", handleURLHash(SECTIONS.FAQ));
