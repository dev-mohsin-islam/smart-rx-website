import React from 'react';

const AppointmentList = () => {
    return (
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Actin</th>
                        <th scope="col">Appointment Date</th>
                        <th scope="col">Appointment ID</th>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">status</th>
                        <th scope="col">Consultant Info</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Actin
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Prescription Print</a></li>
                                    <li><a class="dropdown-item" href="#">Appointment Cancel</a></li>
                                </ul>
                            </div>
                        </th>
                        <td>05.12.2022</td>
                        <td>121311</td>
                        <td>Mizanur Rahman</td>
                        <td>0179374856</td>
                        <td>Prescription Ready </td>
                        <td>Dr. Kamrul Hasan Chowdhury</td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
};

export default AppointmentList;