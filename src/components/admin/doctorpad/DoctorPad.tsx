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

  const downloadImage = async (
    type: "png" | "jpeg"
  ) => {
    if (!previewRef.current) {
      return;
    }

    const dataUrl =
      type === "png"
        ? await toPng(previewRef.current, {
            cacheBust: true,
          })
        : await toJpeg(previewRef.current, {
            quality: 0.95,
            cacheBust: true,
          });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download =
      `vaidyam-prescription.${
        type === "jpeg" ? "jpg" : "png"
      }`;
    link.click();
  };

  const downloadPDF = async () => {
    if (!previewRef.current) {
      return;
    }

    const dataUrl = await toPng(previewRef.current, {
      cacheBust: true,
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = 210;
    const pdfHeight =
      (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(
      dataUrl,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );
    pdf.save("vaidyam-prescription.pdf");
  };

  const downloadWord = async () => {
    if (!previewRef.current) {
      return;
    }

    const dataUrl = await toPng(previewRef.current, {
      cacheBust: true,
    });

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