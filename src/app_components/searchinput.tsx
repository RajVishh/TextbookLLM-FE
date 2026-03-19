import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function InputInline({ onSend }: { onSend: (val: string) => void }) {
  const [val, setVal] = useState("");

  const handleSend = () => {
    if (val.trim()) {
      onSend(val);
      setVal("");
    }
  }

  return (
    <Field orientation="horizontal">
      <Input
        className="text-white border-1 bg-[#3A3A38] border-[#41413E] px-4"
        type="search"
        placeholder="Start asking..."
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSend();
        }}
      />
      <Button onClick={handleSend} className="bg-[#D97857] hover:bg-[#C06A48] cursor-pointer">Send</Button>
    </Field>
  )
}
