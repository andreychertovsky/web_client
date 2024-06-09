import { scrollToEvent } from "../../model";

class ScrollToSection extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const section = this.dataset.section;
    const block = (this.dataset.vertical ?? "start") as ScrollLogicalPosition;
    const inline = (this.dataset.horizontal ??
      "nearest") as ScrollLogicalPosition;

    scrollToEvent.subscribe(({ scrollTo }) => {
      if (scrollTo === section) {
        this.scrollIntoView({
          behavior: "smooth",
          block,
          inline,
        });
      }
    });
  }
}

customElements.define("wc-scroll-to-section", ScrollToSection);
