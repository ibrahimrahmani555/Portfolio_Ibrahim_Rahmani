from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ApiRootView, CategoryViewSet, PostImageView, PostViewSet, ProjectImageView, ProjectViewSet

router = DefaultRouter()
router.register("projects", ProjectViewSet, basename="project")
router.register("posts", PostViewSet, basename="post")
router.register("categories", CategoryViewSet, basename="category")

urlpatterns = [
    path("", ApiRootView.as_view(), name="api-root"),
    path("projects/<slug:slug>/image/", ProjectImageView.as_view(), name="project-image"),
    path("posts/<slug:slug>/image/", PostImageView.as_view(), name="post-image"),
    path("", include(router.urls)),
]
