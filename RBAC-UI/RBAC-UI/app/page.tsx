'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagement } from './components/user-management'
import { RoleManagement } from './components/role-management'
import { PermissionManagement } from './components/permission-management'

export default function RBACDashboard() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
  ])

  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete'] },
    { id: 2, name: 'Editor', permissions: ['read', 'write'] },
    { id: 3, name: 'Viewer', permissions: ['read'] },
  ])

  const [permissions, setPermissions] = useState(['read', 'write', 'delete'])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">RBAC Dashboard</h1>
      <Tabs defaultValue="users">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserManagement users={users} setUsers={setUsers} roles={roles} />
        </TabsContent>
        <TabsContent value="roles">
          <RoleManagement roles={roles} setRoles={setRoles} permissions={permissions} />
        </TabsContent>
        <TabsContent value="permissions">
          <PermissionManagement permissions={permissions} setPermissions={setPermissions} roles={roles} setRoles={setRoles} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

