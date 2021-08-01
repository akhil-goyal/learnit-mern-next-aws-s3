import { useState, useEffect } from 'react';
import axios from 'axios';
import InstructorRoute from './../../../components/routes/InstructorRoute';
import CourseCreateForm from './../../../components/forms/CourseCreateForm';

const CreateCourse = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        category: '',
        price: '9.99',
        uploading: false,
        paid: true,
        loading: false,
    });

    const [preview, setPreview] = useState('');

    const handleChange = (e) => {

        setValues({ ...values, [e.target.name]: e.target.value });

    }

    const handleImage = (e) => {

        setPreview(window.URL.createObjectURL(e.target.files[0]));



    }

    const handleSubmit = (e) => {

        e.preventDefault();

    }

    return (
        <InstructorRoute>

            <h1 className="jumbotron text-center square">Create Course</h1>

            <div className="pt-3 pb-3">
                <CourseCreateForm
                    handleSubmit={handleSubmit}
                    handleImage={handleImage}
                    handleChange={handleChange}
                    values={values}
                    setValues={setValues}
                    preview={preview}
                />
            </div>

            <pre>{JSON.stringify(values, null, 4)}</pre>

        </InstructorRoute>
    )
}

export default CreateCourse;