import csv
import re
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError

from content.models import Project, ProjectTranslation


def clean_description(text):
    return re.sub(r"(?<=[a-zà-ÿ\)])\.(?=[A-ZÀ-Ý])", ". ", text.strip())


def make_short_description(text, limit=320):
    first = re.split(r"(?<=\.)\s", text, maxsplit=1)[0]
    if len(first) <= limit:
        return first
    return first[: limit - 1].rsplit(" ", 1)[0] + "…"


class Command(BaseCommand):
    help = "Importe les projets depuis un fichier CSV."

    def add_arguments(self, parser):
        parser.add_argument("csv_path")
        parser.add_argument("--featured", type=int, default=0)

    def handle(self, *args, **options):
        path = Path(options["csv_path"])
        if not path.exists():
            raise CommandError(f"Fichier introuvable : {path}")

        created = updated = 0
        with path.open(newline="", encoding="utf-8-sig") as f:
            for order, row in enumerate(csv.DictReader(f)):
                title = row["titre"].strip()
                description = clean_description(row["description"])
                short = make_short_description(description)
                technologies = [t.strip() for t in row["technologies"].split(";") if t.strip()]

                project, was_created = Project.objects.update_or_create(
                    title=title,
                    defaults={
                        "short_description": short,
                        "description": description,
                        "image_url": row["image"].strip(),
                        "technologies": technologies,
                        "github_url": row["code"].strip(),
                        "demo_url": row["lien"].strip(),
                        "published": row["statut"].strip().upper() == "OK",
                        "featured": order < options["featured"],
                        "order": order,
                    },
                )
                ProjectTranslation.objects.update_or_create(
                    project=project,
                    language="fr",
                    defaults={
                        "title": title,
                        "short_description": short,
                        "description": description,
                    },
                )
                created += was_created
                updated += not was_created
                self.stdout.write(f"  {'+' if was_created else '~'} {project.title}")

        self.stdout.write(self.style.SUCCESS(f"Terminé : {created} créé(s), {updated} mis à jour."))
