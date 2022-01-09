from django.db import models


class MongoDBRouter(object):
    def db_for_read(self, model: models.Model, **hints):
        using = None
        try:
            using = model.__getattribute__(model, 'using')
        except AttributeError:
            pass

        return using

    def db_for_write(self, model: models.Model, **hints):
        using = None
        try:
            using = model.__getattribute__(model, 'using')
        except AttributeError:
            pass

        return using

    def allow_relation(self, obj1, obj2, **hints):
        return True
