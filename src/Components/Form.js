import React, { Fragment, useState } from "react";
import uuid from "uuid/v4";
import PropTypes from "prop-types";

const Form = ({ createAppointment }) => {
  // Create State of appointments
  const [appointment, updateAppointment] = useState({
    pet: "",
    owner: "",
    date: "",
    time: "",
    symptoms: "",
  });

  const [error, updateError] = useState(false);

  // Function that is executed every time the user writes in an input
  const updateState = (e) => {
    updateAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  };

  // Extract the values
  const { pet, owner, date, time, symptoms } = appointment;

  // When user clicks add appointment
  const submitCita = (e) => {
    e.preventDefault();

    // Validate
    if (
      pet.trim() === "" ||
      owner.trim() === "" ||
      date.trim() === "" ||
      time.trim() === "" ||
      symptoms.trim() === ""
    ) {
      updateError(true);
      return;
    }

    // Delete previous message
    updateError(false);

    // Assign an ID
    appointment.id = uuid();

    // Create the appointment
    createAppointment(appointment);

    // Restart the form
    updateAppointment({
      pet: "",
      owner: "",
      date: "",
      time: "",
      symptoms: "",
    });
  };

  return (
    <Fragment>
      <h2>create appointment</h2>

      {error ? (
        <p className="alert-error">All fields are required</p>
      ) : null}

      <form onSubmit={submitCita}>
        <label>Pet's Name</label>
        <input
          type="text"
          name="pet"
          className="u-full-width"
          placeholder="pet's name"
          onChange={updateState}
          value={pet}
        />

        <label>Owner's name</label>
        <input
          type="text"
          name="owner"
          className="u-full-width"
          placeholder="owner's name"
          onChange={updateState}
          value={owner}
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          className="u-full-width"
          onChange={updateState}
          value={time}
        />

        <label>Time</label>
        <input
          type="time"
          name="time"
          className="u-full-width"
          onChange={updateState}
          value={time}
        />

        <label>Symptoms</label>
        <textarea
          className="u-full-width"
          name="symptoms"
          onChange={updateState}
          value={symptoms}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Add appointment
        </button>
      </form>
    </Fragment>
  );
};

Form.propTypes = {
  crearCita: PropTypes.func.isRequired,
};

export default Form;
