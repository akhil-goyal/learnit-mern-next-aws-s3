import { Button, Progress, Tooltip } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

const UpdateLessonForm = ({
    current,
    progress,
    uploading,
    setCurrent,
    handleVideo,
    handleUpdateLesson,
    uploadVideoButtonText,
}) => {

    return (
        <div className="container pt-3">
            <form onSubmit={handleUpdateLesson}>
                <input
                    onChange={e => setValues({ ...current, title: e.target.value })}
                    type="text"
                    className="form-control square"
                    value={current.title}
                    autoFocus
                    required
                />

                <textarea
                    onChange={e => setValues({ ...current, content: e.target.value })}
                    className="form-control mt-3"
                    rows="7"
                    cols="7"
                    value={current.content}
                />

                {
                    <div className="d-flex justify-content-center">

                        <label className="btn btn-dark btn-block text-left mt-3">
                            {uploadVideoButtonText}
                            <input onChange={handleVideo} type="file" accept="video/*" hidden />
                        </label>

                        {
                            !uploading && current.video && current.video.Location && (
                                <div className="pt-2 d-flex justify-content-center">
                                    Show Video Player
                                </div>
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

                <div className="d-flex justify-content-between">
                    <span className="pt-3 badge">
                        Preview
                    </span>
                </div>

                <Button
                    onClick={handleUpdateLesson}
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

export default UpdateLessonForm;