// Task 2: reusable container using props.children
export default function CardWrapper({ title, children }) {
  return (
    <section className="card">
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}
