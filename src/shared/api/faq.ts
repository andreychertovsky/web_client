export interface FAQItem {
  question: string;
  answer: string;
  opened?: boolean;
}

export const getItems = async (): Promise<FAQItem[]> => {
  return [
    {
      question: "Is it free?",
      answer: "Yes, all our apps are completely free.",
      opened: true,
    },
    {
      question: "Do you offer an api?",
      answer: "Yes, please contact us.",
    },
    {
      question: "Why can't I see the images?",
      answer:
        "Unfortunately, we can't fix it. This happens if the site on which the images are stored is configured so that only site visitors have access to images.",
    },
    {
      question: "Why do I get a quota error?",
      answer:
        "You are getting a quota error because we have a query limit. If you need more quota, contact us.",
    },
    {
      question: "Why doesn't my result match up?",
      answer:
        "Please make sure that you have selected the appropriate search mode.",
    },
  ];
};
