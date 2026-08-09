
import type { Prescription } from "./types";
import prescriptionPad from "../../../assets/doctorpad/vaidyam-prescription-pad.png";

interface PrescriptionPreviewProps {
  prescription: Prescription;
}

export default function PrescriptionPreview({
  prescription,
}: PrescriptionPreviewProps) {

  const formattedDate = prescription.date
    ? new Date(
        `${prescription.date}T00:00:00`
      ).toLocaleDateString("en-GB")
    : "";

  return (
    <div className="prescription-preview-wrapper">

      {/* =====================================
          A4 PRESCRIPTION
      ===================================== */}

      <div
        id="doctor-prescription"
        className="prescription-paper"
      >

        {/* ===================================
            ORIGINAL STATIONERY IMAGE
        =================================== */}

        <img
          src={prescriptionPad}
          alt="Vaidyam Clinic Prescription"
          className="prescription-background"
        />


        {/* ===================================
            DATE
        =================================== */}

        {prescription.fee && (
          <div className="prescription-field prescription-fee">
            <strong>Fee:</strong> {prescription.fee}
          </div>
        )}

        {formattedDate && (
          <div className="prescription-field prescription-date">
            <strong>Date:</strong> {formattedDate}
          </div>
        )}


        {/* ===================================
            PATIENT DETAILS ROW
        =================================== */}

        {(prescription.patientName || prescription.age || prescription.sex) && (
          <div className="prescription-field prescription-patient-row">
            {prescription.patientName && (
              <div className="prescription-row-item prescription-patient-name">
                <strong>Name:</strong> {prescription.patientName}
              </div>
            )}

            {prescription.age && (
              <div className="prescription-row-item prescription-age">
                <strong>Age:</strong> {prescription.age}
              </div>
            )}

            {prescription.sex && (
              <div className="prescription-row-item prescription-sex">
                <strong>Sex:</strong> {prescription.sex}
              </div>
            )}
          </div>
        )}


        {/* ===================================
            CONSULTATION
        =================================== */}

        {prescription.consultationType && (
          <div className="prescription-field prescription-consultation">

            <span>
              Through
            </span>

            <strong>
              {prescription.consultationType}
            </strong>

          </div>
        )}


        {/* ===================================
            BP
        =================================== */}

        {prescription.bp && (
          <div className="prescription-field prescription-bp">
            <strong>B.P:</strong> {prescription.bp}
          </div>
        )}


        {/* ===================================
            TEMPERATURE
        =================================== */}

        {prescription.temperature && (
          <div className="prescription-field prescription-temperature">
            <strong>Temp:</strong> {prescription.temperature}
          </div>
        )}


        {/* ===================================
            PULSE
        =================================== */}

        {prescription.pulse && (
          <div className="prescription-field prescription-pulse">
            <strong>Pulse:</strong> {prescription.pulse}
          </div>
        )}


        {/* ===================================
            O2
        =================================== */}

        {prescription.oxygen && (
          <div className="prescription-field prescription-oxygen">
            <strong>O2:</strong> {prescription.oxygen}
          </div>
        )}


        {/* ===================================
            DOCTOR NOTES
        =================================== */}

        {prescription.doctorNotes && (
          <div className="prescription-field prescription-doctor-notes">
            {prescription.doctorNotes}
          </div>
        )}

      </div>

    </div>
  );
}