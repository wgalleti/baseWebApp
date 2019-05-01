from django.contrib.auth.models import User
from rest_auth.models import TokenModel
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    groups = serializers.SerializerMethodField()
    permissions = serializers.SerializerMethodField()

    def get_groups(self, user: User):
        if hasattr(user, 'groups'):
            return user.groups.all().values_list('name', flat=True)
        return []

    def get_permissions(self, user: User):
        if hasattr(user, 'user_permissions'):
            return user.user_permissions.all().values_list('name', flat=True)
        return []

    class Meta:
        model = User
        fields = ('username', 'email', 'is_superuser', 'is_active', 'groups', 'permissions',)


class TokenSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    token = serializers.SerializerMethodField()

    def get_token(self, token: TokenModel):
        return token.key

    def get_user(self, token: TokenModel):
        return UserSerializer(token.user).data

    class Meta:
        model = TokenModel
        fields = ('token', 'user',)
