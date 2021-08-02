import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import InstructorRoute from './../../../../components/routes/InstructorRoute';
import { Avatar, Tooltip, Button, Modal } from 'antd';
import { EditOutlined, CheckOutlined, UploadOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import AddLessonForm from './../../../../components/forms/AddLessonForm';

const CourseView = () => {

    const [course, setCourse] = useState({});
    const [visible, setVisible] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [values, setValues] = useState({
        title: '',
        content: '',
        video: ''
    });


    const router = useRouter();

    const { slug } = router.query;

    const loadCourse = async () => {

        const { data } = await axios.get(`/api/course/${slug}`);

        setCourse(data);

    }

    useEffect(() => {
        console.log(slug);
        loadCourse();
    }, [slug]);

    const handleAddLesson = e => {

        e.preventDefault();
        console.log(values);

    }

    return (
        <InstructorRoute>
            <div className="container-fluid pt-3">
                <p>View {slug}</p>
                {course && <div className="container-fluid pt-1">
                    <div className="media pt-2">
                        <Avatar size={80} src={course.image ? course.image.location : '/course.png'} />

                        <div className="media-body pt-2">
                            <div className="row">

                                <div className="col">
                                    <h5 className="mt-2 text-primary">{course.name}</h5>
                                    <p style={{ marginTop: '-10px' }}>{course.lessons && course.lessons.length} lessons</p>

                                    <p style={{ marginTop: '-15px', fontSize: '10px' }}>{course.category}</p>
                                </div>

                                <div className="d-flex pt-4">
                                    <Tooltip title="Edit"><EditOutlined className="h5 pointer text-warning mr-4" /></Tooltip>
                                    <Tooltip title="Publish"><CheckOutlined className="h5 pointer text-danger" /></Tooltip>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="column">
                            <ReactMarkdown source={course.description} />
                        </div>
                    </div>

                    <div className="row">
                        <Button
                            onClick={() => setVisible(true)}
                            className="col-md-6 offset-md-3 text-center"
                            type="primary"
                            shape="round"
                            icon={<UploadOutlined />}
                            size="large"
                        >
                            Add Lesson
                        </Button>

                    </div>

                    <br />

                    <Modal footer={null} onCancel={() => setVisible(false)} visible={visible} centered title="+ Add Lesson">
                        <AddLessonForm uploading={uploading} values={values} setValues={setValues} handleAddLesson={handleAddLesson} />
                    </Modal>

                </div>}
            </div>
        </InstructorRoute>
    )

}

export default CourseView;