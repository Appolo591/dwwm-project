import UserItem from '../UserItem/UserItem'
import styles from './UsersList.module.css'

const UsersList = ({users}) => {

  return (
    <>
      
        {/* <p>Total de users: {users.length}</p>
      <ul className={styles.userList} >
        {users.map(user => (
            <li key={user.id}>
              <UserItem user={user} />
            </li>
        ))}
      </ul>
      <h1>Liste des Utilisateurs</h1> */}

        <table className={styles.table}>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>email</th>
                    <th>role</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    </>

  );
};

export default UsersList;