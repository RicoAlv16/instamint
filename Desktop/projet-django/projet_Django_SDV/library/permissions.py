from rest_framework import permissions

class IsAuthorOrAdmin(permissions.BasePermission):
    """
    Permission qui permet à un utilisateur d'accéder à l'API Author
    s'il est un membre du groupe 'author' ou un administrateur.
    """

    def has_permission(self, request, view):
        # Autoriser les utilisateurs authentifiés
        if request.user.is_authenticated:
            if request.method in permissions.SAFE_METHODS:
                # Lecture autorisée pour les utilisateurs du groupe 'author'
                return request.user.groups.filter(name='author').exists() or request.user.is_staff
            elif request.method == 'POST':
                # Écriture autorisée uniquement pour les administrateurs
                return request.user.is_staff
        return False
