import { bus } from "./bus";
import type { Callback } from "./bus";

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
