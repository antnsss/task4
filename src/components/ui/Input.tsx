export default function Input({ value, onChange, placeholder }: any) {
return (
<input
value={value}
onChange={(e) => onChange(e.target.value)}
placeholder={placeholder}
className="border rounded px-3 py-2 w-full"
/>
)
}