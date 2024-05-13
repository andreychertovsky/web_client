class Dropdown extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const classActive = this.dataset.classActive ?? "";
    const classVisible = this.dataset.classVisible ?? "";

    const triggerElement = this.querySelector("[data-trigger]")!;

    const iconPlus = triggerElement.querySelector("[data-plus]")!;
    const iconMinus = triggerElement.querySelector("[data-minus]")!;

    const contentElement = this.querySelector("[data-content]")!;

    const handleToggle = () => {
      triggerElement.classList.toggle(classActive);
      contentElement.classList.toggle(classVisible);
      iconPlus.classList.toggle(classVisible);
      iconMinus.classList.toggle(classVisible);
    };

    triggerElement.addEventListener("click", handleToggle);
  }
}

customElements.define("wc-dropdown", Dropdown);

class Toggle extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const classToggle = this.dataset.classToggle ?? "";

    const triggerElement = this.querySelector("[data-trigger]")!;
    const subjectElement = this.querySelector("[data-subject]")!;

    triggerElement.addEventListener("click", () => {
      subjectElement.classList.toggle(classToggle);
    });
  }
}

customElements.define("wc-toggle", Toggle);
