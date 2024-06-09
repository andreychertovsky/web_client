import { type Callback, bus } from "@/shared/lib/event-bus";

export const scrollToEvent = {
  subscribe: (callback: Callback<{ scrollTo: string }>) =>
    bus.subscribe("scroll-to", callback),
  broadcast: ({ scrollTo }: { scrollTo: string }) =>
    bus.broadcast("scroll-to", { scrollTo }),
};
