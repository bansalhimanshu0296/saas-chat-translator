import { GeneratePortalLink } from "@/actions/GeneratePortalLink"

function ManageAccountButton() {
  return (
    <form action={GeneratePortalLink}>
        <button type="submit">Manage Billing</button>
    </form>
  )
}

export default ManageAccountButton