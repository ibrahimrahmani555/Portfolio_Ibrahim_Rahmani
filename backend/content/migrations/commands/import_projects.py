import csv

from django.core.management.base import BaseCommand
from django.utils.text import slugify

from content.models import Project


class Command(BaseCommand):
    help = "Importe les projets depuis un fichier CSV"

    def add_arguments(self, parser):
        parser.add_argument("csv_file", type=str)

    def handle(self, *args, **options):
        csv_file = options["csv_file"]

        with open(csv_file, "r", encoding="utf-8-sig", newline="") as file:
            reader = csv.DictReader(file)

            created = 0
            updated = 0

            for row in reader:
                title = row["titre"].strip()

                technologies = [
                    tech.strip()
                    for tech in row["technologies"].split(";")
                    if tech.strip()
                ]

                published = row["statut"].strip().upper() == "OK"

                project, was_created = Project.objects.update_or_create(
                    slug=slugify(title),
                    defaults={
                        "title": title,
                        "short_description": row["description"][:320],
                        "description": row["description"].strip(),
                        "image_url": row["image"].strip(),
                        "technologies": technologies,
                        "github_url": row["code"].strip(),
                        "demo_url": row["lien"].strip(),
                        "featured": False,
                        "published": published,
                    },
                )

                if was_created:
                    created += 1
                else:
                    updated += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Import terminé : {created} créés, {updated} mis à jour."
            )
        )