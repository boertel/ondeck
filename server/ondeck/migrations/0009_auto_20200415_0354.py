# Generated by Django 2.2.11 on 2020-04-15 03:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ondeck', '0008_ticket_position'),
    ]

    operations = [
        migrations.CreateModel(
            name='WorkspaceMembership',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(choices=[('owner', 'Owner')], max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='board',
            name='members',
        ),
        migrations.RemoveField(
            model_name='workspace',
            name='owner',
        ),
        migrations.DeleteModel(
            name='Membership',
        ),
        migrations.AddField(
            model_name='workspacemembership',
            name='workspace',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ondeck.Workspace'),
        ),
        migrations.AddField(
            model_name='workspace',
            name='members',
            field=models.ManyToManyField(through='ondeck.WorkspaceMembership', to=settings.AUTH_USER_MODEL),
        ),
    ]
