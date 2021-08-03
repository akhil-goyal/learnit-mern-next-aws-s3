import { Button, Progress, Tooltip } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

const AddLessonForm = ({
    uploading,
    values,
    setValues,
    handleAddLesson,
    uploadButtonText,
    handleVideo,
    progress,
    handleVideoRemove
}) => {

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

                {
                    <div className="d-flex justify-content-center">

                        <label className="btn btn-dark btn-block text-left mt-3">
                            {uploadButtonText}
                            <input onChange={handleVideo} type="file" accept="video/*" hidden />
                        </label>

                        {
                            !uploading && values.video.Location && (
                                <Tooltip title="Remove">
                                    <span className="pt-1 pl-3" onClick={handleVideoRemove}>
                                        <CloseCircleFilled className="text-danger d-flex justify-content-center pt-4 pointer" />
                                    </span>
                                </Tooltip>
                            )
                        }

                    </div>
                }

                {
                    progress > 0 && (
                        <Progress
                            className="d-flex justify-content-center pt-2"
                            percent={progress}
                            steps={10}
                        />
                    )
                }

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