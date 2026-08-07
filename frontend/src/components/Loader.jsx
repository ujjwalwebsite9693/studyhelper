export default function Loader({ full }) {
  return (
    <div className={full ? 'min-h-screen flex items-center justify-center bg-ink-950' : 'flex items-center justify-center py-16'}>
      <div className="h-10 w-10 rounded-full border-2 border-brand-500/30 border-t-brand-400 animate-spin" />
    </div>
  );
}
