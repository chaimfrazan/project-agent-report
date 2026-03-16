import useUserContext from '../contextProvider/userContext'


function AgentNavbar() {
    const {user}= useUserContext()

    return (
        <div className='name'>
            <h2>welcome agent {user?.fullName}</h2>
        </div>
    )
}

export default AgentNavbar
