import styles from './UserItem.module.css';

function UserItem({ user }) {

    return (
            
            <div className={styles.userItem}>        
                <h3>{user.name} </h3>
                <p>id n° {user.id}</p> 
                <p>email = {user.email}</p>
                <p>role = {user.role}</p>
            </div>
    );
}

export default UserItem;