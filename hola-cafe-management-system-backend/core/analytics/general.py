def query_by_date(obj, obj_serializer, date_range):
    obs = obj.objects.filter(
        created_at__date__gte=date_range[1], created_at__date__lte=date_range[0]
    )
    serialized_objects = obj_serializer(obs, many=True)

    return serialized_objects.data