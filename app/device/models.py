from django.db import models


MODEL_CHOICES = (
    ("motorola", "MOTOROLA"),
    ("samsung", "SAMSUNG"),
)


class Device(models.Model):
    class Meta:
        ordering = ["name_of_phone"]

    name_of_phone = models.CharField(max_length=255, blank=True)
    device_id = models.CharField(max_length=255, blank=True)
    port = models.CharField(max_length=255, blank=True)
    model = models.CharField(max_length=255, choices=MODEL_CHOICES, default="")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name_of_phone
