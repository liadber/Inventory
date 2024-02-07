export default function AppSection({headerTitle, children}: { headerTitle: string, children?: any | null }) {
    return (
        <section>
            <h1>{headerTitle}</h1>
            {children}
        </section>
    );
}
