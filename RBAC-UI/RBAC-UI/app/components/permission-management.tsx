import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function PermissionManagement({ permissions, setPermissions, roles, setRoles }) {
  const [newPermission, setNewPermission] = useState('')

  const addPermission = () => {
    if (newPermission && !permissions.includes(newPermission)) {
      setPermissions([...permissions, newPermission])
      setNewPermission('')
    }
  }

  const deletePermission = (permission) => {
    setPermissions(permissions.filter(p => p !== permission))
    // Remove the permission from all roles
    setRoles(roles.map(role => ({
      ...role,
      permissions: role.permissions.filter(p => p !== permission)
    })))
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Permission Management</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Permission</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions.map(permission => (
            <TableRow key={permission}>
              <TableCell>{permission}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => deletePermission(permission)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Input
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
          placeholder="New Permission"
        />
        <Button onClick={addPermission}>Add Permission</Button>
      </div>
    </div>
  )
}

