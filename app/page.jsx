import Button from '@/components/Button';

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white font-bold px-4 text-3xl text-center md:text-4xl lg:text-7xl space-y-6">
      <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
        Question on React
      </p>

      <Button
        href="/login"
        text="Get Started"
        className="text-base md:text-lg"
      />
    </div>
  );
};

export default Home;
