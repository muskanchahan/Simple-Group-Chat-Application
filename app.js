 // app.js

const express = require('express');
const path = require('path');
const cors = require('cors');
const { Appointment } = require('./models/index');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());//cors are use the 
app.use(express.json());



app.get('/BookingAppointments', async (req, res) => {
    try {
      const appointments = await Appointment.findAll();
      console.log(appointments);
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  });
// POST request to add a new appointment
app.post('/BookingAppointments', async (req, res) => {
  try {
    const newAppointment = await Appointment.create(req.body);
    res.status(201).json(newAppointment); // Respond with the created appointment
    console.log(newAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});



app.delete('/BookingAppointments/:id', async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    await appointment.destroy();
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'An error occurred while deleting the appointment' });
  }
});


app.put('/BookingAppointments/:id', async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const { username, email, mobileNumber } = req.body;

        // Log the ID and the incoming update data
        console.log('Updating Appointment ID:', appointmentId);
        console.log('Update Data:', req.body);

        // Find the appointment by ID
        const appointment = await Appointment.findByPk(appointmentId);
        if (appointment) {
            appointment.username = username;
            appointment.email = email;
            appointment.mobileNumber = mobileNumber;

            await appointment.save();
            console.log('Appointment Updated:', appointment);
            res.status(200).json(appointment);
        } else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

 


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

