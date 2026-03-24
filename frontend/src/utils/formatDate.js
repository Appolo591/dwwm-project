// Fonction pour formater la date proprement

const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long', // 'long' pour "octobre", '2-digit' pour "10"
        year: 'numeric'
    });
};

export default formatDate;