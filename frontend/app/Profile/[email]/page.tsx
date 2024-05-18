// Email.tsx (assuming it's in the pages folder)
import Profile from "@/app/components/Profile";


export default function Email({ params }: { params: { email: string } }) {
  return (
    <div>
      <Profile email={params.email} />
    </div>
  );
}
