import User from './user';

class Room {
    // Initialise un tableau vide pour stocker les utilisateurs de la salle
    users: User[] = [];

    // Méthode pour ajouter un utilisateur à la salle
    addUser(user: User) {
        this.users.push(user); // Ajoute l'utilisateur à la liste des utilisateurs de la salle
    }

    // Méthode pour supprimer un utilisateur de la salle
    removeUser(userId: string) {
        this.users = this.users.filter(user => user.id !== userId); // Filtrer les utilisateurs pour ne pas inclure celui avec l'ID spécifié
    }

    // Méthode pour récupérer un utilisateur par son ID
    getUser(userId: string) {
        return this.users.find(user => user.id === userId); // Trouve et retourne l'utilisateur avec l'ID spécifié
    }
}

export default Room;
