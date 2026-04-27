'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, LogOut, Users, Search, X, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import type { User, UserRole } from '@prisma/client'
import UserRoleModal from '../modals/UserRoleModal'

interface Props {
  users: User[]
}

const ROLE_ORDER: UserRole[] = ['SUPER_USER', 'ADMIN', 'PATRON']

const ROLE_STYLES: Record<UserRole, string> = {
  SUPER_USER: 'text-primary-dark border-primary-dark/30 bg-primary-dark/10',
  ADMIN: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  PATRON: 'text-muted-dark border-border-dark bg-surface-dark'
}

type SortKey = 'name' | 'role' | 'createdAt' | 'email'
type SortDir = 'asc' | 'desc'

export default function UsersClient({ users }: Props) {
  const router = useRouter()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<UserRole | 'ALL'>('ALL')
  const [sortKey, setSortKey] = useState<SortKey>('createdAt')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const filtered = useMemo(() => {
    return users
      .filter((u) => {
        const matchesSearch = search ? `${u.firstName} ${u.email}`.toLowerCase().includes(search.toLowerCase()) : true
        const matchesRole = roleFilter === 'ALL' ? true : u.role === roleFilter
        return matchesSearch && matchesRole
      })
      .sort((a, b) => {
        let result = 0
        if (sortKey === 'name') {
          result = (a.firstName ?? '').localeCompare(b.firstName ?? '')
        } else if (sortKey === 'email') {
          result = (a.email ?? '').localeCompare(b.email ?? '')
        } else if (sortKey === 'role') {
          result = ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role)
        } else {
          result = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        }
        return sortDir === 'asc' ? result : -result
      })
  }, [users, search, roleFilter, sortKey, sortDir])

  const counts = useMemo(
    () => ({
      ALL: users.length,
      ADMIN: users.filter((u) => u.role === 'ADMIN').length,
      PATRON: users.filter((u) => u.role === 'PATRON').length
    }),
    [users]
  )

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return null
    return sortDir === 'asc' ? (
      <ChevronUp className="w-3 h-3 inline ml-1" />
    ) : (
      <ChevronDown className="w-3 h-3 inline ml-1" />
    )
  }

  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden bg-bg-dark text-text-dark">
        {/* ── Top Bar ── */}
        <div className="shrink-0 h-11 bg-surface-dark border-b border-border-dark flex items-center justify-between px-4 z-20">
          <div className="flex items-center gap-3">
            <Link
              href="/v2/dashboard"
              className="text-muted-dark hover:text-text-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
            <div className="w-px h-4 bg-border-dark" aria-hidden="true" />
            <Users className="w-3.5 h-3.5 text-primary-dark" aria-hidden="true" />
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">Users</span>
            <span className="text-[9px] font-mono text-muted-dark/40">({users.length})</span>
          </div>
          <button
            type="button"
            onClick={() => signOut({ redirectTo: '/auth/login' })}
            className="text-muted-dark hover:text-red-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
            aria-label="Sign out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ── Filters ── */}
        <div className="shrink-0 border-b border-border-dark bg-surface-dark">
          {/* Search */}
          <div className="px-4 py-2.5 border-b border-border-dark">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-dark/40 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full pl-9 pr-8 py-2 bg-bg-dark border border-border-dark text-text-dark text-sm placeholder:text-muted-dark/30 focus:outline-none focus:border-primary-dark transition-colors"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-dark/40 hover:text-text-dark transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Role filter tabs */}
          <div className="flex overflow-x-auto">
            {(['ALL', 'ADMIN', 'PATRON'] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setRoleFilter(role)}
                className={`flex items-center gap-2 px-4 py-2.5 text-[9px] font-mono tracking-[0.15em] uppercase whitespace-nowrap border-r border-border-dark transition-colors focus-visible:outline-none ${
                  roleFilter === role
                    ? 'bg-primary-dark/10 text-primary-dark border-b-2 border-b-primary-dark'
                    : 'text-muted-dark hover:text-text-dark hover:bg-button-dark'
                }`}
              >
                {role}
                <span className="text-[8px] opacity-60">({counts[role]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Table ── */}
        <div className="flex-1 overflow-y-auto">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-4 px-4 py-2.5 border-b border-border-dark bg-bg-dark sticky top-0 z-10">
            {[
              { label: 'Name', key: 'name' as SortKey },
              { label: 'Email', key: 'email' as SortKey },
              { label: 'Role', key: 'role' as SortKey },
              { label: 'Joined', key: 'createdAt' as SortKey }
            ].map(({ label, key }) => (
              <button
                key={label}
                type="button"
                onClick={() => key && handleSort(key)}
                disabled={!key}
                className={`text-[9px] font-mono tracking-[0.2em] uppercase text-left transition-colors focus-visible:outline-none ${
                  key ? 'text-muted-dark hover:text-text-dark cursor-pointer' : 'text-muted-dark/40 cursor-default'
                } ${sortKey === key ? 'text-text-dark' : ''}`}
              >
                {label}
                {key && <SortIcon k={key} />}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-2">
              <Users className="w-8 h-8 text-border-dark" aria-hidden="true" />
              <p className="text-muted-dark text-sm">No users found.</p>
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="text-[10px] font-mono text-primary-dark hover:text-secondary-dark transition-colors"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            filtered.map((user, i) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className="grid grid-cols-[1fr_1fr_auto_auto] gap-4 items-center px-4 py-3 border-b border-border-dark/40 last:border-0 hover:bg-surface-dark transition-colors cursor-pointer group"
                onClick={() => setSelectedUser(user)}
              >
                {/* Name */}
                <div className="min-w-0">
                  <p className="text-text-dark text-sm font-medium truncate group-hover:text-primary-dark transition-colors">
                    {user.firstName ?? '—'}
                  </p>
                </div>

                {/* Email */}
                <p className="text-muted-dark text-xs truncate">{user.email}</p>

                {/* Role */}
                <span
                  className={`text-[9px] font-mono tracking-widest uppercase px-2 py-1 border w-fit ${ROLE_STYLES[user.role]}`}
                >
                  {user.role}
                </span>

                {/* Joined */}
                <p className="text-muted-dark text-[9px] font-mono whitespace-nowrap">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </motion.div>
            ))
          )}
        </div>

        {/* ── Footer ── */}
        <div className="shrink-0 border-t border-border-dark px-4 py-2.5 bg-surface-dark flex items-center justify-between">
          <p className="text-[9px] font-mono text-muted-dark">
            Showing {filtered.length} of {users.length} users
          </p>
          <div className="flex items-center gap-3">
            {(['ADMIN', 'PATRON'] as UserRole[]).map(
              (role) =>
                counts[role] > 0 && (
                  <div key={role} className="flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        role === 'SUPER_USER'
                          ? 'bg-primary-dark'
                          : role === 'ADMIN'
                            ? 'bg-emerald-400'
                            : 'bg-muted-dark'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="text-[9px] font-mono text-muted-dark uppercase">
                      {counts[role]} {role.toLowerCase()}
                    </span>
                  </div>
                )
            )}
          </div>
        </div>
      </div>

      <UserRoleModal
        key={selectedUser?.id}
        user={selectedUser}
        onClose={() => {
          setSelectedUser(null)
          router.refresh()
        }}
      />
    </>
  )
}
