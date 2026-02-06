import JessicaClaire from "./JessicaClaire";
import JessicaClaire1 from "./JessicaClaire1";
import JessicaClaire2 from "./JessicaClaire2";
import JessicaClaire3 from "./JessicaClaire3";
import JessicaClaire4 from "./JessicaClaire4";
import JessicaClaire5 from "./JessicaClaire5";
import JessicaClaire6 from "./JessicaClaire6";
import JessicaClaire7 from "./JessicaClaire7";
import JessicaClaire8 from "./JessicaClaire8";
import JessicaClaire9 from "./JessicaClaire9";
import JessicaClaire10 from "./JessicaClaire10";
import temp1 from "./CvLayouts/Temp1";

// Import Thumbnails

import thumb2 from "../../../assets/template_thumnail/JessicaClaire2.png";
import thumb3 from "../../../assets/template_thumnail/JessicaClaire3.png";
import thumb4 from "../../../assets/template_thumnail/JessicaClaire4.png";
import thumb5 from "../../../assets/template_thumnail/JessicaClaire5.png";
import thumb6 from "../../../assets/template_thumnail/JessicaClaire6.png";
import thumb7 from "../../../assets/template_thumnail/JessicaClaire7.png";
import thumb8 from "../../../assets/template_thumnail/JessicaClaire8.png";
import thumb9 from "../../../assets/template_thumnail/JessicaClaire9.png";
import thumb10 from "../../../assets/template_thumnail/JessicaClaire10.png";

export const CvTemplates = [
  {
    id: "cv-jessica-claire-2",
    name: "Jessica Claire CV (Refined)",
    component: temp1,
    thumbnail: thumb2,
    description: "Refined serif CV with centered academic headers.",
    category: "Professional",
  },

  {
    id: "cv-jessica-claire-4",
    name: "Jessica Claire CV (Green Accent)",
    component: JessicaClaire4,
    thumbnail: thumb4,
    description: "Creative academic CV with green borders and accents.",
    category: "Creative",
  },

  {
    id: "cv-jessica-claire-6",
    name: "Jessica Claire CV (Teal Three-Tone)",
    component: JessicaClaire6,
    thumbnail: thumb6,
    description: "Teal academic CV with unique header block.",
    category: "Creative",
  },
  {
    id: "cv-jessica-claire-7",
    name: "Jessica Claire CV (Saira Blue)",
    component: JessicaClaire7,
    thumbnail: thumb7,
    description: "Modern academic CV with split layout and Saira font.",
    category: "Modern",
  },
  {
    id: "cv-jessica-claire-8",
    name: "Jessica Claire CV (Fira Sans)",
    component: JessicaClaire8,
    thumbnail: thumb8,
    description: "Minimalist academic CV using Fira Sans.",
    category: "Professional",
  },
  {
    id: "cv-jessica-claire-9",
    name: "Jessica Claire CV (Saira Split)",
    component: JessicaClaire9,
    thumbnail: thumb9,
    description: "Stylish academic CV with dark right column.",
    category: "Modern",
  },
  {
    id: "cv-jessica-claire-10",
    name: "Jessica Claire CV (Cyan Header)",
    component: JessicaClaire10,
    thumbnail: thumb10,
    description: "Clean academic CV with cyan header and section borders.",
    category: "Modern",
  },
];

export const getCVTemplateComponent = (templateId) => {
  const template = CvTemplates.find((t) => t.id === templateId);
  return template ? template.component : null;
};
