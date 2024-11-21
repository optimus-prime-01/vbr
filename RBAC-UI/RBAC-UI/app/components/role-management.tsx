import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function RoleManagement({ roles, setRoles, permissions }) {
  const [newRole, setNewRole] = useState({ name: '', permissions: [] })
  const [editingRole, setEditingRole] = useState(null)

  const addRole = () => {
    setRoles([...roles, { ...newRole, id: roles.length + 1 }])
    setNewRole({ name: '', permissions: [] })
  }

  const updateRole = () => {
    setRoles(roles.map(role => role.id === editingRole.id ? editingRole : role))
    setEditingRole(null)
  }

  const deleteRole = (id) => {
    setRoles(roles.filter(role => role.id !== id))
  }

  const togglePermission = (role, permission) => {
    const updatedPermissions = role.permissions.includes(permission)
      ? role.permissions.filter(p => p !== permission)
      : [...role.permissions, permission]
    return { ...role, permissions: updatedPermissions }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Role Management</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role Name</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map(role => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.permissions.join(', ')}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2" onClick={() => setEditingRole(role)}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Role</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input
                        value={editingRole?.name || ''}
                        onChange={(e) => setEditingRole({...editingRole, name: e.target.value})}
                        placeholder="Role Name"
                      />
                      <div>
                        <h3 className="mb-2 font-semibold">Permissions:</h3>
                        {permissions.map(permission => (
                          <div key={permission} className="flex items-center space-x-2">
                            <Checkbox
                              id={`edit-${permission}`}
                              checked={editingRole?.permissions.includes(permission)}
                              onCheckedChange={() => setEditingRole(togglePermission(editingRole, permission))}
                            />
                            <label htmlFor={`edit-${permission}`}>{permission}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button onClick={updateRole}>Save Changes</Button>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => deleteRole(role.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Input
          value={newRole.name}
          onChange={(e) => setNewRole({...newRole, name: e.target.value})}
          placeholder="New Role Name"
        />
        <div>
          <h3 className="mb-2 font-semibold">Permissions:</h3>
          {permissions.map(permission => (
            <div key={permission} className="flex items-center space-x-2">
              <Checkbox
                id={`new-${permission}`}
                checked={newRole.permissions.includes(permission)}
                onCheckedChange={() => setNewRole(togglePermission(newRole, permission))}
              />
              <label htmlFor={`new-${permission}`}>{permission}</label>
            </div>
          ))}
        </div>
        <Button onClick={addRole} className="col-span-2">Add Role</Button>
      </div>
    </div>
  )
}

