export const TUTORIAL_MESSAGES = {
  SETUP_SESSION: [
    {
      messages: [
        "Signup today and host your online sessions, talks or events.",
        "To create your session, go to Create Session.",
        "Fill out session details, select schedule, price, preview and submit",
        "Share the session in social media.",
        "Stay connected to your followers.",
      ],
    },
    {
      url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    },
    {
      headerText: "How to create a session",
    },
    {
      mascotIcon: "/static/images/how_it_works_mascot.png",
    },
  ],
  SETUP_MEETING: [
    {
      messages: [
        "No back and forth emails or phone calls.",
        "Get your free personal appointment app integrated with zoom.",
        "Share your appointment link in social media.",
      ],
    },
    {
      url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    },
    {
      headerText: "Setting up meeting is just few clicks away!",
    },
    {
      mascotIcon: "/static/images/set_up_meeting_mascot.png",
    },
  ],

  SETUP_AVAILABILITY: [
    {
      messages: [
        "Don't forget to set your availability.",
        "To set, go to My Calendar, click on Availability Settings.",
        "Embed your link on your website or share in email signatures.",
      ],
    },
    {
      url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    },
    {
      headerText: "How to set availability in your calendar",
    },
    {
      mascotIcon: "/static/images/availability_mascot.png",
    },
  ],

  WATCH_VIDEO: "To know more watch this video.",
};
export const SESSION_REVIEW_MAX_STAR_COUNT=5
export const SHIM_MAX_TIMEOUT_IN_MILLIS=10000
export const LOGIN_POLICY_ACCEPTANCE=`By clicking “Sign in with Google” or “Sign up” or "Sign in", I
confirm I’ve read and agree to ${process.env.NEXT_PUBLIC_APP_NAME}'s
<a href='#' className='app__anchor'>Terms of Use</a>, Privacy Policy.`

export const REGISTER_POLICY_ACCEPTANCE=`By clicking “Sign in with Google” or “Sign up”, I
confirm I’ve read and agree to ${process.env.NEXT_PUBLIC_APP_NAME}'s
<a href='#' className='app__anchor'>Terms of Use</a>, Privacy Policy.`

export const REGISTRATION_ACCEPTANCE_OATH=`I agree to ${process.env.NEXT_PUBLIC_APP_NAME}'s <a href='#' className='app__anchor'>Terms and Conditions</a>.`
