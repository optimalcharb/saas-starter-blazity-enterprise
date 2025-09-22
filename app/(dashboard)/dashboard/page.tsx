"use client"

import { Loader2, PlusCircle } from "lucide-react"
import { Suspense, useActionState } from "react"
import useSWR, { BareFetcher } from "swr"
import { inviteTeamMember, removeTeamMember } from "@/app/(login)/actions"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { TeamDataWithMembers, User } from "@/lib/db/schema"
import { customerPortalAction } from "@/lib/payments/actions"

type ActionState = {
  error?: string
  success?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetcher: BareFetcher<any> = async (url: string) => {
  const res = await fetch(url)
  return res.json()
}

function SubscriptionSkeleton() {
  return (
    <Card className="mb-8 h-[140px]">
      <CardHeader>
        <CardTitle>Team Subscription</CardTitle>
      </CardHeader>
    </Card>
  )
}

function ManageSubscription() {
  const { data: teamData } = useSWR<TeamDataWithMembers>("/api/team", fetcher)

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Team Subscription</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <div className="mb-4 sm:mb-0">
              <p className="font-medium">Current Plan: {teamData?.planName || "Free"}</p>
              <p className="text-muted-foreground text-sm">
                {teamData?.subscriptionStatus === "active"
                  ? "Billed monthly"
                  : teamData?.subscriptionStatus === "trialing"
                  ? "Trial period"
                  : "No active subscription"}
              </p>
            </div>
            <form action={customerPortalAction}>
              <Button type="submit" variant="outline">
                Manage Subscription
              </Button>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TeamMembersSkeleton() {
  return (
    <Card className="mb-8 h-[140px]">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-1 animate-pulse space-y-4">
          <div className="flex items-center space-x-4">
            <div className="size-8 rounded-full bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-4 w-32 rounded bg-gray-200"></div>
              <div className="h-3 w-14 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TeamMembers() {
  const { data: teamData } = useSWR<TeamDataWithMembers>("/api/team", fetcher)
  const [removeState, removeAction, isRemovePending] = useActionState<ActionState, FormData>(removeTeamMember, {})

  const getUserDisplayName = (user: Pick<User, "id" | "name" | "email">) => {
    return user.name || user.email || "Unknown User"
  }

  if (!teamData?.teamMembers?.length) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No team members yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {teamData.teamMembers.map((member, index) => (
            <li key={member.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  {/* 
                    This app doesn't save profile images, but here
                    is how you'd show them:

                    <AvatarImage
                      src={member.user.image || ''}
                      alt={getUserDisplayName(member.user)}
                    />
                  */}
                  <AvatarFallback>
                    {getUserDisplayName(member.user)
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{getUserDisplayName(member.user)}</p>
                  <p className="text-muted-foreground text-sm capitalize">{member.role}</p>
                </div>
              </div>
              {index > 1 ? (
                <form action={removeAction}>
                  <input type="hidden" name="memberId" value={member.id} />
                  <Button type="submit" variant="outline" size="sm" disabled={isRemovePending}>
                    {isRemovePending ? "Removing..." : "Remove"}
                  </Button>
                </form>
              ) : null}
            </li>
          ))}
        </ul>
        {removeState?.error && <p className="mt-4 text-red-500">{removeState.error}</p>}
      </CardContent>
    </Card>
  )
}

function InviteTeamMemberSkeleton() {
  return (
    <Card className="h-[260px]">
      <CardHeader>
        <CardTitle>Invite Team Member</CardTitle>
      </CardHeader>
    </Card>
  )
}

function InviteTeamMember() {
  const { data: user } = useSWR<User>("/api/user", fetcher)
  const isOwner = user?.role === "owner"
  const [inviteState, inviteAction, isInvitePending] = useActionState<ActionState, FormData>(inviteTeamMember, {})

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite Team Member</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={inviteAction} className="space-y-4">
          <div>
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <Input id="email" name="email" type="email" placeholder="Enter email" required disabled={!isOwner} />
          </div>
          <div>
            <Label>Role</Label>
            <RadioGroup defaultValue="member" name="role" className="flex space-x-4" disabled={!isOwner}>
              <div className="mt-2 flex items-center space-x-2">
                <RadioGroupItem value="member" id="member" />
                <Label htmlFor="member">Member</Label>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <RadioGroupItem value="owner" id="owner" />
                <Label htmlFor="owner">Owner</Label>
              </div>
            </RadioGroup>
          </div>
          {inviteState?.error && <p className="text-red-500">{inviteState.error}</p>}
          {inviteState?.success && <p className="text-green-500">{inviteState.success}</p>}
          <Button
            type="submit"
            className="bg-orange-500 text-white hover:bg-orange-600"
            disabled={isInvitePending || !isOwner}
          >
            {isInvitePending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Inviting...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Invite Member
              </>
            )}
          </Button>
        </form>
      </CardContent>
      {!isOwner && (
        <CardFooter>
          <p className="text-muted-foreground text-sm">You must be a team owner to invite new members.</p>
        </CardFooter>
      )}
    </Card>
  )
}

export default function SettingsPage() {
  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="mb-6 text-lg font-medium lg:text-2xl">Team Settings</h1>
      <Suspense fallback={<SubscriptionSkeleton />}>
        <ManageSubscription />
      </Suspense>
      <Suspense fallback={<TeamMembersSkeleton />}>
        <TeamMembers />
      </Suspense>
      <Suspense fallback={<InviteTeamMemberSkeleton />}>
        <InviteTeamMember />
      </Suspense>
    </section>
  )
}
