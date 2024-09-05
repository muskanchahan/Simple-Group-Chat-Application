
 // script.js
const form = document.getElementById('form');
const ul = document.getElementById('ul');
let totalAppointments = 0;

document.addEventListener('DOMContentLoaded', function () {
    // Fetch existing appointments on page load
    axios.get('http://localhost:3000/BookingAppointments')
        .then((response) => {
            const appointmentsData = response.data;
            ul.innerHTML = ''; // Ensure a clean slate for new data
            appointmentsData.forEach((appointment) => {
                showAppointmentDetails(appointment);
            });
            totalAppointments = appointmentsData.length;
            updateTotalDisplay();
        })
        .catch((error) => {
            console.error('Error fetching appointment data:', error);
        });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const mobileNumber = document.getElementById('mobileNumber').value;

        const newAppointment = { username, email, mobileNumber };

        axios.post('http://localhost:3000/BookingAppointments', newAppointment)
            .then((result) => {
                showAppointmentDetails(result.data); // Display newly added appointment
                totalAppointments++;
                updateTotalDisplay();
            })
            .catch((error) => {
                console.error('Error adding appointment:', error);
            });

        // Reset the form after successful submission
        form.reset();
    });
});

function showAppointmentDetails(appointment) {
    const li = document.createElement('li');
    const liText = document.createElement('span'); // Changed to span for better text handling
    liText.textContent = `Username: ${appointment.username}, Email: ${appointment.email}, Mobile Number: ${appointment.mobileNumber}`;
    li.appendChild(liText);
    li.style.margin = '15px';
    li.className = 'list';
    li.style.backgroundColor = 'gray';
    li.style.color = 'white';
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between'; // Aligns text and buttons at opposite ends
    li.style.alignItems = 'center'; // Centers buttons vertically
    ul.appendChild(li);

    // Button Container
    const buttonContainer = document.createElement('div');
    li.appendChild(buttonContainer);

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('Delete Appointment'));
    deleteBtn.style.backgroundColor = '#4CAF50';
    deleteBtn.style.color = 'white';
    deleteBtn.style.border = 'none';
    deleteBtn.style.borderRadius = '4px';
    deleteBtn.style.padding = '10px 20px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.marginRight = '10px'; // Add space between buttons
    buttonContainer.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', function () {
        axios.delete(`http://localhost:3000/BookingAppointments/${appointment.id}`)
            .then(() => {
                ul.removeChild(li);
                totalAppointments--;
                updateTotalDisplay();
            })
            .catch((error) => {
                console.error('Error deleting appointment:', error);
            });
    });

    // Edit Button
    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit Appointment';
    editBtn.style.backgroundColor = '#4CAF50';
    editBtn.style.color = 'white';
    editBtn.style.border = 'none';
    editBtn.style.borderRadius = '4px';
    editBtn.style.padding = '10px 20px';
    editBtn.style.cursor = 'pointer';
    buttonContainer.appendChild(editBtn);

    const editForm = document.createElement('form');
    editForm.style.display = 'none';
    editForm.style.flexDirection = 'column';
    editForm.style.marginTop = '10px';
    li.appendChild(editForm);

    const editUsername = document.createElement('input');
    editUsername.type = 'text';
    editUsername.value = appointment.username;
    editForm.appendChild(editUsername);

    const editEmail = document.createElement('input');
    editEmail.type = 'email';
    editEmail.value = appointment.email;
    editForm.appendChild(editEmail);

    const editMobileNumber = document.createElement('input');
    editMobileNumber.type = 'number';
    editMobileNumber.value = appointment.mobileNumber;
    editForm.appendChild(editMobileNumber);

    const editSubmitButton = document.createElement('button');
    editSubmitButton.textContent = 'Save';
    editForm.appendChild(editSubmitButton);

    const editCancelButton = document.createElement('button');
    editCancelButton.textContent = 'Cancel';
    editForm.appendChild(editCancelButton);

    editBtn.addEventListener('click', function () {
        editForm.style.display = editForm.style.display === 'none' ? 'flex' : 'none';
    });

    editSubmitButton.addEventListener('click', function (event) {
        event.preventDefault();

        // Prepare the updated appointment data
        const updatedAppointment = {
            username: editUsername.value,
            email: editEmail.value,
            mobileNumber: editMobileNumber.value,
        };
        console.log('Updated Appointment Data:', updatedAppointment);

        // Send the updated data to the server
        axios.put(`http://localhost:3000/BookingAppointments/${appointment.id}`, updatedAppointment)
            .then(() => {
                liText.textContent = `Username: ${updatedAppointment.username}, Email: ${updatedAppointment.email}, Mobile Number: ${updatedAppointment.mobileNumber}`;
                editForm.style.display = 'none';
            })
            .catch((error) => {
                console.error('Error editing appointment:', error);
            });
    });

    editCancelButton.addEventListener('click', function (event) {
        event.preventDefault();
        editForm.style.display = 'none';
    });
}
function updateTotalDisplay() {
    document.getElementById("total-appointments-count").textContent = totalAppointments;
}
