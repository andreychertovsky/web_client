import { type Callback, bus } from "@/shared/lib/event-bus";

export const openDialogEvent = {
  subscribe: (callback: Callback<{ name: string }>) =>
    bus.subscribe("dialog-opened", callback),
  broadcast: ({ name }: { name: string }) =>
    bus.broadcast("dialog-opened", { name }),
};

export const closeDialogEvent = {
  subscribe: (callback: Callback<{ name: string }>) =>
    bus.subscribe("dialog-closed", callback),
  broadcast: ({ name }: { name: string }) =>
    bus.broadcast("dialog-closed", { name }),
};

class Dialog extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const dialogElement = this.querySelector("dialog")!;
    const bodyElement = document.body;

    openDialogEvent.subscribe(({ name }) => {
      if (this.dataset.name === name) {
        dialogElement.showModal();
        bodyElement.style.overflow = "hidden";
      }
    });

    closeDialogEvent.subscribe(({ name }) => {
      if (this.dataset.name === name) {
        dialogElement.close();
        bodyElement.removeAttribute("style");
      }
    });
  }
}

customElements.define("wc-dialog", Dialog);

class DialogOpenTrigger extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const triggerElement = this.children[0]!;
    const name = this.dataset.name ?? "";
    const handleTriggerClick = (event: Event) => {
      event.preventDefault();
      openDialogEvent.broadcast({ name });
    };

    triggerElement.addEventListener("click", handleTriggerClick);
  }
}

customElements.define("wc-dialog-open-trigger", DialogOpenTrigger);

class DialogCloseTrigger extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const triggerElement = this.children[0]!;
    const name = this.dataset.name ?? "";
    const handleTriggerClick = (event: Event) => {
      event.preventDefault();
      closeDialogEvent.broadcast({ name });
    };

    triggerElement.addEventListener("click", handleTriggerClick);
  }
}

customElements.define("wc-dialog-close-trigger", DialogCloseTrigger);
