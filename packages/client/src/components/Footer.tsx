export default function Footer() {
  return (
    <footer className="footer footer-center bg-base-300 p-4 text-base-content">
      <aside>
        <p data-testid="footer-text">
          Copyright © {new Date().getFullYear()} - All right reserved by TaskFlow
        </p>
      </aside>
    </footer>
  );
}
