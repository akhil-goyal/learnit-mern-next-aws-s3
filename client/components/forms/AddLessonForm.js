import { Button } from 'antd';

const AddLessonForm = ({ uploading, values, setValues, handleAddLesson }) => {

    return (
        <div className="container pt-3">
            <form onSubmit={handleAddLesson}>
                <input
                    onChange={e => setValues({ ...values, title: e.target.value })}
                    type="text"
                    className="form-control square"
                    value={values.title}
                    placeholder="Title"
                    autoFocus
                    required
                />

                <textarea
                    onChange={e => setValues({ ...values, content: e.target.value })}
                    className="form-control mt-3"
                    rows="7"
                    cols="7"
                    value={values.content}
                    placeholder="Content"
                />

                <Button
                    onClick={handleAddLesson}
                    className="colmt-3"
                    size="large"
                    type="primary"
                    loading={uploading}
                    shape="round"
                >
                    Save
                </Button>
            </form>
        </div>
    )

}

export default AddLessonForm;