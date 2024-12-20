# Generated by Django 5.1.3 on 2024-12-03 07:04

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('core', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, null=True)),
                ('description', models.TextField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
            ],
            options={
                'indexes': [models.Index(fields=['name'], name='inventory_c_name_546ce4_idx')],
            },
        ),
        migrations.CreateModel(
            name='Supplier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, null=True)),
                ('description', models.TextField(null=True)),
                ('contact_person', models.CharField(max_length=255, null=True)),
                ('phone_number', models.CharField(max_length=16)),
                ('address', models.CharField(max_length=400)),
                ('email', models.EmailField(max_length=254)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
            ],
            options={
                'indexes': [models.Index(fields=['name'], name='inventory_s_name_d435cf_idx')],
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, null=True)),
                ('description', models.TextField(null=True)),
                ('price', models.DecimalField(decimal_places=2, default=0, max_digits=10, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='inventory.category')),
                ('image', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.image')),
            ],
            options={
                'indexes': [models.Index(fields=['name'], name='inventory_p_name_f6a6a1_idx')],
            },
        ),
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(null=True)),
                ('quantity', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('cost_price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('date_shelved', models.DateTimeField(null=True)),
                ('expiration_date', models.DateTimeField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('status', models.CharField(max_length=255, null=True)),
                ('image', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.image')),
                ('is_stocked_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('supplier', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='inventory.supplier')),
            ],
            options={
                'indexes': [models.Index(fields=['name'], name='inventory_s_name_f89f23_idx')],
            },
        ),
    ]
