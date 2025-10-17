export const UserService = {
    hasUserPermission: (userId, user) => {
        return userId === user.id || user.role === 'ADMIN';
    },
    hasAdminPermission: (user) => {
        return user.role === 'ADMIN';
    }
}