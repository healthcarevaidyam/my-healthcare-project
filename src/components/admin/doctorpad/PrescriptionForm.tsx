
import type {
  Dispatch,
  SetStateAction,
} from "react";

import type { Prescription } from "./types";

interface PrescriptionFormProps {
  prescription: Prescription;

  setPrescription: Dispatch<
    SetStateAction<Prescription>
  >;

  onReset: () => void;
}

export default function PrescriptionForm({
  prescription,
  setPrescription,
  onReset,
}: PrescriptionFormProps) {
  const updateField = (
    field: keyof Prescription,
    value: string
  ) => {
    setPrescription((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  return (
    <div className="doctorpad-form">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="doctorpad-form-header">
        <div>
          <h1>Doctor Pad</h1>

          <p>
            Create and preview a Vaidyam prescription
          </p>
        </div>
      </div>


      {/* =========================================
          PATIENT DETAILS
      ========================================= */}

      <section className="doctorpad-section">

        <div className="doctorpad-section-title">
          <span className="section-number">1</span>

          <div>
            <h2>Patient Details</h2>
            <p>Enter basic patient information</p>
          </div>
        </div>


        <div className="doctorpad-grid-2 doctorpad-field-grid">
          <div className="doctorpad-field">
            <label htmlFor="patientName">Patient Name</label>
            <input
              id="patientName"
              type="text"
              value={prescription.patientName}
              onChange={(event) =>
                updateField("patientName", event.target.value)
              }
              placeholder="Enter patient name"
            />
          </div>

          <div className="doctorpad-field">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="text"
              value={prescription.age}
              onChange={(event) =>
                updateField("age", event.target.value)
              }
              placeholder="58"
            />
          </div>

          <div className="doctorpad-field">
            <label htmlFor="sex">Sex</label>
            <select
              id="sex"
              value={prescription.sex}
              onChange={(event) =>
                updateField("sex", event.target.value)
              }
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="doctorpad-field">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={prescription.date}
              onChange={(event) =>
                updateField("date", event.target.value)
              }
            />
          </div>
        </div>

      </section>


      {/* =========================================
          CONSULTATION
      ========================================= */}

      <section className="doctorpad-section">

        <div className="doctorpad-section-title">

          <span className="section-number">
            2
          </span>

          <div>
            <h2>Consultation</h2>

            <p>
              Select the consultation type
            </p>
          </div>

        </div>


        <div className="doctorpad-grid-2">

          <div className="doctorpad-field">

            <label htmlFor="consultationType">
              Consultation Type
            </label>

            <select
              id="consultationType"
              value={
                prescription.consultationType
              }
              onChange={(event) =>
                updateField(
                  "consultationType",
                  event.target.value
                )
              }
            >

              <option value="Online Consultation">
                Online Consultation
              </option>

              <option value="Clinic Consultation">
                Clinic Consultation
              </option>

              <option value="Follow Up">
                Follow Up
              </option>

              <option value="Consultation">
                Consultation
              </option>

            </select>

          </div>


          <div className="doctorpad-field">

            <label htmlFor="fee">
              Fee
            </label>

            <input
              id="fee"
              type="text"
              value={prescription.fee}
              onChange={(event) =>
                updateField("fee", event.target.value)
              }
              placeholder="Doctor fee"
            />

          </div>

        </div>

      </section>


      {/* =========================================
          VITALS
      ========================================= */}

      <section className="doctorpad-section">

        <div className="doctorpad-section-title">

          <span className="section-number">
            3
          </span>

          <div>
            <h2>Vitals</h2>

            <p>
              Enter patient vital information
            </p>
          </div>

        </div>


        <div className="doctorpad-grid-2">

          {/* BP */}

          <div className="doctorpad-field">

            <label htmlFor="bp">
              B.P
            </label>

            <input
              id="bp"
              type="text"
              value={prescription.bp}
              onChange={(event) =>
                updateField(
                  "bp",
                  event.target.value
                )
              }
              placeholder="120/80"
            />

          </div>


          {/* Temperature */}

          <div className="doctorpad-field">

            <label htmlFor="temperature">
              Temperature
            </label>

            <input
              id="temperature"
              type="text"
              value={
                prescription.temperature
              }
              onChange={(event) =>
                updateField(
                  "temperature",
                  event.target.value
                )
              }
              placeholder="98.6°F"
            />

          </div>


          {/* Pulse */}

          <div className="doctorpad-field">

            <label htmlFor="pulse">
              Pulse
            </label>

            <input
              id="pulse"
              type="text"
              value={prescription.pulse}
              onChange={(event) =>
                updateField(
                  "pulse",
                  event.target.value
                )
              }
              placeholder="76"
            />

          </div>


          {/* O2 */}

          <div className="doctorpad-field">

            <label htmlFor="oxygen">
              O2
            </label>

            <input
              id="oxygen"
              type="text"
              value={prescription.oxygen}
              onChange={(event) =>
                updateField(
                  "oxygen",
                  event.target.value
                )
              }
              placeholder="98%"
            />

          </div>

        </div>

      </section>


      {/* =========================================
          DOCTOR NOTES
      ========================================= */}

      <section className="doctorpad-section">

        <div className="doctorpad-section-title">

          <span className="section-number">
            4
          </span>

          <div>
            <h2>
              Doctor Notes / Prescription
            </h2>

            <p>
              Write anything you want on the pad
            </p>
          </div>

        </div>


        <div className="doctorpad-field">

          <label htmlFor="doctorNotes">
            Notes / Medicines / Advice
          </label>

          <textarea
            id="doctorNotes"
            value={prescription.doctorNotes}
            onChange={(event) =>
              updateField(
                "doctorNotes",
                event.target.value
              )
            }
            placeholder={`Example:

Cap Debicool 2-0-2 BD
Tablet Basantkusumakar Ras 1-0-1
Dhatu Pushtik Churna 1/2 tsp BD

Take with lukewarm water

Follow up after 7 days`}
            rows={14}
          />

          <div className="textarea-help">
            Line breaks will be preserved on the
            prescription.
          </div>

        </div>

      </section>


      {/* =========================================
          ACTIONS
      ========================================= */}

      <div className="doctorpad-form-actions">

        <button
          type="button"
          className="doctorpad-reset-button"
          onClick={onReset}
        >
          Reset
        </button>

      </div>

    </div>
  );
}