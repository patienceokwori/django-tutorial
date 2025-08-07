from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from .serializers import UserSerializer, NoteSerializer


class NoteListCreate(generics.ListCreateAPIView):
    """
    Handles listing all notes of the authenticated user and creating a new note.
    """
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return only the notes created by the logged-in user
        return Note.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        # Save the note with the current user as the author
        serializer.save(author=self.request.user)


class NoteDelete(generics.DestroyAPIView):
    """
    Handles deleting a note owned by the authenticated user.
    """
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only allow deletion of notes owned by the user
        return Note.objects.filter(author=self.request.user)


class CreateUserView(generics.CreateAPIView):
    """
    Allows anyone to create a new user account.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
