import Footer from '@/components/Footer';
import { useNavigate } from 'react-router';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero h-full bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Organize. Collaborate. Succeed.</h1>
            <p className="py-6">
              Discover a seamless way to organize your tasks, collaborate with your team, and bring
              your projects to life.
            </p>
            <button className="btn btn-primary" onClick={() => void navigate('/workspaces')}>
              Go to Workspaces
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
