export const HeaderMenuTypes = {
  CONTINUE_WITH_GOOGLE: 'continue-with-google',
  LOGIN: 'login',
};

export const StatData = [
  {
    text: 'Live Sessions',
    count: 100,
  },
  {
    text: 'Meetings',
    count: 600,
  },
  {
    text: 'Countries',
    count: 47,
  },
];

export const HeaderMenuItems = [
  {
    type: HeaderMenuTypes.CONTINUE_WITH_GOOGLE,
    text: 'Continue with Google',
    link: 'https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?redirect_uri=storagerelay%3A%2F%2Fhttps%2Fdev.uvsity.com%3Fid%3Dauth468310&response_type=permission%20id_token&scope=email%20profile%20openid&openid.realm&include_granted_scopes=true&client_id=103054385536-lh6hij3l0v2gm9kmlqk7nv8dfndj0dva.apps.googleusercontent.com&ss_domain=https%3A%2F%2Fdev.uvsity.com&fetch_basic_profile=true&gsiwebsdk=2&service=lso&o2v=1&theme=glif&flowName=GeneralOAuthFlow', 
  },
  {
    type: HeaderMenuTypes.LOGIN,
    text: 'Login',
    // link: '/login',
  },
];


export const HeroBannerFeatures = [{
  // title: 'Earn Money',
  // subTitle: 'Generate Revenue from Paid Sessions, Sponsorships, and Monetize Your One-on-One Appointments.'
},
{
  title: 'Engage with Your Alumni Community',
  subTitle: 'Maintain Strong Connections with Your Audience and Followers.'
},
{
  title: 'Seamlessly Integrated with Zoom',
  subTitle: 'Register Today and Receive Your Free Personal Appointment App Pre-configured with Zoom.'
},
{
  title: 'Alumni Marketplace: Connect, Engage, and Transact',
  subTitle: 'Empowering Educators, Coaches, and Session Organizers: Your All-in-One Marketplace'
}];

export const FooterMenuItems = [{
  href: 'https://www.uvsity.com/legal/useragreement.html',
  text: 'User agreement'
},{
  href: 'https://www.uvsity.com/legal/privacypolicy.html',
  text: 'Privacy policy'
},
{
  href: 'https://www.uvsity.com/help/faq.html',
  text: 'Help center'
},
{
  href: 'https://www.uvsity.com/help/contactus.html',
  text: 'Contact us'
}];

// export const AppFeatures = [{
//   image: '',
//   title: '',
//   subTitle: '.',
//   learnMoreId: ''
// },
// {
//   image: '',
//   title: '',
//   subTitle: '',
//   learnMoreId: ''
// },
// {
//   image: '',
//   title: '',
//   subTitle: '',
//   learnMoreId: ''
// },
// {
//   image: '',
//   title: '',
//   subTitle: ``,
//   learnMoreId: ''
// }];

export const EarnBannerFeatures = [{
  image: '/static/images/earn_from_paid_session.gif',
  title: 'Earn from hosting paid sessions',
  subTitle: 'Monetize your expertise globally by hosting paid sessions, setting your prices, and reaching a broader audience seeking your unique skills.'
},
{
  image: '/static/images/earn_from_sponsorship.gif',
  title: 'Earn from Sponsorship of Your Session',
  subTitle: 'Effortlessly attract sponsors, boost earnings, and cultivate partnerships by offering opportunities for support, maximizing revenue from valuable content, and establishing lasting connections with aligned sponsors.'
},
{
  image: '/static/images/earn_from_one_on_one.gif',
  title: 'Earn from One-on-One Appointment or Consulting',
  subTitle: 'Generate revenue by offering personalized one-on-one consulting services, setting fees, and establishing a global consulting business within the Uvsity community.'
}];

export const HowItWorksBannerFeatures = [{
  image: '/static/images/create_session.png',
  title: 'Create Your Session',
  subTitle: 'Create engaging session topics highlighting your expertise and establish session specifics including duration, pricing, and additional details for participants.'
},
{
  image: '/static/images/earn_from_sponsorship.gif',
  title: 'Attract Sponsors',
  subTitle: 'Showcase session sponsorship options enabling content alignment and audience engagement for potential sponsors.'
},
{
  image: '/static/images/earn_from_one_on_one.gif',
  title: 'One-on-One Consulting',
  subTitle: 'Promote availability for personalized consultations, manage appointments, and offer tailored guidance during scheduled one-on-one sessions.'
}];
