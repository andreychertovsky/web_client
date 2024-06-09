import { scrollToEvent } from "../../model";

class ScrollToTrigger extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const scrollTo = this.dataset.scrollTo ?? "";
    const handleClick = (event: Event) => {
      event.preventDefault();
      scrollToEvent.broadcast({
        scrollTo,
      });
    };

    this.children[0].addEventListener("click", handleClick);
  }
}

customElements.define("wc-scroll-to-trigger", ScrollToTrigger);
