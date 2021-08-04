import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Resizer from 'react-image-file-resizer';
import InstructorRoute from './../../../../components/routes/InstructorRoute';
import CourseCreateForm from './../../../../components/forms/CourseCreateForm';
import { useRouter } from 'next/router';
import { Avatar, List, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import UpdateLessonForm from './../../../../components/forms/UpdateLessonForm';

const { Item } = List;

const CreateEdit = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        category: '',
        price: '9.99',
        uploading: false,
        paid: true,
        loading: false,
        lessons: []
    });

    const [image, setImage] = useState('');
    const [preview, setPreview] = useState('');
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image');

    // Lesson Update States
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState({});
    const [uploadVideoButtonText, setUploadVideoButtonText] = useState('Upload Video');
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);


    const router = useRouter();
    const { slug } = router.query;

    const loadCourse = async () => {

        const { data } = await axios.get(`/api/course/${slug}`);

        if (data) setValues(data);

        if (data && data.image) setImage(data.image);

    }

    useEffect(() => {
        loadCourse();
    }, [slug]);

    const handleChange = (e) => {

        setValues({ ...values, [e.target.name]: e.target.value });

    }

    const handleImage = (e) => {

        let file = e.target.files[0];
        setPreview(window.URL.createObjectURL(file));

        setUploadButtonText(file.name);

        setValues({ ...values, loading: true });

        //Resizing
        Resizer.imageFileResizer(file, 720, 500, 'JPEG', 100, 0, async (uri) => {

            try {

                let { data } = await axios.post(`/api/course/upload-image`, {
                    image: uri
                });

                setValues({ ...values, loading: false });

            } catch (err) {
                console.log(err);
                setValues({ ...values, loading: false });
                toast('Image Upload Failed! Try again...');
            }

        });

    }

    const handleImageRemove = async () => {

        try {

            setValues({ ...values, loading: true });

            const res = await axios.post(`/api/course/remove-image`, { image });

            setImage({});
            setPreview('');
            setUploadButtonText('Upload Image');
            setValues({ ...values, loading: false });

        } catch (err) {
            setValues({ ...values, loading: false });
            toast('Image Upload Failed! Try again...');
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const { data } = await axios.put(`/api/course/${slug}`, {
                ...values, image
            });
            toast('Course Updated!');
            // router.push('/instructor');
        } catch (err) {
            toast(err.response.data);
        }

    }

    const handleDrag = (e, index) => {

        e.dataTransfer.setData('itemIndex', index);

    }

    const handleDrop = async (e, index) => {

        const movingItemIndex = e.dataTransfer.getData('itemIndex');
        const targetItemIndex = index;

        let allLessons = values.lessons;

        let movingItem = allLessons[movingItemIndex];

        allLessons.splice(movingItemIndex, 1);
        allLessons.splice(targetItemIndex, 0, movingItem);

        setValues({ ...values, lessons: [...allLessons] });

        // Save the new odered list in DB
        const { data } = await axios.put(`/api/course/${slug}`, {
            ...values, image
        });

        toast('Lessons have been reordered successfully!');
    }

    const handleDelete = async (index) => {

        const answer = window.confirm('Are you sure you want to delete?');

        if (!answer) return;

        let allLessons = values.lessons;

        const removed = allLessons.splice(index, 1);

        setValues({ ...values, lessons: allLessons });

        // Send to server-side
        const { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`);

        console.log(data);

    }

    const handleVideo = () => {

    }

    const handleUpdateLesson = () => {

    }

    return (
        <InstructorRoute>

            <h1 className="jumbotron text-center square">Update Course</h1>

            <div className="pt-3 pb-3">
                <CourseCreateForm
                    handleSubmit={handleSubmit}
                    handleImage={handleImage}
                    handleChange={handleChange}
                    handleImageRemove={handleImageRemove}
                    values={values}
                    setValues={setValues}
                    preview={preview}
                    uploadButtonText={uploadButtonText}
                    editPage={true}
                />
            </div>

            <hr />

            <div className="row pb5">

                <div className="col lesson-list">

                    <h4>{values && values.lessons && values.lessons.length} Lessons</h4>

                    <List
                        onDragOver={(e) => e.preventDefault()}
                        itemLayout="horizontal"
                        dataSource={values && values.lessons}
                        renderItem={(item, index) => (
                            <Item
                                draggable
                                onDragStart={e => handleDrag(e, index)}
                                onDrop={e => handleDrop(e, index)}
                            >
                                <Item.Meta
                                    onClick={() => {
                                        setVisible(true)
                                        setCurrent(item);
                                    }}
                                    title={item.title}
                                    avatar={<Avatar>{index + 1}</Avatar>}
                                >
                                </Item.Meta>

                                <DeleteOutlined className="text-danger float-right" onClick={() => handleDelete(index)} />
                            </Item>
                        )}
                    >

                    </List>

                </div>
            </div>

            <Modal
                title="Update Lesson"
                visible={visible}
                centered
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <UpdateLessonForm
                    current={current}
                    progress={progress}
                    uploading={uploading}
                    setCurrent={setCurrent}
                    handleVideo={handleVideo}
                    handleUpdateLesson={handleUpdateLesson}
                    uploadVideoButtonText={uploadVideoButtonText}
                />
            </Modal>

        </InstructorRoute>
    )
}

export default CreateEdit;