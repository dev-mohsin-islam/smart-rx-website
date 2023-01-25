import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthProvider';
import './DoctorList.css'

const DoctorList = () => {
    const [doctorList, setDoctorList] = useState();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost/su-smart-rx/api/User_Profile.php`)
            .then(res => {
                setDoctorList(res.data)
            })
            .catch(error => {
                console.log(error);
            })

    }, []);

    const handleBooking = (data) => {
        if (user?.uid === undefined) {
            navigate('/signUp')
        }
        console.log(data)
    }

    const handleAppointment = async (event) => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;
        const age = form.age.value;
        // gender defined top
        // maritalStatus defined top
        const weight = form.weight.value;
        const height = form.height.value;
        const blood_group = form.blood_group.value;
        const temperature = form.temperature.value;
        const pulse = form.pulse.value;
        const bp_heigh = form.bp_heigh.value;
        const bp_low = form.bp_low.value;
        const medicine_taken = form.medicine_taken.value;
        console.log(form)
        // District
        const patient_address = form.patient_address.value;
        const appointment_date = form.appointment_date.value;
        if (appointment_date === "") {
            return toast.error("Please fill up the  required filed")
        }

        if (name === "") {
            return toast.error("Please fill up the  required filed");
        } else if (phone === "") {
            return toast.error("Please fill up the  required filed");
        } else {
            const post = {
                patient_name: name,
                patient_phone: phone,
                patient_email: email,
                patient_blood: blood_group,
                patient_address: patient_address,
                created_by: user?.uid,
                uuid: user?.uid
            }


            try {
                // insert patient data with get patient data
                const res = await axios.post('http://localhost/su-smart-rx/api/Patient_data.php', post)
                const status = res.data.status;
                if (status === true) {
                    const lastRow = res.data.data;
                    if (lastRow) {

                        // second api called
                        const post = {
                            patient_id: lastRow[0].id,
                            name: name,
                            phone: phone,
                            email: email,
                            age: age,
                            weight: weight,
                            height: height,
                            blood_group: blood_group,
                            temperature: temperature,
                            pulse: pulse,
                            bp_heigh: bp_heigh,
                            bp_low: bp_low,
                            medicine_taken: medicine_taken,
                            appointment_date: appointment_date,
                            status: "prescriptionNotReady",
                            created_by: user?.uid,
                        }
                        try {
                            const res = await axios.post('http://localhost/su-smart-rx/api/Appointment_data.php', post)
                            const resp = res.data;
                            if (resp.status === true) {
                                console.log(resp.data)
                                if (resp.data !== true) {
                                    toast.error("Already Appointed");
                                } else {
                                    toast.success("Appointment success");
                                }
                            }
                        } catch (e) {
                            console.log(e);
                        }
                        // second try catch end
                    }
                    //  appointment info end

                }
                if (status === false) {
                    toast.error("Data not inserted");
                }

            } catch (e) {
                console.log(e)
            }

        }

    }
    return (
        <div id="card-container" className=' d-md-flex gap-5 justify-content-center mt-5'>
            {
                doctorList?.length > 0 && doctorList.map(doctor => (
                    <div className="card">
                        <img src={doctor?.photo_url} className="card-img-top" alt="..." />
                        <div id="title" className="card-body">
                            <h4 className="card-title">{doctor?.full_name}</h4>
                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{doctor?.designation}</li>
                            <li className="list-group-item">{doctor?.qualification}</li>
                            <li className="list-group-item">{doctor?.specialty}</li>
                        </ul>
                        <div className="card-body">
                            {
                                user?.uid === undefined ?
                                    <button onClick={(event) => handleBooking(doctor)} className=" btn btn-info text-white">BOOK NOW</button>
                                    : <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        BOOK APPOINTMENT
                                    </button>

                            }

                        </div>
                    </div>
                ))
            }

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleAppointment} className="needs-validation novalidate">
                                <div className="row mb-3" >
                                    <label htmlFor="name"
                                        className="col-sm-3 col-form-label" > Name: <span className="text-danger" > * </span></label >
                                    <div className="col-sm-6" >
                                        <input name="name" type="text" className="form-control" id="validationCustom01" placeholder="eg: Mohsin" required />
                                    </div>
                                    <div class="invalid-feedback">
                                        Please enter name.
                                    </div>
                                </div >

                                <div className="row mb-3" >
                                    <label htmlFor="phone"
                                        className="col-sm-3 col-form-label" > Phone: <span className='text-danger'>*</span></label><div className="col-sm-6" >
                                        <input name='phone' type="text" className="form-control" id="phone" placeholder="eg: 0179*******" />
                                    </div>
                                </div >

                                {/* email */}
                                <div className="row mb-3" >
                                    <label htmlFor="email" className="col-sm-3 col-form-label" > Email:</label >
                                    <div className="col-sm-6" >
                                        <input name="email" type="email" className="form-control" id="email" placeholder="eg: mohsin@gmail.com" />
                                    </div>
                                </div >

                                {/* Age */}
                                <div className="row mb-3" >
                                    <label htmlFor="age"
                                        className="col-sm-3 col-form-label" > Age: </label>
                                    <div className="col-sm-2" >
                                        <input name='age' type="text" className="form-control" id="age" placeholder="2y 1m " />
                                    </div>
                                </div>

                                { /* <!-- gender --> */}
                                {/* <div className="row mb-3" >
                                    <label htmlFor="gender" className="col-sm-3 col-form-label" > Gender: </label> <div className="col-sm-6" >
                                        <select id="gender" className="form-select" onChange={handleGender} >
                                            <option> {gender ? gender : "Select Gender"} </option>
                                            <option defaultValue={"Male"}> Male </option>
                                            <option defaultValue={"Female"}> Female </option>
                                            <option defaultValue={"Transgender"}> Transgender </option>
                                        </select>
                                    </div>
                                </div> */}

                                {/* More info */}
                                <div className="accordion accordion-flush w-75 " id="accordionFlushExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="flush-headingOne">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                Add more info
                                            </button>
                                        </h2>
                                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                            <div className="accordion-body">

                                                {/* <div className="row mb-3" >
                                                    <label htmlFor="Married" className="col-sm-3 col-form-label" >Marital Status: </label> <div className="col-sm-6" >
                                                        <select id="Married" className="form-select" onChange={handleMarital} >
                                                            <option> {maritalStatus ? maritalStatus : "Select Marital Status"} </option>
                                                            <option defaultValue={"Married"}> Married  </option>
                                                            <option defaultValue={"Unmarried"}> unmarried </option>
                                                        </select>
                                                    </div>
                                                </div> */}

                                                { /* <!-- Weight --> */}
                                                <div className="row mb-3" >
                                                    <label htmlFor="weight"
                                                        className="col-sm-3 col-form-label" > Weight: </label > <div className="col-sm-6" >
                                                        <input name="weight" type="text" className="form-control" id="weight" placeholder="eg: 70kg" />
                                                    </div>
                                                </div >

                                                <div className="row mb-3" >
                                                    <label htmlFor="height"
                                                        className="col-sm-3 col-form-label" > Height: </label >
                                                    <div className="col-sm-3" >
                                                        <input name='height' type="text" className="form-control" id="height" placeholder="7f, 2inc" />
                                                    </div>
                                                </div >

                                                <div className="row mb-3" >
                                                    <label htmlFor="blood_group"
                                                        className="col-sm-3 col-form-label" > Blood Group: </label > <div className="col-sm-6" >
                                                        <input name="blood_group" type="text" className="form-control" id="blood_group" placeholder="eg: O+" />
                                                    </div>
                                                </div >


                                                { /* <!-- Temperature --> */}
                                                <div className="row mb-3" >
                                                    <label htmlFor="temperature"
                                                        className="col-sm-3 col-form-label" > Temperature: </label > <div className="col-sm-6" >
                                                        <input name='temperature' type="text" className="form-control" id="temperature" placeholder="eg: 97" />
                                                    </div>
                                                </div >

                                                { /* <!-- Pulse --> */}
                                                <div className="row mb-3" >
                                                    <label htmlFor="pulse"
                                                        className="col-sm-3 col-form-label" > Pulse: </label> <div className="col-sm-6" >
                                                        <input name='pulse' type="text" className="form-control" id="pulse" placeholder="eg: 80" />
                                                    </div>
                                                </div >

                                                { /* <!-- Body Pulse --> */}
                                                <div className="row mb-3" >
                                                    <label htmlFor="bp_heigh"
                                                        className="col-sm-3 col-form-label" > BP: </label>
                                                    <div className="col-sm-3" >
                                                        <input name='bp_heigh' type="text" className="form-control" id="bp_heigh" placeholder="eg: 120" />
                                                    </div> / <div className="col-sm-3" >
                                                        <input name='bp_low' type="text" className="form-control" id="bp_low" placeholder="eg: 80" />
                                                    </div>
                                                </div >

                                                {/* Medicine Taken */}
                                                <div className="row mb-3" >
                                                    <label htmlFor="medicine_taken"
                                                        className="col-sm-3 col-form-label" > Medicine Taken: </label > <div className="col-sm-6" >
                                                        <input name='medicine_taken' type="text" className="form-control" id="medicine_taken" placeholder="eg: 97" />
                                                    </div>
                                                </div >

                                                {/* Select district */}
                                                {/* <div className="row mb-3" >
                                                    <label htmlFor="district" className="col-sm-3 col-form-label" >District: </label> <div className="col-sm-6" >
                                                        <select id="district" className="form-select" onChange={handleDistrict} >
                                                            <option> {patientDistrict ? patientDistrict : "Select District"} </option>
                                                            <option defaultValue={"Dhaka"}> Dhaka  </option>
                                                            <option defaultValue={"Khulna"} > Khulna  </option>
                                                            <option defaultValue={"Barishal"} > Barishal  </option>
                                                            <option defaultValue={"Chatragram"} > Chatragram  </option>
                                                        </select>
                                                    </div>
                                                </div> */}

                                                {/* Medicine Taken */}
                                                <div className="row mb-3" >
                                                    <label htmlFor="medicine_taken"
                                                        className="col-sm-3 col-form-label" > Full Address: </label > <div className="col-sm-6" >
                                                        <input name='patient_address' type="text" className="form-control" id="medicine_taken" placeholder="eg: 97" />
                                                    </div>
                                                </div >

                                            </div>
                                        </div>
                                    </div>
                                </div>


                                { /* <!-- Appointment Date --> */} <div className="row mb-3" >
                                    <label htmlFor="appointment_date"
                                        className="col-sm-3 col-form-label" > Appointment Date:<span className='text-danger'>*</span> </label> <div className="col-lg-6" >
                                        <input name="appointment_date" type="date" id="appointment_date" className="form-control" autoComplete="true" />
                                    </div> </div >


                                { /* <!-- auto generated serial --> */}
                                {/* <div className="row mb-3" >
                                    <label htmlFor="serial" className="col-sm-3 col-form-label" > Serial: <span className='text-danger'>*</span> </label ><div className="col-sm-6" >

                                        {

                                            <input defaultValue={`${todayAppointments?.length > 0 ? todayAppointments?.length + 1 : "1"}`} name='serial' type="number" className="form-control" id="serial" />
                                        }


                                    </div>
                                </div > */}


                                <button type='submit' className="btn btn-success" > Save Appointment</button>


                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        </div>

                    </div>
                </div>
            </div>

        </div >
    );
};

export default DoctorList;