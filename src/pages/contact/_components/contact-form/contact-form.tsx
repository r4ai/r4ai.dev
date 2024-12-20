import {
  createForm,
  reset,
  type SubmitHandler,
  valiForm,
} from "@modular-forms/solid"
import { toast } from "solid-sonner"
import * as v from "valibot"

import {
  TextArea,
  TextField,
  TextFieldErrorMessage,
  TextFieldLabel,
  TextFieldRoot,
} from "@/components/ui"

import { SubmitButton } from "../submit-button"

type ResponseSchema = {
  status: number
  message: string
}

const ContactFormSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Please enter your name")),
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email"),
    v.email("Please enter a valid email")
  ),
  title: v.pipe(v.string(), v.nonEmpty("Please enter a title")),
  message: v.pipe(v.string(), v.nonEmpty("Please enter a message")),
})

type ContactForm = v.InferInput<typeof ContactFormSchema>

const openEmail = (values: ContactForm) => {
  const url = `mailto:r4ai.dev@gmail.com?subject=${encodeURIComponent(values.title)}&body=${encodeURIComponent(values.message)}`
  location.href = url
}

export const ContactForm = () => {
  const [contactForm, { Form, Field }] = createForm<ContactForm>({
    validate: valiForm(ContactFormSchema),
  })

  const handleSubmit: SubmitHandler<ContactForm> = async (values) => {
    try {
      const response = await fetch("https://api.r4ai.dev/sendmail", {
        method: "POST",
        body: JSON.stringify(values),
        mode: "cors",
      })
      const body: ResponseSchema = await response.json()
      if (response.ok) {
        toast.success("メッセージを送信しました！", {
          description: new Date().toLocaleString(),
          action: {
            label: "OK",
            onClick: () => {},
          },
        })
        reset(contactForm)
      } else {
        toast.error("メッセージの送信に失敗しました", {
          description: `${body.status} ${body.message}`,
          action: {
            label: "Emailでお問い合わせ",
            onClick: () => openEmail(values),
          },
          duration: Infinity,
        })
      }
    } catch (e) {
      toast.error("メッセージの送信に失敗しました", {
        description: `通信エラーが発生しました：${String(e)}`,
        action: {
          label: "Emailでお問い合せ",
          onClick: () => openEmail(values),
        },
      })
    }
  }

  return (
    <Form class="space-y-6" onSubmit={handleSubmit}>
      <Field name="name">
        {(field, props) => (
          <TextFieldRoot validationState={field.error ? "invalid" : "valid"}>
            <TextFieldLabel>Name</TextFieldLabel>
            <TextField
              {...props}
              type="text"
              autocomplete="name"
              placeholder="山田 太郎"
              required
            />
            <TextFieldErrorMessage>{field.error}</TextFieldErrorMessage>
          </TextFieldRoot>
        )}
      </Field>
      <Field name="email">
        {(field, props) => (
          <TextFieldRoot validationState={field.error ? "invalid" : "valid"}>
            <TextFieldLabel>Email</TextFieldLabel>
            <TextField
              {...props}
              type="email"
              autocomplete="email"
              placeholder="hello@example.com"
              required
            />
            <TextFieldErrorMessage>{field.error}</TextFieldErrorMessage>
          </TextFieldRoot>
        )}
      </Field>
      <Field name="title">
        {(field, props) => (
          <TextFieldRoot validationState={field.error ? "invalid" : "valid"}>
            <TextFieldLabel>Title</TextFieldLabel>
            <TextField {...props} type="text" placeholder="件名" required />
            <TextFieldErrorMessage>{field.error}</TextFieldErrorMessage>
          </TextFieldRoot>
        )}
      </Field>
      <Field name="message">
        {(field, props) => (
          <TextFieldRoot validationState={field.error ? "invalid" : "valid"}>
            <TextFieldLabel>Message</TextFieldLabel>
            <TextArea {...props} placeholder="本文" required />
            <TextFieldErrorMessage>{field.error}</TextFieldErrorMessage>
          </TextFieldRoot>
        )}
      </Field>
      <SubmitButton submitting={contactForm.submitting} />
    </Form>
  )
}
