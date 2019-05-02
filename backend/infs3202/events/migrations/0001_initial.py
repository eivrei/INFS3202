# Generated by Django 2.2 on 2019-05-02 07:49

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=70)),
                ('short_description', models.CharField(max_length=150)),
                ('description', models.TextField()),
                ('type', models.CharField(choices=[('Music', 'Music'), ('Sports', 'Sports'), ('Festivals', 'Festivals'), ('Theater/Shows', 'Theater/Shows')], max_length=30)),
                ('location', models.CharField(max_length=70)),
                ('start_time', models.DateTimeField()),
                ('created_at', models.DateTimeField(default=datetime.datetime.now)),
                ('image', models.ImageField(default='default.jpg', upload_to='')),
                ('max_number_of_tickets', models.IntegerField()),
                ('visible', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(default=datetime.datetime.now)),
                ('event', models.ForeignKey(on_delete='CASCADE', related_name='tickets', to='events.Event')),
            ],
        ),
    ]