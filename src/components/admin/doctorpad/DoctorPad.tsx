// src/components/admin/doctorpad/DoctorPad.tsx

import { useRef, useState } from "react";
import { toJpeg, toPng } from "html-to-image";
import jsPDF from "jspdf";

import PrescriptionForm from "./PrescriptionForm";
import PrescriptionPreview from "./PrescriptionPreview";

import type { Prescription } from "./types";

import "./doctorpad.css";

const createEmptyPrescription = (): Prescription => ({
  patientName: "",
  age: "",
  sex: "",
  date: new Date().toISOString().split("T")[0],
  fee: "",
  consultationType: "Online Consultation",
  bp: "",
  temperature: "",
  pulse: "",
  oxygen: "",
  doctorNotes: "",
});

export default function DoctorPad() {
  const previewRef = useRef<HTMLDivElement | null>(null);

  const [isDownloading, setIsDownloading] = useState(false);

  const [prescription, setPrescription] =
    useState<Prescription>(
      createEmptyPrescription()
    );

  /**
   * Capture the actual prescription paper.
   *
   * IMPORTANT:
   * We do NOT clone the element.
   * We capture the actual .prescription-paper element.
   */
  const captureAsImage = async (
    sourceNode: HTMLElement,
    type: "png" | "jpeg"
  ): Promise<string> => {
    const paperElement =
      sourceNode.querySelector(
        ".prescription-paper"
      ) as HTMLElement | null;

    if (!paperElement) {
      throw new Error(
        "Prescription paper element (.prescription-paper) was not found."
      );
    }

    console.log(
      "Prescription paper found:",
      paperElement
    );

    /*
     * A4 at 96 DPI
     *
     * 210mm = approximately 794px
     * 297mm = approximately 1123px
     */
    const A4_WIDTH = 794;
    const A4_HEIGHT = 1123;

    /*
     * Make sure the prescription image is loaded.
     */
    const images = Array.from(
      paperElement.querySelectorAll("img")
    ) as HTMLImageElement[];

    await Promise.all(
      images.map(async (img) => {
        if (
          img.complete &&
          img.naturalWidth > 0
        ) {
          return;
        }

        await new Promise<void>((resolve) => {
          const handleLoad = () => {
            cleanup();
            resolve();
          };

          const handleError = () => {
            cleanup();
            resolve();
          };

          const cleanup = () => {
            img.removeEventListener(
              "load",
              handleLoad
            );

            img.removeEventListener(
              "error",
              handleError
            );
          };

          img.addEventListener(
            "load",
            handleLoad
          );

          img.addEventListener(
            "error",
            handleError
          );
        }
        );
      })
    );

    /*
     * Make sure fonts are ready.
     */
    if (document.fonts) {
      await document.fonts.ready;
    }

    /*
     * Wait for browser rendering.
     */
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resolve();
        });
      });
    });

    /*
     * IMPORTANT:
     * The actual paper should NOT have transform scaling
     * when exporting.
     */
    const originalTransform =
      paperElement.style.transform;

    paperElement.style.transform = "none";

    try {
      const options = {
        width: A4_WIDTH,
        height: A4_HEIGHT,

        pixelRatio: 2,

        cacheBust: true,

        backgroundColor: "#ffffff",

        style: {
          width: `${A4_WIDTH}px`,
          height: `${A4_HEIGHT}px`,
          transform: "none",
          transformOrigin: "top left",
        },
      };

      console.log(
        `Creating ${type.toUpperCase()}...`
      );

      if (type === "png") {
        const dataUrl = await toPng(
          paperElement,
          options
        );

        if (!dataUrl) {
          throw new Error(
            "PNG generation returned an empty result."
          );
        }

        console.log(
          "PNG generated successfully."
        );

        return dataUrl;
      }

      const dataUrl = await toJpeg(
        paperElement,
        {
          ...options,
          quality: 0.95,
        }
      );

      if (!dataUrl) {
        throw new Error(
          "JPG generation returned an empty result."
        );
      }

      console.log(
        "JPG generated successfully."
      );

      return dataUrl;
    } catch (error) {
      console.error(
        "html-to-image capture failed:",
        error
      );

      throw error;
    } finally {
      /*
       * Restore original transform after export.
       */
      paperElement.style.transform =
        originalTransform;
    }
  };

  /**
   * Trigger browser download.
   */
  const triggerDownload = (
    href: string,
    filename: string
  ) => {
    const link =
      document.createElement("a");

    link.href = href;
    link.download = filename;

    link.style.display = "none";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  /**
   * Download PNG / JPG.
   */
  const downloadImage = async (
    type: "png" | "jpeg"
  ) => {
    if (
      !previewRef.current ||
      isDownloading
    ) {
      return;
    }

    setIsDownloading(true);

    try {
      console.log(
        `Starting ${type.toUpperCase()} download...`
      );

      const dataUrl =
        await captureAsImage(
          previewRef.current,
          type
        );

      if (!dataUrl) {
        throw new Error(
          "Image generation failed."
        );
      }

      const extension =
        type === "jpeg"
          ? "jpg"
          : "png";

      triggerDownload(
        dataUrl,
        `vaidyam-prescription.${extension}`
      );

      console.log(
        `${type.toUpperCase()} download completed.`
      );
    } catch (error) {
      console.error(
        "Image download failed:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Failed to download image.";

      alert(
        `Download failed.\n\n${message}`
      );
    } finally {
      setIsDownloading(false);
    }
  };

  /**
   * Download PDF.
   */
  const downloadPDF = async () => {
    if (
      !previewRef.current ||
      isDownloading
    ) {
      return;
    }

    setIsDownloading(true);

    try {
      console.log(
        "Starting PDF download..."
      );

      const dataUrl =
        await captureAsImage(
          previewRef.current,
          "png"
        );

      if (!dataUrl) {
        throw new Error(
          "Unable to create prescription image."
        );
      }

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      /*
       * Full A4 page:
       *
       * 210mm x 297mm
       */
      pdf.addImage(
        dataUrl,
        "PNG",
        0,
        0,
        210,
        297
      );

      /*
       * Use jsPDF's native save method.
       */
      pdf.save(
        "vaidyam-prescription.pdf"
      );

      console.log(
        "PDF downloaded successfully."
      );
    } catch (error) {
      console.error(
        "PDF download failed:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Failed to download PDF.";

      alert(
        `PDF download failed.\n\n${message}`
      );
    } finally {
      setIsDownloading(false);
    }
  };

  /**
   * Download Word document.
   *
   * This creates an HTML-based .doc file
   * that Microsoft Word can open.
   */
  const downloadWord = async () => {
    if (
      !previewRef.current ||
      isDownloading
    ) {
      return;
    }

    setIsDownloading(true);

    try {
      console.log(
        "Starting Word download..."
      );

      const dataUrl =
        await captureAsImage(
          previewRef.current,
          "png"
        );

      if (!dataUrl) {
        throw new Error(
          "Unable to create prescription image."
        );
      }

      const html = `<!DOCTYPE html>
<html
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:w="urn:schemas-microsoft-com:office:word"
  xmlns="http://www.w3.org/TR/REC-html40"
>
<head>
  <meta charset="utf-8" />

  <meta
    name="ProgId"
    content="Word.Document"
  />

  <title>
    Vaidyam Prescription
  </title>

  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>
        Print
      </w:View>

      <w:Zoom>
        100
      </w:Zoom>
    </w:WordDocument>
  </xml>
  <![endif]-->

  <style>
    @page {
      size: A4;
      margin: 0;
    }

    html,
    body {
      margin: 0;
      padding: 0;
      width: 210mm;
      height: 297mm;
      background: #ffffff;
    }

    img {
      display: block;
      width: 210mm;
      height: 297mm;
      margin: 0;
      padding: 0;
    }
  </style>
</head>

<body>
  <img
    src="${dataUrl}"
    alt="Vaidyam Prescription"
  />
</body>
</html>`;

      const blob = new Blob(
        [html],
        {
          type:
            "application/msword;charset=utf-8",
        }
      );

      const fileUrl =
        URL.createObjectURL(blob);

      triggerDownload(
        fileUrl,
        "vaidyam-prescription.doc"
      );

      setTimeout(() => {
        URL.revokeObjectURL(
          fileUrl
        );
      }, 10000);

      console.log(
        "Word document downloaded successfully."
      );
    } catch (error) {
      console.error(
        "Word download failed:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Failed to download Word document.";

      alert(
        `Word download failed.\n\n${message}`
      );
    } finally {
      setIsDownloading(false);
    }
  };

  /**
   * Reset prescription.
   */
  const handleReset = () => {
    const shouldReset =
      window.confirm(
        "Are you sure you want to clear the prescription?"
      );

    if (!shouldReset) {
      return;
    }

    setPrescription(
      createEmptyPrescription()
    );
  };

  return (
    <div className="doctorpad-container">
      {/* ================================
          SIDEBAR
      ================================= */}

      <aside className="doctorpad-sidebar">
        <div className="doctorpad-form">
          <PrescriptionForm
            prescription={prescription}
            setPrescription={
              setPrescription
            }
            onReset={handleReset}
          />
        </div>
      </aside>

      {/* ================================
          PREVIEW
      ================================= */}

      <main className="doctorpad-preview-area">
        <div className="doctorpad-preview-header">
          <div>
            <h2>
              Prescription Preview
            </h2>

            <p>
              Live preview of the Vaidyam
              prescription pad
            </p>
          </div>

          {/* ================================
              DOWNLOAD BUTTONS
          ================================= */}

          <div className="doctorpad-preview-actions">
            <button
              type="button"
              onClick={() =>
                downloadImage("png")
              }
              disabled={isDownloading}
            >
              {isDownloading
                ? "Processing..."
                : "Download PNG"}
            </button>

            <button
              type="button"
              onClick={() =>
                downloadImage("jpeg")
              }
              disabled={isDownloading}
            >
              {isDownloading
                ? "Processing..."
                : "Download JPG"}
            </button>

            <button
              type="button"
              onClick={downloadPDF}
              disabled={isDownloading}
            >
              {isDownloading
                ? "Processing..."
                : "Download PDF"}
            </button>

            <button
              type="button"
              onClick={downloadWord}
              disabled={isDownloading}
            >
              {isDownloading
                ? "Processing..."
                : "Download Word"}
            </button>
          </div>
        </div>

        {/* ================================
            PRESCRIPTION PREVIEW
        ================================= */}

        <div
          ref={previewRef}
          className="preview-wrapper"
        >
          <PrescriptionPreview
            prescription={prescription}
          />
        </div>
      </main>
    </div>
  );
}