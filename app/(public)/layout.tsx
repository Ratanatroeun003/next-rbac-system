import Footer from '@/shared/components/Footer';
import Header from '@/shared/components/Header';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      {children}
      <Footer />
    </section>
  );
}
