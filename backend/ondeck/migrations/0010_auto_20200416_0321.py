# Generated by Django 2.2.11 on 2020-04-16 03:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ondeck', '0009_auto_20200415_0354'),
    ]

    operations = [
        migrations.CreateModel(
            name='TicketMembership',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(choices=[('owner', 'Owner'), ('assignee', 'Assignee')], max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='ticket',
            name='assignees',
        ),
        migrations.DeleteModel(
            name='Assignee',
        ),
        migrations.AddField(
            model_name='ticketmembership',
            name='ticket',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ondeck.Ticket'),
        ),
        migrations.AddField(
            model_name='ticketmembership',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='ticket',
            name='members',
            field=models.ManyToManyField(through='ondeck.TicketMembership', to=settings.AUTH_USER_MODEL),
        ),
    ]
