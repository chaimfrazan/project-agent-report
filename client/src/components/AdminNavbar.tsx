import useUserContext from '../contextProvider/userContext'


function AdminNavbar() {
    const { user } = useUserContext()

    return (
        <div className='name'>
            <h2>welcome Admin {user?.fullName}</h2>
        </div>
    )
}

export default AdminNavbar
