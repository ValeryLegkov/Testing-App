import { Question } from "@/shared/types/testTypes";

export const mockDataQuestions: Question[] = [
  {
    id: 1,
    type: "short",
    questionText: "What is your name?",
  },
  {
    id: 2,
    type: "single",
    questionText: "What have-to know Frontend developer? Choose one:",
    options: [
      "HTML, CSS, JS",
      "PHP, Laravel, HTML",
      "Python, C++, C#",
      "C#, CSS, JS",
    ],
  },
  {
    id: 3,
    type: "multiple",
    questionText: "Select your favorite library/framework? Choose a few:",
    options: [
      "React",
      "Vue",
      "Angular",
      "Svelte",
      "Preact",
      "Solid",
      "Other..",
    ],
  },
  {
    id: 4,
    type: "multiple",
    questionText:
      "Select your favorite library/framework for Styling? Choose a few:",
    options: [
      "Tailwind",
      "Bootstrap",
      "MaterialUI",
      "shadcn",
      "AntDesign",
      "Radix",
      "Styled Components",
      "Mantine",
      "Chakra UI",
      "Framer Motion",
      "NONE",
    ],
  },
  {
    id: 5,
    type: "single",
    questionText: "Have you some experience with Full-Stack development?",
    options: ["YES", "NO"],
  },
  {
    id: 6,
    type: "multiple",
    questionText:
      "What framework you prefer for Full-Stack projects? Choose a few:",
    options: ["Next.js", "Nuxt.js", "Gatsby", "Remix", "Other.."],
  },
  {
    id: 7,
    type: "long",
    questionText: "Tell us about yourself:",
  },
];
