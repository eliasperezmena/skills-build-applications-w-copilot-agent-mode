from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.db import transaction
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Limpiar colecciones con pymongo
        client = MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']
        db['activities'].delete_many({})
        db['workouts'].delete_many({})
        db['leaderboard'].delete_many({})
        db['users'].delete_many({})
        db['teams'].delete_many({})

        with transaction.atomic():
            # Crear equipos
            marvel = Team.objects.create(name='Marvel')
            dc = Team.objects.create(name='DC')

            # Crear usuarios
            spiderman = User.objects.create(name='Spiderman', email='spiderman@marvel.com', team=marvel)
            ironman = User.objects.create(name='Ironman', email='ironman@marvel.com', team=marvel)
            wonderwoman = User.objects.create(name='Wonder Woman', email='wonderwoman@dc.com', team=dc)
            batman = User.objects.create(name='Batman', email='batman@dc.com', team=dc)

            # Crear actividades
            Activity.objects.create(user=spiderman, type='run', duration=30, date='2025-10-01')
            Activity.objects.create(user=ironman, type='cycle', duration=45, date='2025-10-02')
            Activity.objects.create(user=wonderwoman, type='swim', duration=60, date='2025-10-03')
            Activity.objects.create(user=batman, type='run', duration=25, date='2025-10-04')

            # Crear workouts
            w1 = Workout.objects.create(name='Cardio Blast', description='Intenso cardio para todos')
            w2 = Workout.objects.create(name='Strength Training', description='Fuerza y resistencia')
            w1.suggested_for.add(marvel, dc)
            w2.suggested_for.add(marvel)

            # Crear leaderboard
            Leaderboard.objects.create(team=marvel, points=100)
            Leaderboard.objects.create(team=dc, points=80)

        self.stdout.write(self.style.SUCCESS('octofit_db poblada con datos de prueba'))
