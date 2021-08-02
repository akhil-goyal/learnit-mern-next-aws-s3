import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import InstructorRoute from './../../../../components/routes/InstructorRoute';
import { Avatar, Tooltip } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';

const CourseView = () => {

    const [course, setCourse] = useState({});

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

                </div>}
            </div>
        </InstructorRoute>
    )

}

export default CourseView;