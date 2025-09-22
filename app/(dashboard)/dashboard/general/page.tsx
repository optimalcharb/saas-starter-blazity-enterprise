"use client"

import { Loader2 } from "lucide-react"
import { Suspense, useActionState } from "react"
import useSWR, { BareFetcher } from "swr"
import { updateAccount } from "@/app/(login)/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "@/lib/db/schema"

const fetcher: BareFetcher<User> = async (url: string): Promise<User> => {
  const res = await fetch(url)
  const data = await res.json()
  return data as User
}

type ActionState = {
  name?: string
  error?: string
  success?: string
}

type AccountFormProps = {
  state: ActionState
  nameValue?: string
  emailValue?: string
}

function AccountForm({ state, nameValue = "", emailValue = "" }: AccountFormProps) {
  return (
    <>
      <div>
        <Label htmlFor="name" className="mb-2">
          Name
        </Label>
        <Input id="name" name="name" placeholder="Enter your name" defaultValue={state.name || nameValue} required />
      </div>
      <div>
        <Label htmlFor="email" className="mb-2">
          Email
        </Label>
        <Input id="email" name="email" type="email" placeholder="Enter your email" defaultValue={emailValue} required />
      </div>
    </>
  )
}

function AccountFormWithData({ state }: { state: ActionState }) {
  const { data: user } = useSWR<User>("/api/user", fetcher)
  return <AccountForm state={state} nameValue={user?.name ?? ""} emailValue={user?.email ?? ""} />
}

export default function GeneralPage() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(updateAccount, {})

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="mb-6 text-lg font-medium text-gray-900 lg:text-2xl">General Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action={formAction}>
            <Suspense fallback={<AccountForm state={state} />}>
              <AccountFormWithData state={state} />
            </Suspense>
            {state.error && <p className="text-sm text-red-500">{state.error}</p>}
            {state.success && <p className="text-sm text-green-500">{state.success}</p>}
            <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
