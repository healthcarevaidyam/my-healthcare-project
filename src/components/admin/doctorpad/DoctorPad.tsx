// src/components/admin/doctorpad/DoctorPad.tsx

import { useRef, useState } from "react";

import { toJpeg, toPng } from "html-to-image";
import jsPDF from "jspdf";

import PrescriptionForm from "./PrescriptionForm";
import PrescriptionPreview from "./PrescriptionPreview";

import type { Prescription } from "./types";

import "./doctorpad.css";


const createEmptyPrescription =
  (): Prescription => ({
    patientName: "",
    age: "",
    sex: "",

    date: new Date()
      .toISOString()
      .split("T")[0],

    fee: "",

    consultationType:
      "Online Consultation",

    bp: "",
    temperature: "",
    pulse: "",
    oxygen: "",

    doctorNotes: "",
  });


export default function DoctorPad() {
  const previewRef = useRef<HTMLDivElement | null>(null);

  const [
    prescription,
    setPrescription,
  ] = useState<Prescription>(
    createEmptyPrescription()
  );

  // Capture helper: clone the preview into a fixed A4-sized offscreen node,
  // wait for images to load, then render to PNG/JPEG. This avoids responsive
  // cropping on mobile devices.
  const captureAsImage = async (sourceNode: HTMLElement, type: "png" | "jpeg") => {
    const A4_PX_WIDTH = Math.round((210 / 25.4) * 96); // ~794px at 96dpi
    const A4_PX_HEIGHT = Math.round((297 / 25.4) * 96); // ~1123px

    const clone = sourceNode.cloneNode(true) as HTMLElement;
    clone.style.width = `${A4_PX_WIDTH}px`;
    clone.style.height = `${A4_PX_HEIGHT}px`;
    clone.style.position = "fixed";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    clone.style.margin = "0";
    document.body.appendChild(clone);

    // Wait for images inside the clone to load
    const imgs = Array.from(clone.querySelectorAll("img")) as HTMLImageElement[];
    await Promise.all(
      imgs.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((res) => {
              img.onload = img.onerror = () => res(undefined);
            })
      )
    );

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const options = {
      width: A4_PX_WIDTH,
      height: A4_PX_HEIGHT,
      pixelRatio,
      cacheBust: true,
    } as const;

    const dataUrl =
      type === "png"
        ? await toPng(clone, options)
        : await toJpeg(clone, { quality: 0.95, ...options });

    document.body.removeChild(clone);
    return dataUrl;
  };

  const downloadImage = async (
    type: "png" | "jpeg"
  ) => {
    if (!previewRef.current) {
      return;
    }
    const node = previewRef.current;
    const dataUrl = await captureAsImage(node, type);

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `vaidyam-prescription.${type === "jpeg" ? "jpg" : "png"}`;
    link.click();
  };

  const downloadPDF = async () => {
    if (!previewRef.current) {
      return;
    }
    const node = previewRef.current;
    const dataUrl = await captureAsImage(node, "png");

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const imgProps = pdf.getImageProperties(dataUrl);

    // A4 dimensions in mm
    const pageWidth = 210;
    const pageHeight = 297;

    // Calculate image size keeping aspect ratio
    let imgWidth = pageWidth;
    let imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    // If image is taller than page, scale down to fit height
    if (imgHeight > pageHeight) {
      const scale = pageHeight / imgHeight;
      imgWidth = imgWidth * scale;
      imgHeight = pageHeight;
    }

    // Center image horizontally
    const x = (pageWidth - imgWidth) / 2;

    pdf.addImage(dataUrl, "PNG", x, 0, imgWidth, imgHeight);
    pdf.save("vaidyam-prescription.pdf");
  };

  const downloadWord = async () => {
    if (!previewRef.current) {
      return;
    }

    const dataUrl = await captureAsImage(previewRef.current, "png");

    const html = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="utf-8"><title>Vaidyam Prescription</title></head>
<body><img src="${dataUrl}" style="max-width:100%;height:auto;" /></body>
</html>`;

    const blob = new Blob([html], {
      type: "application/msword",
    });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "vaidyam-prescription.doc";
    link.click();
    setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
  };

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

      {/* ===================================
          LEFT SIDE
          ADMIN FORM
      =================================== */}

      <aside className="doctorpad-sidebar">

        <PrescriptionForm
          prescription={prescription}
          setPrescription={setPrescription}
          onReset={handleReset}
        />

      </aside>


      {/* ===================================
          RIGHT SIDE
          LIVE PREVIEW
      =================================== */}

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

          <div className="doctorpad-preview-actions">
            <button
              type="button"
              onClick={() => downloadImage("png")}
            >
              Download PNG
            </button>

            <button
              type="button"
              onClick={() => downloadImage("jpeg")}
            >
              Download JPG
            </button>

            <button
              type="button"
              onClick={downloadPDF}
            >
              Download PDF
            </button>

            <button
              type="button"
              onClick={downloadWord}
            >
              Download Word
            </button>
          </div>

        </div>


        <div ref={previewRef}>
          <PrescriptionPreview
            prescription={prescription}
          />
        </div>

      </main>

    </div>
  );
}