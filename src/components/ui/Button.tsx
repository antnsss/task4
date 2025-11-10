export default function Button({ children, onClick }: any) {
return (
<button onClick={onClick} className="px-4 py-2 rounded bg-blue-600 text-white hover:opacity-90">
{children}
</button>
)
}