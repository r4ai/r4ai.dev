import type { FC } from "react"
import { Tweet, TweetNotFound } from "react-tweet"

type TwitterUrl = {
  userName?: string
  feature?: string
  id?: string
}

const parseTwitterUrl = (url: URL): TwitterUrl => {
  const pathname = url.pathname
  const parts = pathname.split("/")
  const userName = parts[1]
  const feature = parts[2]
  const id = parts[3]
  return { userName, feature, id }
}

export const getTweetId = (url: URL): string | undefined => {
  const { feature, id } = parseTwitterUrl(url)
  if (feature === "status") {
    return id
  }
  return undefined
}

type TwitterProps = {
  url: URL
}

export const Twitter: FC<TwitterProps> = ({ url }) => {
  const tweetId = getTweetId(url)
  if (tweetId) {
    return (
      <Tweet
        id={tweetId}
        components={{
          AvatarImg: (props) => (
            <img {...props} className="my-0 rounded-full" />
          ),
        }}
      />
    )
  }
  return <TweetNotFound />
}
