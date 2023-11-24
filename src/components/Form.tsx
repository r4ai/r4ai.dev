import { useState, type FC } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { useToast } from "./ui/use-toast"

const schema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  title: z.string().nonempty(),
  message: z.string().nonempty(),
})

type ResponseSchema = {
  status: number
  message: string
}

export const ContactForm: FC = () => {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      title: "",
      message: "",
    },
  })

  const [isSending, setIsSending] = useState(false)

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsSending(true)
    try {
      const response = await fetch("https://api.r4ai.dev/sendmail", {
        method: "POST",
        body: JSON.stringify(data),
        mode: "cors",
      })
      const body: ResponseSchema = await response.json()
      if (response.ok) {
        toast({
          title: "メッセージを送信しました。",
          description: "お問い合わせありがとうございます。",
          variant: "default",
        })
        form.reset()
      } else {
        toast({
          title: `${body.status} メッセージの送信に失敗しました。`,
          description: body.message,
          variant: "destructive",
        })
      }
    } catch (e) {
      toast({
        title: "メッセージの送信に失敗しました。",
        description: "通信エラーが発生しました。再度お試しください。",
        variant: "destructive",
      })
    }
    setIsSending(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>お名前</FormLabel>
              <FormControl>
                <Input placeholder="山田太郎" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input placeholder="hello@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>件名</FormLabel>
              <FormControl>
                <Input placeholder="件名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メッセージ</FormLabel>
              <FormControl>
                <Textarea placeholder="本文" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSending} className="w-full">
          {isSending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>送信中</span>
            </>
          ) : (
            <span>送信</span>
          )}
        </Button>
      </form>
    </Form>
  )
}
