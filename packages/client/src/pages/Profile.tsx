import Avatar from '@/components/ui/Avatar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useUserContext from '@/hooks/useUserContext';

export default function Profile() {
  const { user, isLoading } = useUserContext();

  return (
    <section className="h-full px-4 md:px-8 lg:px-16">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        user && (
          <>
            <h1 className="mb-4 mt-5 text-3xl lg:mt-10">Profile</h1>
            <div className="mb-2 flex items-center gap-2">
              <Avatar name={user.name} />
              <p>{user.name}</p>
            </div>
            <p className="mb-1">{user.email}</p>
            <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
          </>
        )
      )}
    </section>
  );
}
