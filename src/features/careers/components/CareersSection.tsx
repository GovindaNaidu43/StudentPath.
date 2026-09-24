import ContentRow from "@/components/data-display/ContentRow";

export default function CareersSection({
  technologyCareers,
  engineeringCareers,
  designCareers,
  spaceCareers,
  businessCareers,
  biotechCareers,
}: any) {

  return (

    <section
      className="
      relative
      z-20

      px-4
      md:px-8

      pb-32
      md:pb-24

      space-y-5
      "
    >

      <ContentRow
        category="Technology & AI"
        items={technologyCareers}
        type="career"
      />

      <ContentRow
        category="Engineering & Robotics"
        items={engineeringCareers}
        type="career"
      />

      <ContentRow
        category="Design & Creative"
        items={designCareers}
        type="career"
      />

      <ContentRow
        category="Space & Research"
        items={spaceCareers}
        type="career"
      />

      <ContentRow
        category="Business & Management"
        items={businessCareers}
        type="career"
      />

      <ContentRow
        category="Health & Biotech"
        items={biotechCareers}
        type="career"
      />

    </section>

  );

}