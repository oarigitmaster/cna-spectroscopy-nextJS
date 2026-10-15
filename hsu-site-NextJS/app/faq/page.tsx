import { PageHeader } from "@/components/sections/PageHeader";
import { CallToAction } from "@/components/sections/CallToAction";
import { Section } from "@/components/ui/Section";

const frequentlyAskedQuestions = [
  {
    question: "What is hyperspectral imaging?",
    answer:
      "Hyperspectral imaging records information across many narrow wavelength bands. The resulting spectral data can help identify and map minerals and other materials based on how they interact with light.",
  },
  {
    question: "What types of samples can be analyzed?",
    answer:
      "Depending on the project and equipment, the HSU may analyze drillcore, rock samples, mineral samples, powders, field materials, and other geological or industrial materials.",
  },
  {
    question: "Do samples need to be prepared?",
    answer:
      "Preparation requirements depend on the sample type and requested analysis. The HSU will review the project before scanning and explain any requirements for cleaning, cutting, positioning, or labeling samples.",
  },
  {
    question: "How is project pricing determined?",
    answer:
      "Pricing depends on factors such as the number and size of samples, equipment required, scanning configuration, data-processing requirements, project duration, and requested deliverables.",
  },
  {
    question: "What deliverables can be provided?",
    answer:
      "Deliverables may include hyperspectral imagery, processed datasets, mineral maps, exported tables, visualizations, and technical reports. Exact outputs are established during project planning.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Turnaround time depends on project size, equipment availability, sample preparation, processing complexity, and reporting requirements. An estimated schedule can be provided after the project is reviewed.",
  },
  {
    question: "Can the equipment be used outside the HSU facility?",
    answer:
      "Some mobile, handheld, and field-based services may be available. Contact the HSU to discuss the project location and equipment requirements.",
  },
  {
    question: "How do I request an analysis?",
    answer:
      "Contact the HSU with a description of your samples, project goals, preferred timeline, and required outputs. The team can then recommend an appropriate service.",
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        description="Find answers about hyperspectral imaging, sample requirements, project pricing, deliverables, and requesting an analysis."
      />

      <Section>
        <p className="eyebrow">Common questions</p>
        <h2>Working with the HSU</h2>

        <div className="faq-list">
          {frequentlyAskedQuestions.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <CallToAction
        title="Still have questions?"
        description="Contact our team for information specific to your samples, research, or project requirements."
        href="/contact"
        linkLabel="Contact us"
      />
    </>
  );
}
