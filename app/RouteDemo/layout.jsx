export default function RouteDemoLayout({
    children,
}) {
    return (
        <section>
            <div>Sub Header</div>
            {children}
        </section>
    )
}