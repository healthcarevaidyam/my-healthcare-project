import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  HeartPulse,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getServicePageBySlug } from "@/data/serviceLoader";
import { useIsMobile } from "@/hooks/use-mobile";

const ServiceDetail = () => {
  const { slug } = useParams();
  const isMobile = useIsMobile();

  const service = useMemo(
    () => (slug ? getServicePageBySlug(slug) : undefined),
    [slug]
  );

  if (!service) {
    return (
      <div className="min-h-screen bg-background px-4 py-24">
        <div className="container mx-auto max-w-3xl rounded-3xl border border-border/60 bg-card p-10 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Service not found
          </p>

          <h1 className="mt-4 font-heading text-3xl font-bold text-foreground">
            This service page is not available yet.
          </h1>

          <p className="mt-4 text-muted-foreground">
            Please return to the services page and select a listed treatment.
          </p>

          <Button asChild className="mt-8">
            <Link to="/services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to services
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  /*
   * Existing JSON fields continue to work.
   *
   * These additional fields are read only if they exist
   * in the JSON. No changes are required in serviceLoader.
   */
  const extendedService = service as typeof service & {
    problems?: {
      slug: string;
      title: string;
      description: string;
    }[];

    symptoms?: string[];

    possibleCauses?: string[];

    ayurvedicApproach?: {
      title: string;
      description: string;
      therapies?: string[];
    };

    whoCanBenefit?: string[];

    faqs?: {
      question: string;
      answer: string;
    }[];
  };

  const serviceImage = isMobile
    ? extendedService.imageMobile
    : extendedService.imageDesktop;

  return (
    <div className="min-h-screen bg-background">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative h-[320px] overflow-hidden md:h-[500px]">
        {serviceImage && (
          <img
            src={serviceImage}
            alt={extendedService.title}
            className="h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <h1 className="px-4 text-center font-heading text-4xl font-bold text-white md:text-6xl">
            {extendedService.title}
          </h1>
        </div>
      </section>

      {/* =========================================================
          INTRODUCTION
      ========================================================= */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/20 py-20">
        <div className="container mx-auto px-4">

          <Button asChild variant="outline" className="mb-8">
            <Link to="/services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to services
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                Ayurvedic treatment
              </p>

              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                {extendedService.subtitle}
              </p>

              <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
                {extendedService.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/consultation">
                    Book consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button asChild variant="outline">
                  <Link to="/contact">
                    Contact us
                  </Link>
                </Button>
              </div>
            </div>

            {/* WHY CHOOSE US */}
            {extendedService.highlights?.length > 0 && (
              <Card className="border-primary/20 shadow-lg shadow-primary/10">
                <CardContent className="p-6">

                  <div className="flex items-center gap-3 text-primary">
                    <HeartPulse className="h-5 w-5" />

                    <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                      Why patients choose us
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                    {extendedService.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </section>

      {/* =========================================================
          PROBLEMS / CONDITIONS
      ========================================================= */}
      {extendedService.problems &&
        extendedService.problems.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-4">

              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                  Conditions & Problems
                </p>

                <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
                  Problems We Address
                </h2>

                <p className="mt-4 text-muted-foreground">
                  Common conditions and concerns associated with this treatment.
                </p>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {extendedService.problems.map((problem) => (
                  <Card
                    key={problem.slug}
                    className="border-border/60 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                  >
                    <CardContent className="p-6">

                      <h3 className="font-heading text-xl font-semibold text-foreground">
                        {problem.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {problem.description}
                      </p>

                    </CardContent>
                  </Card>
                ))}
              </div>

            </div>
          </section>
        )}

      {/* =========================================================
          SYMPTOMS
      ========================================================= */}
      {extendedService.symptoms &&
        extendedService.symptoms.length > 0 && (
          <section className="bg-muted/30 py-20">
            <div className="container mx-auto px-4">

              <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                    Symptoms
                  </p>

                  <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">
                    Common Symptoms
                  </h2>

                  <p className="mt-4 leading-7 text-muted-foreground">
                    Common signs and symptoms that may be associated with
                    the condition.
                  </p>
                </div>

                <Card>
                  <CardContent className="p-8">
                    <ul className="grid gap-4 sm:grid-cols-2">
                      {extendedService.symptoms.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                          <span className="text-muted-foreground">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

              </div>

            </div>
          </section>
        )}

      {/* =========================================================
          POSSIBLE CAUSES
      ========================================================= */}
      {extendedService.possibleCauses &&
        extendedService.possibleCauses.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-4">

              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                  Understanding the Condition
                </p>

                <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">
                  Possible Causes
                </h2>
              </div>

              <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
                {extendedService.possibleCauses.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-5"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                    <span className="text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

      {/* =========================================================
          AYURVEDIC APPROACH
      ========================================================= */}
      {extendedService.ayurvedicApproach && (
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/20 py-20">
          <div className="container mx-auto px-4">

            <div className="mx-auto max-w-4xl text-center">

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                Our Approach
              </p>

              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
                {extendedService.ayurvedicApproach.title}
              </h2>

              <p className="mt-5 leading-8 text-muted-foreground">
                {extendedService.ayurvedicApproach.description}
              </p>

            </div>

            {extendedService.ayurvedicApproach.therapies &&
              extendedService.ayurvedicApproach.therapies.length > 0 && (
                <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  {extendedService.ayurvedicApproach.therapies.map(
                    (therapy) => (
                      <Card key={therapy}>
                        <CardContent className="p-5">

                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                            <span className="text-muted-foreground">
                              {therapy}
                            </span>
                          </div>

                        </CardContent>
                      </Card>
                    )
                  )}

                </div>
              )}

          </div>
        </section>
      )}

      {/* =========================================================
          BENEFITS + TREATMENT JOURNEY
      ========================================================= */}
      {(extendedService.benefits?.length > 0 ||
        extendedService.treatmentSteps?.length > 0) && (
        <section className="py-20">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-2">

            {/* BENEFITS */}
            {extendedService.benefits?.length > 0 && (
              <Card className="border-border/60">
                <CardContent className="p-8">

                  <h2 className="font-heading text-2xl font-semibold text-foreground">
                    Key Benefits
                  </h2>

                  <ul className="mt-6 space-y-4 text-muted-foreground">
                    {extendedService.benefits.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                </CardContent>
              </Card>
            )}

            {/* TREATMENT JOURNEY */}
            {extendedService.treatmentSteps?.length > 0 && (
              <Card className="border-border/60">
                <CardContent className="p-8">

                  <h2 className="font-heading text-2xl font-semibold text-foreground">
                    What the Treatment Journey Looks Like
                  </h2>

                  <ol className="mt-6 space-y-4 text-muted-foreground">
                    {extendedService.treatmentSteps.map(
                      (item, index) => (
                        <li
                          key={item}
                          className="flex gap-3"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                            {index + 1}
                          </span>

                          <span>{item}</span>
                        </li>
                      )
                    )}
                  </ol>

                </CardContent>
              </Card>
            )}

          </div>
        </section>
      )}

      {/* =========================================================
          WHO CAN BENEFIT
      ========================================================= */}
      {extendedService.whoCanBenefit &&
        extendedService.whoCanBenefit.length > 0 && (
          <section className="bg-muted/30 py-20">
            <div className="container mx-auto px-4">

              <div className="mx-auto max-w-3xl text-center">

                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                  Patient Guidance
                </p>

                <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">
                  Who Can Benefit
                </h2>

              </div>

              <div className="mx-auto mt-10 max-w-3xl">
                <Card>
                  <CardContent className="p-8">

                    <ul className="space-y-4">
                      {extendedService.whoCanBenefit.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                          <span className="text-muted-foreground">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                  </CardContent>
                </Card>
              </div>

            </div>
          </section>
        )}

      {/* =========================================================
          FAQ
      ========================================================= */}
      {extendedService.faqs &&
        extendedService.faqs.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto max-w-4xl px-4">

              <div className="text-center">

                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                  Frequently Asked Questions
                </p>

                <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
                  Frequently Asked Questions
                </h2>

              </div>

              <div className="mt-10 space-y-4">

                {extendedService.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-xl border border-border/60 bg-card p-6"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-semibold text-foreground">
                      {faq.question}

                      <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                    </summary>

                    <p className="mt-4 leading-7 text-muted-foreground">
                      {faq.answer}
                    </p>
                  </details>
                ))}

              </div>

            </div>
          </section>
        )}

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">

          <h2 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl">
            Start Your Personalized Ayurvedic Care
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Speak with our team to understand the most suitable approach
            for your individual needs.
          </p>

          <Button
            asChild
            variant="secondary"
            className="mt-8"
          >
            <Link to="/consultation">
              Book a Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

        </div>
      </section>

    </div>
  );
};

export default ServiceDetail;