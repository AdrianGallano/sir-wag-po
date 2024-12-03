from .models import UserLog


def creationBasedUserLog(user, object_model, data):
    UserLog.objects.create(
        user=user,
        description=f"{user.username} created a {object_model}",
        object_data=data,
    )


def modificationBasedUserLog(user, object_model, old_data, new_data):
    data = {"new": new_data, "old": old_data}
    UserLog.objects.create(
        user=user,
        description=f"{user.username} updated a {object_model}",
        object_data=data,
    )


def deletionBasedUserLog(user, object_model, data):
    UserLog.objects.create(
        user=user,
        description=f"{user.username} deleted a {object_model}",
        object_data=data,
    )
