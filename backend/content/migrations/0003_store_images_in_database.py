from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("content", "0002_content_translations"),
    ]

    operations = [
        migrations.AddField(
            model_name="project",
            name="image_data",
            field=models.BinaryField(blank=True, editable=False, null=True),
        ),
        migrations.AddField(
            model_name="project",
            name="image_mime_type",
            field=models.CharField(blank=True, editable=False, max_length=100),
        ),
        migrations.AddField(
            model_name="post",
            name="cover_image_data",
            field=models.BinaryField(blank=True, editable=False, null=True),
        ),
        migrations.AddField(
            model_name="post",
            name="cover_image_mime_type",
            field=models.CharField(blank=True, editable=False, max_length=100),
        ),
        migrations.RemoveField(
            model_name="project",
            name="image_url",
        ),
        migrations.RemoveField(
            model_name="post",
            name="cover_image_url",
        ),
    ]
