import { render } from "@solidjs/testing-library"
import userEvent from "@testing-library/user-event"
import { describe, expect, test, vi } from "vitest"

import { Button } from "./button"

const user = userEvent.setup()

describe(Button.name, () => {
  test("onClick should be called", async () => {
    const onClick = vi.fn()
    const { findByRole } = render(() => <Button onClick={onClick} />)
    const button = await findByRole("button")

    await user.click(button)

    expect(onClick).toHaveBeenCalled()
  })
})
