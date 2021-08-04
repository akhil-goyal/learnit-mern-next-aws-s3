import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import InstructorRoute from './../../../../components/routes/InstructorRoute';
import { Avatar, Tooltip, Button, Modal, List } from 'antd';
import { EditOutlined, CheckOutlined, UploadOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import AddLessonForm from './../../../../components/forms/AddLessonForm';
import { toast } from 'react-toastify';

const CourseView = () => {

    const [course, setCourse] = useState({});
    const [visible, setVisible] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState('Upload Video');
    const [progress, setProgress] = useState(0);
    const [values, setValues] = useState({
        title: '',
        content: '',
        video: {}
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

    const handleAddLesson = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(`/api/course/lesson/${slug}/${course.instructor._id}`, values);
            console.log(data);
            setValues({ ...values, title: '', content: '', video: {} });
            setVisible(false);
            setUploadButtonText('Upload video');
            setCourse(data);
            toast('Lesson Added!');
        } catch (err) {
            console.log(err);
            toast('Lesson Addition Failed!');
        }

    }

    const handleVideoRemove = async () => {

        try {
            setUploading(true);
            const { data } = await axios.post(`/api/course/video-remove/${course.instructor._id}`, values.video);
            console.log(data);
            setValues({ ...values, video: {} });
            setUploading(false);
            setUploadButtonText('Upload another video!');
        } catch (err) {
            console.log(err);
            setUploading(false);
            toast('Video removal Failed!');
        }

    }

    const handleVideo = async (e) => {



        try {

            const file = e.target.files[0];
            setUploadButtonText(file.name);
            setUploading(true);

            const videoData = new FormData();
            videoData.append('video', file);

            // Save Progress bar & send video as form data
            // to server-side.
            const { } = await axios.post(`/api/course/video-upload/${course.instructor._id}`, videoData, {
                onUploadProgress: (e) => {
                    setProgress(Math.round((100 * e.loaded) / e.total))
                }
            });

            // After receiving the response.
            console.log(data);
            setValues({ ...values, video: data });
            setUploading(false);
        } catch (err) {
            console.log(err);
            setUploading(false);
            toast('Video Upload Failed!');
        }

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
                                    <Tooltip onClick={() => router.push(`instructor/course/edit/:${slug}`)} title="Edit"><EditOutlined className="h5 pointer text-warning mr-4" /></Tooltip>
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
                        <AddLessonForm
                            uploading={uploading}
                            values={values}
                            setValues={setValues}
                            handleAddLesson={handleAddLesson}
                            uploadButtonText={uploadButtonText}
                            handleVideo={handleVideo}
                            progress={progress}
                            handleVideoRemove={handleVideoRemove}
                        />
                    </Modal>

                    <div className="row pb5">
                        <div className="col lesson-list">

                            <h4>{course && course.lessons && course.lessons.length} Lessons</h4>

                            <List
                                itemLayout="horizontal"
                                dataSource={course && course.lessons}
                                renderItem={(item, index) => (<Item>
                                    <Item.Meta title={item.title} avatar={<Avatar>{index + 1}</Avatar>}>

                                    </Item.Meta>
                                </Item>)}
                            >

                            </List>

                        </div>
                    </div>

                </div>}
            </div>
        </InstructorRoute>
    )

}

export default CourseView;