type StubPageProps = {
  title?: string;
};

export function StubPage({ title = 'Страница' }: StubPageProps) {
  return (
    <div className="page-stub">
      <h1>{title}</h1>
      <p>Страница в разработке.</p>
    </div>
  );
}
