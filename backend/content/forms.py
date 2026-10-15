from django import forms

from .models import Post, Project


ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}
MAX_IMAGE_SIZE = 5 * 1024 * 1024


def validate_image(uploaded_file):
    if uploaded_file.size > MAX_IMAGE_SIZE:
        raise forms.ValidationError("L'image ne doit pas dépasser 5 Mo.")
    if uploaded_file.content_type not in ALLOWED_IMAGE_TYPES:
        raise forms.ValidationError("Formats acceptés : JPEG, PNG, WebP et GIF.")


class ProjectAdminForm(forms.ModelForm):
    image_upload = forms.FileField(
        required=False,
        validators=[validate_image],
        label="Image",
        help_text="L'image sera enregistrée directement dans Neon (maximum 5 Mo).",
    )

    class Meta:
        model = Project
        fields = "__all__"

    def save(self, commit=True):
        instance = super().save(commit=False)
        uploaded_file = self.cleaned_data.get("image_upload")
        if uploaded_file:
            instance.image_data = uploaded_file.read()
            instance.image_mime_type = uploaded_file.content_type
        if commit:
            instance.save()
            self.save_m2m()
        return instance


class PostAdminForm(forms.ModelForm):
    cover_image_upload = forms.FileField(
        required=False,
        validators=[validate_image],
        label="Image de couverture",
        help_text="L'image sera enregistrée directement dans Neon (maximum 5 Mo).",
    )

    class Meta:
        model = Post
        fields = "__all__"

    def save(self, commit=True):
        instance = super().save(commit=False)
        uploaded_file = self.cleaned_data.get("cover_image_upload")
        if uploaded_file:
            instance.cover_image_data = uploaded_file.read()
            instance.cover_image_mime_type = uploaded_file.content_type
        if commit:
            instance.save()
            self.save_m2m()
        return instance
