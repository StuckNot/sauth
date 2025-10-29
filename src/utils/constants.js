// IMPORTANT: Always use consistent casing in enum objects
// Mixed casing (Support vs ADMIN) makes the codebase inconsistent and error-prone
export const UserRolesEnum = {
    ADMIN: "admin",
    USER: "user",
    SUPPORT: "support"  // Fixed: Changed from Support to SUPPORT for consistency
}

export const AvailableUserRoles = Object.values(UserRolesEnum);
export const TaskStatusEnum = {
    PENDING: "pending",
    IN_PROGRESS: "in_progress",
    COMPLETED: "completed",
    FAILED: "failed"    
}

export const AvailableTaskStatus = Object.values(TaskStatusEnum);