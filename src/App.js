import React, { Fragment, useState, useEffect } from "react";
import Form from "./Components/Form";
import Appointment from "./Components/Appointments";

function App() {
  // Appointments in local storage
  let initialAppointments = JSON.parse(localStorage.getItem("appointments"));
  if (!initialAppointments) {
    initialAppointments = [];
  }

  // Appointment arrangement
  const [appointments, saveAppointmets] = useState(initialAppointments);

  // Use Effect to perform certain operations when the State changes
  useEffect(() => {
    if (initialAppointments) {
      localStorage.setItem("appointments", JSON.stringify(appointments));
    } else {
      localStorage.setItem("appointments", JSON.stringify([]));
    }
  }, [appointments, initialAppointments]);

  // Function that takes the current appointments and adds the new ones
  const createAppointment = (appointment) => {
    saveAppointmets([...appointments, appointment]);
  };

  // Function that removes an appointment by its id
  const deleteAppointments = (id) => {
    const newAppointments = appointments.filter((appointment) => appointment.id !== id);
    saveAppointmets(newAppointments);
  };

  // Conditional message
  const title =
  appointments.length === 0 ? "no appointments" : "Manage your appointments";

  return (
    <Fragment>
      <h1>PATIENT ADMINISTRATOR</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form createAppointment={createAppointment} />
          </div>
          <div className="one-half column">
            <h2>{title}</h2>
            {appointments.map((appointment) => (
              <Appointment
                key={appointment.id}
                appointment={appointment}
                deleteAppointment={deleteAppointments}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
