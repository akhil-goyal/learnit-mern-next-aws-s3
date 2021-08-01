import Link from 'next/link';

const InstructorNav = () => {
    return (
        <div className="nav flex-column nav-pills mt-2">
            <Link href="/instructor">
                <a className="nav-link active">Dashboard</a>
            </Link>
            <Link href="/instructor/course/create">
                <a className="nav-link active">Create a course</a>
            </Link>
        </div>
    )
}

export default InstructorNav;