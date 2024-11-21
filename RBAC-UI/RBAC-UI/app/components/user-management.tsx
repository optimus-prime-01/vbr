import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function UserManagement({ users, setUsers, roles }) {
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '', status: 'Active' })
  const [editingUser, setEditingUser] = useState(null)

  const addUser = () => {
    setUsers([...users, { ...newUser, id: users.length + 1 }])
    setNewUser({ name: '', email: '', role: '', status: 'Active' })
  }

  const updateUser = () => {
    setUsers(users.map(user => user.id === editingUser.id ? editingUser : user))
    setEditingUser(null)
  }

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2" onClick={() => setEditingUser(user)}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit User</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input
                        value={editingUser?.name || ''}
                        onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                        placeholder="Name"
                      />
                      <Input
                        value={editingUser?.email || ''}
                        onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                        placeholder="Email"
                      />
                      <Select
                        value={editingUser?.role || ''}
                        onValueChange={(value) => setEditingUser({...editingUser, role: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map(role => (
                            <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={editingUser?.status || ''}
                        onValueChange={(value) => setEditingUser({...editingUser, status: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={updateUser}>Save Changes</Button>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => deleteUser(user.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 grid grid-cols-5 gap-4">
        <Input
          value={newUser.name}
          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
          placeholder="Name"
        />
        <Input
          value={newUser.email}
          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
          placeholder="Email"
        />
        <Select
          value={newUser.role}
          onValueChange={(value) => setNewUser({...newUser, role: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map(role => (
              <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={newUser.status}
          onValueChange={(value) => setNewUser({...newUser, status: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addUser}>Add User</Button>
      </div>
    </div>
  )
}

