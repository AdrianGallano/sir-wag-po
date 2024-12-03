from rest_framework import throttling


class UploadImageThrottle(throttling.UserRateThrottle):
    scope = "upload_image"


class GeneralImageThrottle(throttling.UserRateThrottle):
    scope = "general_image"


class GeneralRequestThrottle(throttling.UserRateThrottle):
    scope = "general_request"
