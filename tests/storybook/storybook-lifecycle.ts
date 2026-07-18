interface StoryFinishedPayload {
  storyId: string
  status: "error" | "success"
}

interface StorybookChannel {
  off(event: string, handler: (payload: StoryFinishedPayload) => void): void
  on(event: string, handler: (payload: StoryFinishedPayload) => void): void
}

interface StorybookWindow extends Window {
  __STORYBOOK_ADDONS_CHANNEL__?: StorybookChannel
  __VRT_STORYBOOK_LIFECYCLE__?: Promise<void>
}

export const installStorybookLifecycleObserver = () => {
  const storybookWindow = window as StorybookWindow
  const storyId = new URLSearchParams(storybookWindow.location.search).get("id")

  if (!storyId) {
    return
  }

  storybookWindow.__VRT_STORYBOOK_LIFECYCLE__ = new Promise<void>(
    (resolve, reject) => {
      const connect = () => {
        const channel = storybookWindow.__STORYBOOK_ADDONS_CHANNEL__

        if (!channel) {
          setTimeout(connect, 0)
          return
        }

        const onFinished = (payload: StoryFinishedPayload) => {
          if (payload.storyId !== storyId) {
            return
          }

          channel.off("storyFinished", onFinished)

          if (payload.status === "success") {
            resolve()
          } else {
            reject(new Error(`Storybook failed to render ${storyId}`))
          }
        }

        channel.on("storyFinished", onFinished)
      }

      connect()
    }
  )
}

export const waitForStorybookLifecycle = async (): Promise<void> => {
  const lifecycle = (window as StorybookWindow).__VRT_STORYBOOK_LIFECYCLE__

  if (!lifecycle) {
    throw new Error("Storybook lifecycle observer is not installed")
  }

  await lifecycle
}
