import {
  AppScreen,
  BrandBoard,
  BrowserFrame,
  Dashboard,
  DocumentSheet,
  FeedScreen,
  LandingSite,
  ListingSite,
  PhoneFrame,
  Poster,
} from "./mocks";

/**
 * The complete mockup for a story, including its frame (browser window, phone
 * bezel or plain card). Used for cards and for panels that show a whole page.
 */
export function renderFrame(story, palette) {
  const { mock, url } = story;

  switch (mock.type) {
    case "website":
      return (
        <BrowserFrame url={url}>
          {mock.variant === "listing" ? (
            <ListingSite copy={mock.copy} />
          ) : (
            <LandingSite copy={mock.copy} />
          )}
        </BrowserFrame>
      );
    case "dashboard":
      return (
        <BrowserFrame url={url}>
          <Dashboard mock={mock} />
        </BrowserFrame>
      );
    case "phone":
      return (
        <PhoneFrame>
          <AppScreen copy={mock.copy} design={mock.variant === "design"} />
        </PhoneFrame>
      );
    case "feed":
      return (
        <PhoneFrame>
          <FeedScreen copy={mock.copy} />
        </PhoneFrame>
      );
    case "poster":
      return mock.variant === "brand" ? (
        <BrandBoard copy={mock.copy} palette={palette} />
      ) : (
        <Poster copy={mock.copy} />
      );
    case "document":
      return <DocumentSheet copy={mock.copy} />;
    default:
      return null;
  }
}

/**
 * Only the screen content, with no device frame. Used by the phone object,
 * which draws its own bezel.
 */
export function renderScreen(story) {
  const { mock } = story;

  if (mock.type === "phone") {
    return <AppScreen copy={mock.copy} design={mock.variant === "design"} />;
  }
  if (mock.type === "feed") {
    return <FeedScreen copy={mock.copy} />;
  }
  return renderFrame(story);
}
