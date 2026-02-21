import { Leaf, Recycle, Trash2, AlertTriangle, Factory, Hospital, Cpu, Home } from "lucide-react";

interface CategoryInfo {
  title: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  definition: string;
  examples: string[];
}

const natureSection: CategoryInfo[] = [
  {
    title: "Biodegradable",
    icon: Leaf,
    color: "text-biodegradable",
    bg: "bg-biodegradable-bg",
    border: "border-biodegradable/20",
    definition: "Waste that decomposes naturally by microorganisms over time, returning to the earth without harming the environment.",
    examples: ["Food scraps & vegetable peels", "Paper, cardboard & wood", "Garden waste like leaves & grass"],
  },
  {
    title: "Non-Biodegradable",
    icon: Trash2,
    color: "text-non-biodegradable",
    bg: "bg-non-biodegradable-bg",
    border: "border-non-biodegradable/20",
    definition: "Waste that cannot be broken down by natural biological processes and persists in the environment for hundreds of years.",
    examples: ["Plastic bags & styrofoam", "Glass & ceramics", "Synthetic fabrics like nylon & polyester"],
  },
];

const recycleSection: CategoryInfo[] = [
  {
    title: "Recyclable",
    icon: Recycle,
    color: "text-recyclable",
    bg: "bg-recyclable-bg",
    border: "border-recyclable/20",
    definition: "Waste materials that can be collected, processed, and converted into new products, reducing the need for raw materials.",
    examples: ["Aluminum cans & metal scrap", "Paper, newspapers & magazines", "Glass bottles & jars"],
  },
  {
    title: "Non-Recyclable",
    icon: Trash2,
    color: "text-muted-foreground",
    bg: "bg-muted/50",
    border: "border-border",
    definition: "Waste that cannot be economically or practically recycled due to contamination, mixed materials, or lack of recycling infrastructure.",
    examples: ["Food-soiled paper & tissues", "Broken mirrors & ceramics", "Chip packets & multi-layer packaging"],
  },
];

const hazardSection: CategoryInfo[] = [
  {
    title: "Hazardous",
    icon: AlertTriangle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    definition: "Waste that poses a substantial threat to human health or the environment due to its toxic, flammable, corrosive, or reactive nature.",
    examples: ["Batteries & chemical solvents", "Pesticides & paint thinners", "Medical sharps & expired medicines"],
  },
  {
    title: "Non-Hazardous",
    icon: Leaf,
    color: "text-muted-foreground",
    bg: "bg-muted/50",
    border: "border-border",
    definition: "Waste that does not pose an immediate risk to health or the environment and can be disposed of through regular waste management systems.",
    examples: ["Household food waste", "Clothing & textiles", "Construction rubble & bricks"],
  },
];

const sourceSection: CategoryInfo[] = [
  {
    title: "Domestic Waste",
    icon: Home,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    definition: "Waste generated from households and daily living activities.",
    examples: ["Kitchen scraps & packaging", "Old clothes & broken furniture", "Garden trimmings"],
  },
  {
    title: "Industrial Waste",
    icon: Factory,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    definition: "Waste produced by manufacturing, mining, and industrial processes.",
    examples: ["Chemical by-products & sludge", "Scrap metal & slag", "Industrial packaging materials"],
  },
  {
    title: "Biomedical Waste",
    icon: Hospital,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    definition: "Waste generated from hospitals, clinics, and medical research that may be infectious or biologically dangerous.",
    examples: ["Used syringes & needles", "Blood-soaked bandages & gloves", "Expired pharmaceuticals"],
  },
  {
    title: "E-Waste",
    icon: Cpu,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    definition: "Discarded electronic devices and components that contain hazardous materials like lead and mercury.",
    examples: ["Old smartphones & laptops", "Broken TVs & monitors", "Batteries & circuit boards"],
  },
];

const CategoryCard = ({ info }: { info: CategoryInfo }) => {
  const Icon = info.icon;
  return (
    <div className={`rounded-xl border ${info.border} ${info.bg} p-5 transition-all hover:shadow-md`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${info.bg} border ${info.border}`}>
          <Icon className={`h-5 w-5 ${info.color}`} />
        </div>
        <h4 className={`font-heading font-bold text-lg ${info.color}`}>{info.title}</h4>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{info.definition}</p>
      <ul className="space-y-1.5">
        {info.examples.map((ex) => (
          <li key={ex} className="flex items-start gap-2 text-sm text-foreground/80">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${info.color.replace("text-", "bg-")}`} />
            {ex}
          </li>
        ))}
      </ul>
    </div>
  );
};

const SectionHeading = ({ number, title, subtitle }: { number: string; title: string; subtitle: string }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3 mb-1">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
        {number}
      </span>
      <h3 className="text-xl font-heading font-bold text-foreground">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground ml-10">{subtitle}</p>
  </div>
);

const WasteGuide = () => (
  <section className="mx-auto max-w-4xl px-6 py-12">
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
        Understanding Waste Classification
      </h2>
      <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
        Waste can be classified in multiple ways based on its nature, recyclability, hazard level, and source. Here's a complete guide.
      </p>
    </div>

    {/* Section 1 */}
    <div className="mb-12">
      <SectionHeading number="1" title="By Nature" subtitle="Based on whether the waste decomposes naturally." />
      <div className="grid gap-4 sm:grid-cols-2">{natureSection.map((c) => <CategoryCard key={c.title} info={c} />)}</div>
    </div>

    {/* Section 2 */}
    <div className="mb-12">
      <SectionHeading number="2" title="By Recyclability" subtitle="Based on whether the waste can be reprocessed into new products." />
      <div className="grid gap-4 sm:grid-cols-2">{recycleSection.map((c) => <CategoryCard key={c.title} info={c} />)}</div>
    </div>

    {/* Section 3 */}
    <div className="mb-12">
      <SectionHeading number="3" title="By Hazard Level" subtitle="Based on the potential threat to health and environment." />
      <div className="grid gap-4 sm:grid-cols-2">{hazardSection.map((c) => <CategoryCard key={c.title} info={c} />)}</div>
    </div>

    {/* Section 4 */}
    <div>
      <SectionHeading number="4" title="By Source" subtitle="Based on where the waste originates." />
      <div className="grid gap-4 sm:grid-cols-2">{sourceSection.map((c) => <CategoryCard key={c.title} info={c} />)}</div>
    </div>
  </section>
);

export default WasteGuide;
