import { useAuthStore } from "../../store/useAuthStore";


const AccountInfo = () => {
  const { authUser} = useAuthStore();
  const formattedDate = authUser?.createdAt && !isNaN(new Date(authUser.createdAt).getTime())
  ? new Date(authUser.createdAt).toISOString().split("T")[0]
  : "N/A"; // Default value if the date is invalid or not provided
  return (
    <div className=" bg-base-300 rounded-xl py-6">
    <h2 className="text-lg font-medium  mb-4">Account Information</h2>
    <div className="space-y-3 text-sm">
      <div className="flex items-center justify-between py-2 border-b border-zinc-700">
        <span>Member Since</span>
        <span>{formattedDate}</span>
        </div>
      <div className="flex items-center justify-between py-2">
        <span>Account Status</span>
        <span className="text-green-500">Active</span>
      </div>
    </div>
  </div>
  )
}

export default AccountInfo