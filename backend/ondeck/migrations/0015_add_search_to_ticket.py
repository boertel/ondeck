from django.db import migrations, models
import tsvector_field

class Migration(migrations.Migration):

    dependencies = [
        ('ondeck', '0014_add_search_to_board'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='search',
            field=tsvector_field.SearchVectorField(columns=[
                tsvector_field.WeightedColumn('title', 'A'),
                tsvector_field.WeightedColumn('description', 'B'),
            ], language='english'),
        ),
        tsvector_field.IndexSearchVector('ticket', 'search'),
    ]

