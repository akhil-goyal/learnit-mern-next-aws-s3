import { Select, Button } from 'antd';

const { Option } = Select;

const CourseCreateForm = ({
    handleImage,
    handleChange,
    handleSubmit,
    values,
    setValues
}) => {

    const children = [];

    for (let i = 9.99; i <= 100.99; i++) {
        children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>)
    }

    return (
        (

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={values.name}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <textarea
                        name="description"
                        rows="7"
                        cols="7"
                        placeholder="Name"
                        value={values.description}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="form-row">
                    <div className="col">
                        <div className="form-group">
                            <Select
                                style={{ width: '100%' }}
                                size="large"
                                value={values.paid}
                                onChange={v => setValues({ ...values, paid: !values.paid })}
                            >
                                <Option value={true}>Paid</Option>
                                <Option value={false}>Free</Option>
                            </Select>
                        </div>
                    </div>
                </div>

                {
                    values.paid &&
                    <div className="form-group">
                        <Select
                            onChange={v => setValues({ ...values, price: v })}
                            defaultValue="9.99"
                            style={{ width: '100%' }}
                            tokenSeparators={[,]}
                            size="large"
                        >
                            {children}
                        </Select>
                    </div>
                }

                <div className="form-group">
                    <input
                        name="category"
                        type="text"
                        placeholder="Category"
                        value={values.category}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="form-row">
                    <div className="col">
                        <div className="form-group">
                            <label className="btn btn-outline-secondary btn-block text-left">
                                {values.loading ? 'Uploading' : 'Uploaded Successfully!'}
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleImage}
                                    accept="image/*"
                                    hidden
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <Button
                            className="btn btn-primary"
                            type="primary"
                            size="large"
                            shape="round"
                            loading={values.loading}
                            onClick={handleSubmit}
                            disabled={values.loading || values.uploading}
                        >
                            {values.loading ? 'Saving...' : 'Save & Continue'}
                        </Button>
                    </div>
                </div>

            </form>
        )
    )
}

export default CourseCreateForm;