import AcademicTemplate from "./Templates/AcademicTemplate";
import CreativeTemplate from "./Templates/CreativeTemplate";
import ExecutiveTemplate from "./Templates/ExecutiveTemplate";
import MinimalTemplate from "./Templates/MinimalTemplate";
import TwoColumnATS from "./Templates/ModernTable";
import ModernTemplate from "./Templates/ModernTemplate";
import ProfessionalTemplate from "./Templates/ProfessionalTemplate";
import Simple from "./Templates/Simple";
import AcademicSidebarTemplate from "./Templates/AcademicSidebarTemplate";

const CVTemplates = {
  professional: ProfessionalTemplate,
  modern: ModernTemplate,
  creative: CreativeTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
  academic: AcademicTemplate,
  twoColumn: TwoColumnATS,
  simple: Simple,
  academicSidebar: AcademicSidebarTemplate,
};

export default CVTemplates;
