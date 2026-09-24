"use client";

import ContentRow from "@/components/data-display/ContentRow";

export default function ExamsSection({
  exams,
}: {
  exams: any;
}) {

  const engineeringExams =
    exams.filter(
      (exam: any) =>
        exam.category ===
        "Engineering Entrance"
    );

  const medicalExams =
    exams.filter(
      (exam: any) =>
        exam.category ===
        "Medical Entrance"
    );

  const governmentExams =
    exams.filter(
      (exam: any) =>
        exam.category ===
        "Government Exams"
    );

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
        category="Engineering Entrance"
        items={engineeringExams}
        type="exam"
      />

      <ContentRow
        category="Medical Entrance"
        items={medicalExams}
        type="exam"
      />

      <ContentRow
        category="Government Exams"
        items={governmentExams}
        type="exam"
      />

    </section>

  );

}