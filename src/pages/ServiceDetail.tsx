import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, HeartPulse } from "lucide-react";
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

  useEffect(() => {
    if (!service) {
      document.title = "Vaidyam Healthcare | Ayurvedic Treatment Center";
      return;
    }

    document.title = service.metaTitle;

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    );
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        service.metaDescription
      );
    }

    const ogTitle = document.querySelector(
      'meta[property="og:title"]'
    );
    if (ogTitle) {
      ogTitle.setAttribute("content", service.metaTitle);
    }

    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescription) {
      ogDescription.setAttribute(
        "content",
        service.metaDescription
      );
    }

    let canonicalLink = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute(
      "href",
      `${window.location.origin}/services/${service.slug}`
    );

  }, [service]);


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


  const serviceImage = isMobile
    ? service.imageMobile
    : service.imageDesktop;


  // return (
  //   <div className="min-h-screen bg-background">

  //     <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/20 py-20">

  //       <div className="container mx-auto px-4">

  //         <Button asChild variant="outline" className="mb-8">
  //           <Link to="/services">
  //             <ArrowLeft className="mr-2 h-4 w-4" />
  //             Back to services
  //           </Link>
  //         </Button>


  //         <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">


  //           <div>

  //             <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
  //               Ayurvedic treatment
  //             </p>


  //             <h1 className="mt-3 font-heading text-4xl font-bold text-foreground md:text-5xl">
  //               {service.title}
  //             </h1>


  //             <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
  //               {service.subtitle}
  //             </p>


  //             <p className="mt-6 text-base leading-8 text-muted-foreground">
  //               {service.summary}
  //             </p>


  //             <div className="mt-8 flex flex-wrap gap-3">

  //               <Button asChild>
  //                 <Link to="/consultation">
  //                   Book consultation
  //                   <ArrowRight className="ml-2 h-4 w-4" />
  //                 </Link>
  //               </Button>


  //               <Button asChild variant="outline">
  //                 <Link to="/contact">
  //                   Contact us
  //                 </Link>
  //               </Button>

  //             </div>

  //           </div>



  //           <Card className="overflow-hidden border-primary/20 shadow-lg shadow-primary/10">


  //             {serviceImage && (
  //               <img
  //                 src={serviceImage}
  //                 alt={service.title}
  //                 className="h-72 w-full object-cover"
  //               />
  //             )}



  //             <CardContent className="p-6">

  //               <div className="flex items-center gap-3 text-primary">

  //                 <HeartPulse className="h-5 w-5" />

  //                 <span className="text-sm font-semibold uppercase tracking-[0.2em]">
  //                   Why patients choose us
  //                 </span>

  //               </div>


  //               <ul className="mt-6 space-y-3 text-sm text-muted-foreground">

  //                 {service.highlights.map((item) => (

  //                   <li
  //                     key={item}
  //                     className="flex items-start gap-2"
  //                   >

  //                     <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

  //                     <span>
  //                       {item}
  //                     </span>

  //                   </li>

  //                 ))}

  //               </ul>


  //             </CardContent>

  //           </Card>


  //         </div>

  //       </div>

  //     </section>




  //     <section className="py-20">

  //       <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-2">


  //         <Card className="border-border/60">

  //           <CardContent className="p-8">

  //             <h2 className="font-heading text-2xl font-semibold text-foreground">
  //               Key benefits
  //             </h2>


  //             <ul className="mt-6 space-y-3 text-muted-foreground">

  //               {service.benefits.map((item) => (

  //                 <li
  //                   key={item}
  //                   className="flex items-start gap-2"
  //                 >

  //                   <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

  //                   <span>
  //                     {item}
  //                   </span>

  //                 </li>

  //               ))}

  //             </ul>


  //           </CardContent>

  //         </Card>




  //         <Card className="border-border/60">

  //           <CardContent className="p-8">


  //             <h2 className="font-heading text-2xl font-semibold text-foreground">
  //               What the treatment journey looks like
  //             </h2>



  //             <ol className="mt-6 space-y-3 text-muted-foreground">


  //               {service.treatmentSteps.map((item, index) => (

  //                 <li
  //                   key={item}
  //                   className="flex gap-3"
  //                 >

  //                   <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
  //                     {index + 1}
  //                   </span>


  //                   <span>
  //                     {item}
  //                   </span>


  //                 </li>

  //               ))}


  //             </ol>


  //           </CardContent>

  //         </Card>


  //       </div>

  //     </section>


  //   </div>
  // );

return (
  <div className="min-h-screen bg-background">


    {/* Service Banner Image */}
    <section className="relative h-[320px] md:h-[500px] overflow-hidden">

      {serviceImage && (
        <img
          src={serviceImage}
          alt={service.title}
          className="h-full w-full object-cover"
        />
      )}


      <div className="absolute inset-0 flex items-center justify-center bg-black/40">

        <h1 className="px-4 text-center font-heading text-4xl font-bold text-white md:text-6xl">
          {service.title}
        </h1>

      </div>


    </section>




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
              {service.subtitle}
            </p>



            <p className="mt-6 text-base leading-8 text-muted-foreground">
              {service.summary}
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





          <Card className="border-primary/20 shadow-lg shadow-primary/10">


            <CardContent className="p-6">


              <div className="flex items-center gap-3 text-primary">


                <HeartPulse className="h-5 w-5" />


                <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                  Why patients choose us
                </span>


              </div>




              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">


                {service.highlights.map((item) => (


                  <li
                    key={item}
                    className="flex items-start gap-2"
                  >


                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />


                    <span>
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





    <section className="py-20">


      <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-2">



        <Card className="border-border/60">


          <CardContent className="p-8">


            <h2 className="font-heading text-2xl font-semibold text-foreground">
              Key benefits
            </h2>



            <ul className="mt-6 space-y-3 text-muted-foreground">


              {service.benefits.map((item) => (


                <li
                  key={item}
                  className="flex items-start gap-2"
                >


                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />


                  <span>
                    {item}
                  </span>


                </li>


              ))}


            </ul>


          </CardContent>


        </Card>





        <Card className="border-border/60">


          <CardContent className="p-8">


            <h2 className="font-heading text-2xl font-semibold text-foreground">
              What the treatment journey looks like
            </h2>




            <ol className="mt-6 space-y-3 text-muted-foreground">



              {service.treatmentSteps.map((item, index) => (


                <li
                  key={item}
                  className="flex gap-3"
                >


                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </span>



                  <span>
                    {item}
                  </span>



                </li>


              ))}



            </ol>



          </CardContent>


        </Card>



      </div>


    </section>



  </div>
);
};


export default ServiceDetail;