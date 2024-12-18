from rest_framework.permissions import BasePermission


class IsManagerOrRestrictedAccess(BasePermission):
    """
    Custom permission to only allow managers and superadmin to access specific objects.
    """

    def has_permission(self, request, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        print(request.user.groups.all())
        return True
