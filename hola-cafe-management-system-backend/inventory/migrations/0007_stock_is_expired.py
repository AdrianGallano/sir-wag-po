# Generated by Django 5.1.3 on 2024-12-17 18:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0006_stockcart_stocktransaction_stockused'),
    ]

    operations = [
        migrations.AddField(
            model_name='stock',
            name='is_expired',
            field=models.BooleanField(default=False),
        ),
    ]