# Generated by Django 5.1.3 on 2024-12-18 19:09

from django.db import migrations


def add_group_to_manager(apps, schema_editor):
    Group = apps.get_model("auth", "Group")

    Group.objects.create(name="manager")

class Migration(migrations.Migration):

    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(add_group_to_manager),
    ]