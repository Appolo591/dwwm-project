


export default function EditProfilForm() {
 

    const handleUpdate = () => {
        console.log("ici les données à mettre à jour")
    }

    return (
        <>
            <form onSubmit={handleUpdate} method="POST">
                <legend>Editer mon profil</legend>
                <div>
                    <label htmlFor="name">Nom</label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email"  />
                </div>
                <button type="submit">Mettre à Jour</button>
            </form>
        </>
    )
}