const ResetPasswordForm = () => {
    return (
        <form action="">
            <legend>Formulaire d'oubli</legend>
            <label htmlFor="mail">mail</label>
            <input type="email" name="email" id="email" />
            <button type="submit" >Envoyer</button>
        </form>
    )
}

export default ResetPasswordForm