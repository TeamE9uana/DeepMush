from django.db import models
import os

IS_TEST = os.environ.get('IS_TEST')
class MongoDBRouter(object):
    def db_for_read(self, model: models.Model, **hints):
        if IS_TEST:
            return None

        using = None

        try:
            using = model.__getattribute__(model, 'using')
        except AttributeError:
            pass

        return using

    def db_for_write(self, model: models.Model, **hints):
        if IS_TEST:
            return None

        using = None
        try:
            using = model.__getattribute__(model, 'using')
        except AttributeError:
            pass

        return using

    def allow_relation(self, obj1, obj2, **hints):
        return True
